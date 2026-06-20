import React from 'react';
import { Truck, Wallet, ShieldCheck, MapPin, CheckCircle, Smartphone } from 'lucide-react';

export default function DeliveryPayment() {
  const options = [
    {
      title: 'курьером по Бишкеку',
      price: '150 сом',
      time: '1–2 дня',
      desc: 'Быстрая доставка до вашей двери. Оплатить можно наличными курьеру или переводом на MBank.',
      freeOver: 'Бесплатно при заказе от 3000 сом',
    },
    {
      title: 'Регионы Кыргызстана',
      price: '250 сом',
      time: '2–3 дня',
      desc: 'Работаем с экспресс-службой Alga Express. Доставка до пунктов выдачи в Оше, Джалал-Абаде, Караколе, Нарыне, Таласе, Баткене.',
      freeOver: 'Бесплатно при заказе от 5000 сом',
    },
    {
      title: 'Россия, Казахстан и СНГ',
      price: '450 сом',
      time: '5–9 дней',
      desc: 'Отправляем надежной транспортной компанией СДЭК или ТК Энергия. Предоставляем трек-номер для отслеживания на каждом этапе.',
      freeOver: 'Расчет индивидуально',
    },
  ];

  const payments = [
    {
      icon: Wallet,
      title: 'Наличный расчет',
      desc: 'Оплата наличными курьеру непосредственно при получении товара (доступно только по Бишкеку). Пожалуйста, приготовьте сумму без сдачи, если возможно.',
    },
    {
      icon: ShieldCheck,
      title: 'Мобильный перевод MBank',
      desc: 'Самый популярный способ в КР. После формирования заказа в WhatsApp наш менеджер вышлет вам прямой QR-код или номер телефона для быстрого перевода без комиссии.',
    },
    {
      icon: Smartphone,
      title: 'Перевод на карту Optima',
      desc: 'Быстрый перевод на банковскую карту Оптима Банк. Подходит как для клиентов внутри Кыргызстана, так и для быстрых транзакций со всего СНГ.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16" id="delivery-section">
      
      {/* Visual Header */}
      <div className="text-center md:text-left mb-16 space-y-2">
        <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-bold">Условия сервиса</span>
        <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 tracking-tighter uppercase">Доставка и Оплата</h2>
        <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-xl font-light">
          Мы стремимся сделать так, чтобы покупка одежды была максимально простой и надежной как в Бишкеке, так и по всей Евразии.
        </p>
      </div>

      {/* Grid of Delivery Options */}
      <div className="space-y-6 mb-16">
        <h3 className="font-display font-black text-lg text-slate-900 uppercase">1. Способы доставки</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt, i) => (
            <div key={i} className="bg-white p-6 rounded-none border border-slate-200/60 flex flex-col justify-between card-hover-effect">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                    Направление
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-none border border-slate-200 uppercase">
                    {opt.time}
                  </span>
                </div>

                <h4 className="font-display font-bold text-sm text-slate-900 uppercase tracking-tight mb-2">
                  {opt.title}
                </h4>
                
                <p className="font-sans text-xs text-slate-500 leading-relaxed font-light mb-4">
                  {opt.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between mt-auto">
                <span className="font-sans text-[9px] text-slate-400 font-bold uppercase tracking-wider">{opt.freeOver}</span>
                <span className="font-display text-base font-bold text-slate-900 uppercase">{opt.price}</span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Grid of Payment Methods */}
      <div className="space-y-6">
        <h3 className="font-display font-black text-lg text-slate-900 uppercase">2. Варианты оплаты</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {payments.map((pay, i) => {
            const Icon = pay.icon;
            return (
              <div key={i} className="bg-slate-50 p-6 rounded-none border border-slate-100 relative">
                <div className="h-10 w-10 bg-white border border-slate-200 rounded-none flex items-center justify-center mb-5 text-slate-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-xs text-slate-900 uppercase tracking-tight mb-2">
                  {pay.title}
                </h4>
                <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-light">
                  {pay.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Security Trust Badge */}
      <div className="mt-12 bg-slate-900 text-white p-8 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left font-sans">
          <h4 className="font-display font-bold text-sm uppercase text-slate-100 tracking-wider">Гарантия обмена и возврата</h4>
          <p className="text-xs text-slate-300 max-w-xl font-light leading-relaxed">
            Если изделие не подошло вам по размеру или фасону, вы можете обменять или вернуть его в течение 14 дней с момента получения. Главное — сохранить товарный вид и ярлыки. Наш шоурум в Бишкеке всегда поможет с обменом.
          </p>
        </div>
        <div className="flex-shrink-0 h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20">
          <CheckCircle className="h-6 w-6" />
        </div>
      </div>

    </div>
  );
}
