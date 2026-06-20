import React from 'react';
import { ArrowRight, Compass, Heart, ShieldCheck, Sparkles, Smile } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onAboutBrand: () => void;
}

export default function Hero({ onExploreCatalog, onAboutBrand }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 border-b border-slate-100">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 z-0 hidden lg:block" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-slate-100/40 mix-blend-multiply filter blur-3xl opacity-70" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2" id="hero-mini-badge">
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest">Новая Коллекция</span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">S/S 2026</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tighter leading-none" id="hero-main-title">
                Одежда, которую<br />
                мы <span className="text-slate-500 font-serif italic font-normal">делаем сами</span>
              </h1>
              
              <p className="font-sans text-sm sm:text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed" id="hero-subtitle">
                От ткани до принтов — каждая вещь создаётся нашей командой в Бишкеке по собственным лекалам. Мы не штампуем мимолетные тренды, а шьем вещи для вашей жизни.
              </p>
            </div>

            {/* CTA Buttons - Styled perfectly square & uppercase according to the theme */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                id="hero-cta-catalog"
              >
                <span>Смотреть новинки</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={onAboutBrand}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-slate-900 border-2 border-slate-900 font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors text-center cursor-pointer"
                id="hero-cta-about"
              >
                О бренде
              </button>
            </div>

            {/* Small Brand Pillars */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-sm mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="font-display text-base font-bold text-slate-900 uppercase">100%</div>
                <div className="font-sans text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Свой цех</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-base font-bold text-slate-900 uppercase">Премиум</div>
                <div className="font-sans text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Хлопок Пенье</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-base font-bold text-slate-900 uppercase">Доставка</div>
                <div className="font-sans text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">По Кыргызстану</div>
              </div>
            </div>

          </div>

          {/* Right Image/Model Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Back Frame Decorator matching the architectural style layout */}
              <div className="absolute inset-x-8 -bottom-4 top-12 bg-slate-100 rounded-t-full z-0 flex items-end justify-center" />
              
              {/* Main Photo Card */}
              <div className="relative rounded-none overflow-hidden bg-slate-50 aspect-[4/5] border border-slate-100 z-10 p-2">
                <div className="w-full h-full bg-slate-200 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
                    alt="Suraya Brand Streetwear Model"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Aesthetic Overlay Banner styled custom to match mockup */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-white border border-slate-100 shadow-sm text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-sans text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Осенняя капсула</p>
                        <h3 className="font-display font-medium text-xs text-slate-900 uppercase tracking-tight">Oversized Heavyweight</h3>
                      </div>
                      <span className="font-mono text-xs font-black text-slate-950 bg-slate-50 px-2.5 py-1 border border-slate-100">1200 сом</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Overprint Accent */}
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-slate-900 text-white flex flex-col items-center justify-center p-2 text-center shadow-lg transform rotate-12 z-20">
                <span className="font-display font-black text-[9px] tracking-tighter uppercase leading-none text-white">Выбор</span>
                <span className="font-serif italic text-xs leading-none text-slate-300">№1</span>
              </div>

            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
