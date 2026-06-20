import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, MessageSquare, Check } from 'lucide-react';
import { Product, SIZE_CHART } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  whatsappNumber: string;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  whatsappNumber,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(product.colors[0]);
  const [showSizeGrid, setShowSizeGrid] = useState<boolean>(false);
  const [addedAlert, setAddedAlert] = useState<boolean>(false);

  // Set default size as first available size automatically
  useEffect(() => {
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    setSelectedColor(product.colors[0]);
    setActiveImageIdx(0);
  }, [product]);

  // WhatsApp individual product checkout
  const orderDirectInWhatsApp = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер перед заказом!');
      return;
    }
    const message = `Здравствуйте! Хочу заказать товар в Suraya Brand:
🛒 Модель: ${product.name} (${product.tagline})
📏 Выбранный размер: ${selectedSize}
🎨 Цвет: ${selectedColor.name}
💰 Стоимость: ${product.price} сом
Материал: ${product.material} (Плотность: ${product.density})
Есть ли в наличии? Хочу оформить доставку!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер!');
      return;
    }
    onAddToCart(product, selectedSize, selectedColor);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fade-in" id="product-detail-backdrop">
      
      {/* Container stage */}
      <div className="relative w-full max-w-4xl bg-white rounded-none overflow-hidden shadow-2xl border border-slate-200 flex flex-col md:flex-row my-auto max-h-[92vh] md:max-h-[85vh] overflow-y-auto w-full max-w-4xl">
        
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-none transition-all cursor-pointer shadow-xs"
          aria-label="Закрыть окно"
          id="close-modal-btn"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between border-r border-slate-150">
          
          {/* Main Visual */}
          <div className="relative aspect-[3/4] w-full rounded-none overflow-hidden bg-white mb-4 flex items-center justify-center border border-slate-200">
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
              id="detail-main-img"
            />
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-2 pb-1 scrollbar-none justify-center">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`flex-shrink-0 h-14 w-14 rounded-none overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIdx === idx ? 'border-slate-900 ring-2 ring-slate-900/10' : 'border-slate-200 opacity-60 hover:opacity-100'
                }`}
                id={`thumb-img-${idx}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Side: Informative Panel */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          
          <div>
            {/* Category / Badge Tags */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[8px] uppercase tracking-widest text-slate-500 font-bold bg-slate-100 px-2 py-0.5 border border-slate-200">
                {product.category === 'tshirt' ? 'Премиум Футболка' : 'Премиум Свитшот'}
              </span>
              {product.isNew && (
                <span className="font-sans text-[8px] uppercase tracking-widest text-slate-900 bg-slate-900 text-white px-2 py-0.5 font-bold">
                  Новинка
                </span>
              )}
            </div>

            <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 uppercase tracking-tighter leading-none mb-2" id="detail-title">
              {product.name}
            </h2>

            <p className="font-sans text-xs text-slate-500 italic mb-5 leading-relaxed font-light">
              «{product.tagline}»
            </p>

            {/* Prices */}
            <div className="flex items-baseline gap-3 mb-6 p-4 bg-slate-50 border border-slate-200 rounded-none w-fit">
              <span className="font-display text-2xl font-bold text-slate-900 uppercase">
                {product.price.toLocaleString('ru-RU')} сом
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-slate-400 line-through">
                  {product.originalPrice.toLocaleString('ru-RU')} сом
                </span>
              )}
            </div>

            {/* Color selection dots */}
            <div className="mb-6">
              <span className="block font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                Выбрать цвет: <span className="text-slate-900 font-mono font-normal">{selectedColor?.name}</span>
              </span>
              <div className="flex gap-2">
                {product.colors.map((c) => {
                  const isChosen = selectedColor?.hex === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedColor(c)}
                      className="h-8 px-3 rounded-none border-2 transition-all flex items-center gap-1.5 cursor-pointer text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        borderColor: isChosen ? '#0f172a' : '#e2e8f0',
                        backgroundColor: '#ffffff'
                      }}
                      id={`detail-color-${c.name}`}
                    >
                      <span className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: c.hex }} />
                      <span className="text-slate-800 font-sans">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size choosing list */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <span className="block font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Выбрать размер:
                </span>
                <button
                  onClick={() => setShowSizeGrid(!showSizeGrid)}
                  className="font-mono text-[9px] text-slate-500 hover:text-slate-900 transition-colors uppercase font-bold underline"
                  id="toggle-size-chart"
                >
                  {showSizeGrid ? '[ Скрыть таблицу ]' : '[ Размерная сетка ]'}
                </button>
              </div>

              {/* Size grid selection button row */}
              <div className="flex gap-1.5 flex-wrap">
                {product.sizes.map((sz) => {
                  const isChosen = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-10 w-10 text-xs font-mono font-bold rounded-none border flex items-center justify-center transition-all cursor-pointer ${
                        isChosen
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                      id={`detail-size-${sz}`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Dimensional measurements (SIZE_CHART) */}
              {showSizeGrid && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 text-[10px] font-sans text-slate-600 space-y-1.5 animate-scale-in" id="size-chart-grid">
                  <div className="grid grid-cols-4 font-bold border-b border-slate-200 pb-1 text-slate-800 uppercase tracking-widest text-[8px]">
                    <div>Размер</div>
                    <div>Грудь</div>
                    <div>Длина</div>
                    <div>Рукав</div>
                  </div>
                  {SIZE_CHART.map((sc, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-4 py-1 font-mono ${
                        selectedSize === sc.size ? 'bg-slate-200 font-bold text-slate-950 px-1' : ''
                      }`}
                    >
                      <div className="font-bold text-slate-900">{sc.size}</div>
                      <div>{sc.chest}</div>
                      <div>{sc.length}</div>
                      <div className="text-[9px] text-slate-500 leading-none">{sc.sleeve}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Material fabric specifics */}
            <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-slate-100 py-4 text-[11px] font-sans">
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Состав ткани</span>
                <span className="text-slate-800 font-semibold">{product.material}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Плотность</span>
                <span className="text-slate-800 font-mono font-semibold">{product.density}</span>
              </div>
            </div>

            {/* Care guidelines */}
            <div className="mb-8 bg-slate-50 p-4 border border-slate-200 rounded-none">
              <span className="block font-sans text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Уход за вещью</span>
              <p className="font-sans text-[11px] text-slate-500 leading-relaxed italic">
                ⚙️ Бережная машинная стирка 30°, не использовать отбеливатели, не сушить в стиральной и сушильной машинах, гладить с изнаночной стороны.
              </p>
            </div>
          </div>

          {/* Checkout/Cart Action Buttons footer */}
          <div className="space-y-3.5 pt-4 border-t border-slate-150 mt-auto">
            
            {/* Added trigger banner alert */}
            {addedAlert && (
              <div className="px-4 py-2.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-sans font-bold flex items-center gap-2 rounded-none animate-scale-in" id="added-alert-toast">
                <Check className="h-3.5 w-3.5" /> Товар успешно добавлен в вашу корзину!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* WhatsApp direct buy - KEY Kyrgyz Market criteria */}
              <button
                onClick={orderDirectInWhatsApp}
                className="w-full h-11 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-none text-[10px] font-sans font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-sm"
                id="btn-order-whatsapp-product"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>Заказать в WhatsApp</span>
              </button>

              {/* Normal add to cart */}
              <button
                onClick={handleAddToCartClick}
                className="w-full h-11 px-5 bg-slate-900 hover:bg-slate-850 text-white rounded-none text-[10px] font-sans font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-sm"
                id="btn-add-to-cart"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Добавить в корзину</span>
              </button>

            </div>

            <p className="text-[10px] font-sans text-slate-400 text-center leading-relaxed font-light">
              * Заказ в WhatsApp позволяет мгновенно уточнить детали пошива с нашим консультантом в Бишкеке
            </p>
          </div>

        </div>

      </div>
      
    </div>
  );
}
