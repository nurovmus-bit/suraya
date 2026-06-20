import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, MessageSquare, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  whatsappNumber: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsappNumber,
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Checkout form status details
  const [details, setDetails] = useState<OrderDetails>({
    name: '',
    phone: '',
    city: 'Bishkek',
    address: '',
    paymentMethod: 'cash',
  });

  const [orderedSuccess, setOrderedSuccess] = useState<boolean>(false);

  // Delivery costs config based on city selection
  const getDeliveryDetails = () => {
    switch (details.city) {
      case 'Bishkek':
        return { cost: 150, time: 'в течение 1-2 дней курьером' };
      case 'Osh':
      case 'Jalal-Abad':
      case 'Karakol':
      case 'Naryn':
      case 'Talas':
      case 'Batken':
        return { cost: 250, time: '2-3 дня экспресс-служба Alga' };
      case 'Other_KG':
        return { cost: 300, time: '3-4 дня региональной почтой Киргизии' };
      case 'CIS':
        return { cost: 450, time: '5-9 дней СДЭК / Энергия по СНГ' };
      default:
        return { cost: 150, time: 'курьер' };
    }
  };

  const delivery = getDeliveryDetails();
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal + (cart.length > 0 ? delivery.cost : 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Build the textual WhatsApp order transcript
  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Ваша корзина пуста!');
      return;
    }
    if (!details.name || !details.phone || !details.address) {
      alert('Пожалуйста, заполните необходимые контакты, адрес и телефон!');
      return;
    }

    // Format individual item lines
    const itemsLines = cart.map((item, idx) => {
      return `${idx + 1}. 🧥 ${item.product.name}\n   └ Размер: ${item.selectedSize} | Цвет: ${item.selectedColor.name}\n   └ Колич: ${item.quantity} шт. | Стоимость: ${item.product.price * item.quantity} сом`;
    }).join('\n\n');

    const paymentLabel = 
      details.paymentMethod === 'cash' ? 'Наличными при получении' :
      details.paymentMethod === 'mbank' ? 'Переводом на MBank QR' : 'Перевод на карту Optima';

    const cityLabel = 
      details.city === 'Bishkek' ? 'Бишкек' :
      details.city === 'Osh' ? 'Ош' :
      details.city === 'Jalal-Abad' ? 'Джалал-Абад' :
      details.city === 'Karakol' ? 'Каракол' :
      details.city === 'Naryn' ? 'Нарын' :
      details.city === 'Talas' ? 'Талас' :
      details.city === 'Batken' ? 'Баткен' : 
      details.city === 'Other_KG' ? 'Кыргызстан (другие села/города)' : 'Страна СНГ';

    const text = `✨ НОВЫЙ ЗАКАЗ — SURAYA BRAND ✨

👤 ИМЯ ПОКУПАТЕЛЯ: ${details.name}
📞 ТЕЛЕФОН: ${details.phone}
📍 ГОРОД/ОБЛ: ${cityLabel}
🏠 ТОЧНЫЙ АДРЕС: ${details.address}
💳 СПОСОБ ОПЛАТЫ: ${paymentLabel}
🚚 СРОК ДОСТАВКИ: ${delivery.time}

🛍️ ВЫБРАННЫЕ ТОВАРЫ:\n${itemsLines}

📊 ИТОГО К ОПЛАТЕ:
Сумма товаров: ${subtotal} сом
Доставка: ${delivery.cost} сом
🔥 ОБЩАЯ СУММА: ${total} сом

Пожалуйста, подтвердите мой заказ и напишите реквизиты, если требуется предоплата. Спасибо!`;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedText}`;
    window.open(url, '_blank');
    
    // Trigger local state success
    setOrderedSuccess(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/60 backdrop-blur-xs animate-fade-in" id="cart-drawer-backdrop">
      
      {/* Outer panel stage */}
      <div className="relative w-full max-w-lg bg-white h-full flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-150">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5.5 w-5.5 text-zinc-950" />
            <h3 className="font-sans font-black text-lg text-zinc-900 tracking-tight uppercase">
              Ваша Корзина
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer text-zinc-400 hover:text-zinc-900"
            aria-label="Закрыть корзину"
            id="close-cart-drawer-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Inner body content */}
        {orderedSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" id="cart-order-success-stage">
            <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-650 animate-scale-in">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h4 className="font-sans font-black text-xl text-zinc-900 uppercase tracking-tight">
              Заказ отправлен!
            </h4>
            <p className="font-sans text-xs text-zinc-500 mt-2 max-w-sm leading-relaxed">
              Мы сформировали ваше сообщение и перенаправили вас в мессенджер WhatsApp нашего консультанта. Если чат не открылся автоматически, пожалуйста, убедитесь, что у вас установлен WhatsApp.
            </p>
            <button
              onClick={() => {
                setOrderedSuccess(false);
                onClose();
              }}
              className="mt-6 px-6 py-3 bg-zinc-900 text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all cursor-pointer"
              id="back-to-store-btn"
            >
              Вернуться к покупкам
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" id="cart-empty-stage">
            <div className="mb-4 text-zinc-300">
              <ShoppingBag className="h-14 w-14 stroke-[1]" />
            </div>
            <p className="font-sans text-base text-zinc-500 font-medium">Ваша корзина пуста</p>
            <p className="font-sans text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
              Перейдите в наш каталог, чтобы выбрать уникальную футболку или свитшот от Suraya Brand!
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-6 py-2.5 bg-zinc-900 text-white font-mono text-xs font-bold uppercase rounded-full hover:bg-zinc-800 transition shadow-md"
              id="empty-cart-return-btn"
            >
              Назад к каталогу
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Products Scroller List */}
            <div className="space-y-4" id="cart-items-container">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-3 rounded-xl border border-zinc-150 relative bg-zinc-50/50"
                  id={`cart-item-row-${index}`}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-20 w-16 object-cover rounded-lg bg-zinc-150 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans font-bold text-xs uppercase text-zinc-900 tracking-tight leading-tight line-clamp-1 pr-4">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-zinc-400 hover:text-red-650 transition-colors p-1"
                          title="Удалить товар"
                          id={`cart-remove-item-${index}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex gap-2.5 mt-1 text-[10px] font-mono text-zinc-400">
                        <span>Размер: <strong className="text-zinc-700">{item.selectedSize}</strong></span>
                        <span className="flex items-center gap-1">
                          Цвет:
                          <strong className="text-zinc-700 flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full inline-block border border-zinc-200" style={{ backgroundColor: item.selectedColor.hex }} />
                            {item.selectedColor.name}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="text-zinc-400 hover:text-zinc-900 transition-colors p-0.5 cursor-pointer"
                          id={`cart-qty-minus-${index}`}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-zinc-800 w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="text-zinc-400 hover:text-zinc-900 transition-colors p-0.5 cursor-pointer"
                          id={`cart-qty-plus-${index}`}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-mono text-xs font-black text-zinc-900 text-right">
                        {(item.product.price * item.quantity).toLocaleString('ru-RU')} сом
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Structured Checkout Form container details */}
            <form onSubmit={handleWhatsappSubmit} className="pt-6 border-t border-zinc-150 space-y-4" id="checkout-form">
              <span className="block font-sans font-black text-xs uppercase tracking-widest text-zinc-900 mb-2">
                Данные для оформления заказа
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Имя покупателя *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="Алексей"
                    value={details.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2 text-xs focus:ring-1.5 focus:ring-zinc-900 outline-none font-sans"
                    id="checkout-name-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Контактный телефон *</label>
                  <input
                    type="text"
                    required
                    name="phone"
                    placeholder="+996 700 123 456"
                    value={details.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2 text-xs focus:ring-1.5 focus:ring-zinc-900 outline-none font-sans"
                    id="checkout-phone-input"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Город / Населенный пункт *</label>
                <select
                  name="city"
                  value={details.city}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:ring-1.5 focus:ring-zinc-900 outline-none font-sans cursor-pointer"
                  id="checkout-city-select"
                >
                  <option value="Bishkek">📍 Бишкек (+150 сом, курьер 1-2 дня)</option>
                  <option value="Osh">Ош (+250 сом, Alga 2-3 дня)</option>
                  <option value="Jalal-Abad">Джалал-Абад (+250 сом, Alga 2-3 дня)</option>
                  <option value="Karakol">Каракол (+250 сом, Alga 2-3 дня)</option>
                  <option value="Naryn">Нарын (+250 сом, Alga 2-3 дня)</option>
                  <option value="Talas">Талас (+250 сом, Alga 2-3 дня)</option>
                  <option value="Batken">Баткен (+250 сом, Alga 2-3 дня)</option>
                  <option value="Other_KG">Кыргызстан: регионы (+300 сом, гос почта)</option>
                  <option value="CIS">Казахстан и СНГ (+450 сом, СДЭК)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Точный адрес доставки *</label>
                <textarea
                  required
                  name="address"
                  rows={2}
                  placeholder="Микрорайон 5, дом 12, кв. 45"
                  value={details.address}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2 text-xs focus:ring-1.5 focus:ring-zinc-900 outline-none font-sans resize-none"
                  id="checkout-address-textarea"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Удобный способ оплаты *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cash', label: 'Наличные' },
                    { id: 'mbank', label: 'MBank' },
                    { id: 'optima', label: 'Optima' },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setDetails(prev => ({ ...prev, paymentMethod: pay.id as any }))}
                      className={`py-2 text-[10px] font-sans font-bold uppercase rounded-lg border transition-all cursor-pointer text-center ${
                        details.paymentMethod === pay.id
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                      }`}
                      id={`pay-opt-${pay.id}`}
                    >
                      {pay.label}
                    </button>
                  ))}
                </div>
              </div>

            </form>

          </div>
        )}

        {/* Totals & Sticky Action Panel */}
        {!orderedSuccess && cart.length > 0 && (
          <div className="p-6 bg-zinc-50 border-t border-zinc-150 space-y-4">
            
            {/* Rates calculation summary */}
            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between text-zinc-500">
                <span>Товары ({cart.length}) :</span>
                <span className="font-mono font-medium text-zinc-800">{subtotal.toLocaleString('ru-RU')} сом</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Доставка ({delivery.time}) :</span>
                <span className="font-mono font-medium text-zinc-800">+{delivery.cost} сом</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-200 text-sm font-bold text-zinc-900">
                <span>Общая сумма :</span>
                <span className="font-mono text-base font-black text-zinc-950">{total.toLocaleString('ru-RU')} сом</span>
              </div>
            </div>

            {/* Checkout action WhatsApp clicker */}
            <button
              onClick={handleWhatsappSubmit}
              disabled={!details.name || !details.phone || !details.address}
              className={`w-full h-12.5 rounded-2xl font-sans text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-150 cursor-pointer ${
                details.name && details.phone && details.address
                  ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:from-emerald-700 hover:to-green-600 shadow-green-600/10'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
              }`}
              id="submit-whatsapp-order-btn"
            >
              <MessageSquare className="h-4.5 w-4.5 fill-white" />
              <span>Купить через WhatsApp ({total} сом)</span>
            </button>

            <p className="text-[10px] font-sans text-zinc-400 text-center leading-relaxed">
              * Заказы обрабатываются в реальном времени. Наш менеджер в Бишкеке свяжется с вами по указанному телефону в течение 10-15 минут.
            </p>
          </div>
        )}

      </div>
      
    </div>
  );
}
