import React from 'react';
import { Scissors, Sparkles, Shirt, ShieldCheck, Heart, User } from 'lucide-react';

export default function AboutBrand() {
  const steps = [
    {
      icon: Scissors,
      title: 'Выбор ткани',
      desc: 'Закупаем премиальный хлопковый трикотаж класса Пенье у сертифицированных турецких партнеров. Плотный, не образующий катышков.',
    },
    {
      icon: Shirt,
      title: 'Конструирование и раскрой',
      desc: 'Создаем лекала в собственном конструкторском цеху в Бишкеке. Игры с пропорциями, чтобы оверсайз сидел непринужденно.',
    },
    {
      icon: Sparkles,
      title: 'Печать принтов',
      desc: 'Шелкография премиальными красками. Не трескается, не красится, переносит сотни циклов машинных стирок.',
    },
    {
      icon: ShieldCheck,
      title: 'Контроль качества',
      desc: 'Все швы ровные, нитки убраны, горловина укреплена силиконовой тесьмой. Каждая деталь отшивается нашими мастерами.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16" id="about-section">
      
      {/* Visual Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200">
            <Heart className="h-3 w-3 fill-slate-900 text-slate-900" />
            <span className="font-sans text-[10px] text-slate-500 font-bold uppercase tracking-widest">Наш манифест</span>
          </div>
          
          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 tracking-tighter uppercase leading-none">
            Собственное <br className="hidden sm:inline" />
            производство <br className="hidden sm:inline" />
            в Бишкеке
          </h2>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            <strong>Suraya Brand</strong> — одежда, которую мы делаем сами: от ткани до принта. Каждая футболка и свитшот проходят через руки нашей команды в Бишкеке — печать, шитьё, ручной контроль качества. Мы не штампуем безликие масс-маркет тренды, а создаём долговечные, тактильно приятные вещи, в которых удобно жить, работать и путешествовать.
          </p>

          <div className="p-5 bg-slate-50 border-l-4 border-slate-900 italic font-serif text-slate-500 text-xs">
            «Мы уверены, что базовая одежда не должна быть скучной или хлипкой. Мы вкладываем тепло рук наших швей в каждый ровный оверлок, создавая стандарты уличной моды Кыргызстана.»
          </div>
        </div>

        {/* Brand Image Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden aspect-[4/5] bg-slate-50 border border-slate-200 p-1">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80"
                alt="Sewing workshop"
                className="w-full h-full object-cover hover:scale-103 transition duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-slate-900 text-white p-6 flex flex-col justify-between aspect-video">
              <span className="font-sans text-[9px] uppercase tracking-wider text-slate-400 font-bold">Опыт цеха</span>
              <h4 className="font-display font-black text-2xl uppercase mt-2">5+ Лет</h4>
              <p className="font-sans text-[10px] text-slate-300 mt-1">Оттачивания идеального шва в Киргизии</p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-slate-50 text-slate-900 p-6 border border-slate-200 flex flex-col justify-between aspect-video">
              <span className="font-sans text-[9px] uppercase tracking-wider text-slate-500 font-bold">Для кого мы шьем</span>
              <h4 className="font-display font-black text-xl uppercase mt-2">18-35 Лет</h4>
              <p className="font-sans text-[10px] text-slate-600 mt-1">Кыргызстан & СНГ</p>
            </div>
            <div className="overflow-hidden aspect-[4/5] bg-slate-50 border border-slate-200 p-1">
              <img
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
                alt="Screen printing apparel"
                className="w-full h-full object-cover hover:scale-103 transition duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Production pipeline visual cards */}
      <div className="space-y-8">
        <div className="text-center">
          <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold">Процесс создания</span>
          <h3 className="font-display font-black text-2xl text-slate-900 mt-1 uppercase">Как рождается Suraya Brand</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="bg-white p-6 border border-slate-200/60 relative card-hover-effect">
                <div className="absolute top-4 right-4 font-mono text-4xl text-slate-100 font-black">
                  {`0${i + 1}`}
                </div>
                
                <div className="h-10 w-10 bg-slate-50 border border-slate-200 text-slate-850 rounded-none flex items-center justify-center mb-6">
                  <Icon className="h-5 w-5" />
                </div>

                <h4 className="font-display font-bold text-xs text-slate-900 uppercase tracking-tight mb-2.5">
                  {st.title}
                </h4>
                <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-light">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
