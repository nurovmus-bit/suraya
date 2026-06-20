import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  { text: 'Где вы находитесь? 📍', prompt: 'Где конкретно расположен ваш шоурум в Бишкеке и как его найти?' },
  { text: 'Из какого материала одежда? 🧵', prompt: 'Из какого материала вы шьете футболки и свитшоты? Что такое хлопок пенье?' },
  { text: 'Условия доставки 🛵', prompt: 'Расскажите про условия и стоимость доставки по Бишкеку и Кыргызстану.' },
  { text: 'Как подобрать размер? 📐', prompt: 'Как мне подобрать размер футболки оверсайз?' },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [hasNewMessageAlert, setHasNewMessageAlert] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    const savedMessages = localStorage.getItem('suraya_chat_history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        loadDefaultWelcome();
      }
    } else {
      loadDefaultWelcome();
    }
  }, []);

  // Save conversation history to localStorage
  const saveChatHistory = (history: ChatMessage[]) => {
    localStorage.setItem('suraya_chat_history', JSON.stringify(history));
  };

  const loadDefaultWelcome = () => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: 'Привет! Рада видеть вас в интернет-магазине Suraya Brand 🌸\n\nЯ ваш виртуальный ИИ-ассистент. Могу подсказать адреса шоурума в Бишкеке, рассказать о качестве нашего пошива, плотности тканей (мы используем только премиальный хлопок Пенье) или помочь сориентироваться по каталогу и доставке.\n\nЗадайте любой вопрос или выберите один из быстрых вариантов ниже!',
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
    saveChatHistory([welcomeMsg]);
  };

  // Scroll to bottom on updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Alert new messages when chat is closed
  useEffect(() => {
    if (messages.length > 1 && !isOpen) {
      setHasNewMessageAlert(true);
    }
  }, [messages.length]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessageAlert(false);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMsgId = `user-${Date.now()}`;
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Map history down to standard role & content pairs for full history context
      const chatContext = updatedMessages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: chatContext })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Server error calling chat helper');
      }

      const data = await res.json();
      
      const assistantMsgId = `assistant-${Date.now()}`;
      const newAssistantMessage: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: data.reply || 'Извините, не удалось получить ответ.',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, newAssistantMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);

    } catch (err: any) {
      console.error('Chat Bot API Error:', err);
      setErrorText(err.message || 'Не удалось соединиться с ИИ-помощником. Пожалуйста, убедитесь, что API ключ настроен.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Очистить историю нашей переписки?')) {
      localStorage.removeItem('suraya_chat_history');
      loadDefaultWelcome();
    }
  };

  // Safe and fast client-side markdown-like text renderer
  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let elements: React.ReactNode[] = [];
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      // Detect if lines are bullet points or numbers
      const isListItem = line.trim().startsWith('- ') || line.trim().startsWith('• ') || /^\d+\.\s/.test(line.trim());
      const displayLine = isListItem ? line.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '') : line;

      let keyCounter = 0;
      while ((match = boldRegex.exec(displayLine)) !== null) {
        if (match.index > lastIndex) {
          elements.push(<span key={`text-${idx}-${keyCounter}`}>{displayLine.substring(lastIndex, match.index)}</span>);
          keyCounter++;
        }
        elements.push(<strong key={`bold-${idx}-${keyCounter}`} className="font-bold text-slate-900">{match[1]}</strong>);
        keyCounter++;
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < displayLine.length) {
        elements.push(<span key={`text-end-${idx}-${keyCounter}`}>{displayLine.substring(lastIndex)}</span>);
      }

      if (isListItem) {
        return (
          <li key={idx} className="ml-4 list-disc text-[12.5px] text-slate-700 leading-relaxed mt-1 first:mt-0 font-sans">
            {elements.length > 0 ? elements : displayLine}
          </li>
        );
      }

      return (
        <p key={idx} className="text-[12.5px] text-slate-700 leading-relaxed min-h-[0.5rem] font-sans mt-1.5 first:mt-0">
          {elements.length > 0 ? elements : line}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggleChat}
          id="chatbot-toggle-btn"
          aria-label="ИИ Чат-бот"
          className="relative h-14 w-14 rounded-full bg-slate-950 text-white shadow-xl hover:bg-slate-900 transition-all duration-300 flex items-center justify-center cursor-pointer border border-slate-800 focus:outline-none"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="h-6 w-6" />
              {hasNewMessageAlert && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </div>
          )}
        </button>

        {/* Small badge floating tip when chat hasn't been opened yet and is state welcome */}
        {!isOpen && !hasNewMessageAlert && (
          <div className="absolute right-16 bottom-2.5 bg-white border border-slate-150 px-3 py-1.5 rounded-lg shadow-md hidden md:flex items-center gap-1.5 text-nowrap pointer-events-none">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-sans text-[11px] font-bold text-slate-500 uppercase tracking-wider">ИИ-Помощник Suraya</span>
          </div>
        )}
      </div>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            id="chatbot-window"
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[550px] bg-white rounded-2xl border border-slate-200/80 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header portion */}
            <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-900">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-slate-800 rounded-none border border-slate-700 flex items-center justify-center">
                  <Sparkles className="h-4.5 w-4.5 text-slate-200" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-1.5">
                    Suraya AI Assistant
                  </h4>
                  <span className="text-[10px] font-sans text-slate-400 font-light uppercase tracking-wide block leading-none mt-1">
                    Онлайн • Консультант магазина
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  title="Очистить историю"
                  className="p-1 px-1.5 hover:bg-slate-900 text-slate-400 hover:text-white rounded transition-colors cursor-pointer text-[10px] font-mono tracking-wider uppercase border border-transparent hover:border-slate-800"
                >
                  Сбросить
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-900 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Conversation Flow Area */}
            <div 
              ref={scrollContainerRef}
              className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-none border leading-relaxed shadow-xs ${
                      msg.role === 'user'
                        ? 'bg-slate-950 text-white border-slate-900 text-right'
                        : 'bg-white text-slate-800 border-slate-200/70 text-left'
                    }`}
                  >
                    <div className="space-y-1.5">
                      {renderMessageText(msg.content)}
                    </div>
                    <span 
                      className={`text-[9px] block mt-2 ${
                        msg.role === 'user' ? 'text-slate-400 text-right' : 'text-slate-400 text-left'
                      } font-mono`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bot Loading Dots */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-700 border border-slate-200 p-3.5 rounded-none flex items-center gap-1.5 shadow-sm">
                    <span className="h-2 w-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Error block with key configuration notice */}
              {errorText && (
                <div className="bg-red-50 border border-red-150 p-4 rounded-none text-red-800 text-xs text-center space-y-2">
                  <p>{errorText}</p>
                  <div className="text-[10px] text-red-500 font-mono">
                    Вы можете настроить ключ в панели <strong className="font-bold">Settings &gt; Secrets</strong>
                  </div>
                  <button 
                    onClick={() => handleSendMessage(messages[messages.length - 1]?.content || '')}
                    className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-900 font-bold uppercase tracking-widest text-[10px] inline-flex items-center gap-1 transition-all"
                  >
                    <RefreshCw className="h-3 w-3" /> Повторить
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick reply chips row */}
            <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none">
              {QUICK_REPLIES.map((quick, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(quick.prompt)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-sans font-medium transition-colors hover:text-slate-950 inline-block pointer-events-auto shrink-0 select-none cursor-pointer"
                >
                  {quick.text}
                </button>
              ))}
            </div>

            {/* Input Form portion */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-200 bg-white flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                placeholder="Спросите меня о пошиве, шоуруме или размерах..."
                className="flex-grow px-3 py-2 text-xs border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:outline-none placeholder-slate-400 font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`p-2.5 flex items-center justify-center transition-all ${
                  inputValue.trim() && !isLoading
                    ? 'bg-slate-950 text-white hover:bg-slate-900 hover:scale-105'
                    : 'bg-slate-100 text-slate-300 pointer-events-none'
                }`}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
