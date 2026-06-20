import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Instagram, Info, Map } from 'lucide-react';

interface ContactsProps {
  whatsappNumber: string;
}

export default function Contacts({ whatsappNumber }: ContactsProps) {
  const showroomAddress = 'г. Бишкек, ул. Киевская, 125 (пересекает Тоголок Молдо, напротив ТЦ Караван)';
  const instagramText = '@suraya_brand';
  const phoneText = '+996 700 123 456';
  const formattedWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  const cards = [
    {
      icon: MessageSquare,
      title: 'Наш WhatsApp',
      value: whatsappNumber,
      actionLabel: 'Написать на WhatsApp',
      href: `https://wa.me/${formattedWhatsApp}`,
      colorClass: 'text-slate-900 bg-slate-50 border-slate-200 hover:bg-slate-100/50',
    },
    {
      icon: Instagram,
      title: 'Наш Instagram',
      value: instagramText,
      actionLabel: 'Подписаться',
      href: 'https://instagram.com/suraya_brand',
      colorClass: 'text-slate-950 bg-slate-50 border-slate-200 hover:bg-slate-100/50',
    },
    {
      icon: Phone,
      title: 'Номер Телефона',
      value: phoneText,
      actionLabel: 'Позвонить',
      href: `tel:${phoneText.replace(/\s+/g, '')}`,
      colorClass: 'text-slate-800 bg-slate-50 border-slate-200 hover:bg-slate-100/50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16" id="contacts-section">
      
      {/* Title */}
      <div className="text-center md:text-left mb-16 space-y-2">
        <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold">Связь с брендом</span>
        <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 tracking-tighter uppercase">Контакты и Шоурум</h2>
        <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-md font-light">
          Мы всегда на связи в Бишкеке. Заезжайте в гости на примерку или пишите в наши социальные сети.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Quick communication channels */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display font-black text-lg text-slate-900 uppercase">Свяжитесь с нами</h3>
          
          <div className="space-y-4">
            {cards.map((cd, i) => {
              const Icon = cd.icon;
              return (
                <div
                  key={i}
                  className={`p-5 rounded-none border flex flex-col justify-between transition-all duration-200 ${cd.colorClass}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white border border-current rounded-none flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                        {cd.title}
                      </span>
                      <span className="font-mono text-xs font-extrabold text-slate-900 block mt-0.5">
                        {cd.value}
                      </span>
                    </div>
                  </div>
                  
                  <a
                    href={cd.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-xs font-sans font-bold uppercase tracking-wider text-right block hover:underline cursor-pointer"
                    id={`contact-href-${i}`}
                  >
                    {cd.actionLabel} &rarr;
                  </a>
                </div>
              );
            })}
          </div>

          {/* Business hours info card */}
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-none flex items-start gap-4">
            <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="font-sans text-[10px] font-bold text-slate-800 uppercase tracking-widest block mb-1">Режим работы</span>
              <p className="font-sans text-xs text-slate-500 leading-relaxed font-light">
                Шоурум открыт ежедневно с <strong>10:00 до 20:00</strong> без перерывов и выходных.<br />
                Поддержка клиентов в WhatsApp отвечает практически круглосуточно.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive maps & showroom address */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display font-black text-lg text-slate-900 uppercase">Адрес шоурума</h3>
          
          <div className="bg-white p-6 rounded-none border border-slate-200/60 space-y-4 shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 text-slate-900 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold text-xs text-slate-900 uppercase tracking-widest">Бишкек, Кыргызстан</p>
                <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed font-light">
                  {showroomAddress}
                </p>
              </div>
            </div>

            {/* Beautiful Interactive Styled Vector Map representation */}
            <div className="relative aspect-video rounded-none bg-slate-50 overflow-hidden border border-slate-200" id="visualmap-mock">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
              
              {/* Fake streets layout representation */}
              <div className="absolute inset-x-0 h-10 top-1/3 bg-white shadow-xs flex items-center justify-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">Киевская ул.</span>
              </div>
              <div className="absolute inset-y-0 w-10 left-1/3 bg-white shadow-xs flex items-center justify-center transform rotate-12">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold transform -rotate-12">Тоголок Молдо</span>
              </div>

              {/* Showroom visual marker pin */}
              <div className="absolute top-1/3 left-1/3 transform -translate-x-3 -translate-y-6 z-10 flex flex-col items-center">
                <div className="bg-slate-950 text-white px-3 py-1.5 rounded-none text-[8px] font-sans font-bold shadow-md mb-2 items-center flex gap-1 animate-bounce text-nowrap pointer-events-none uppercase tracking-widest border border-slate-800">
                  <MapPin className="h-3 w-3 text-white" />
                  <span>Suraya Showroom</span>
                </div>
                <div className="h-3 w-3 bg-slate-950 rounded-full border border-white animate-ping absolute top-8" />
              </div>

              {/* Custom Map Control labels */}
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/80 backdrop-blur-md rounded-none border border-slate-200 text-[9px] font-sans font-bold uppercase text-slate-500 tracking-wider">
                Караван (через дорогу)
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/80 backdrop-blur-md rounded-none border border-slate-200 text-[9px] font-sans font-bold uppercase text-slate-500 tracking-wider">
                Остановка рядом
              </div>
            </div>

            <p className="text-[11px] font-sans text-slate-550 leading-relaxed italic pr-4">
              📌 <strong>Подсказка на месте:</strong> Ровно посередине квартала, вход с торца здания, ориентир — черная вывеска <strong>"Suraya"</strong>. Ждем вас на примерку! Наличие всех размеров на вешалках гарантировано.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
