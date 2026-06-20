import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, ShieldAlert, Sparkles, RefreshCcw, Image, Check } from 'lucide-react';
import { Product } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onResetCatalog: () => void;
  whatsappNumber: string;
  setWhatsappNumber: (num: string) => void;
}

export default function AdminPanel({
  products,
  onAddProduct,
  onDeleteProduct,
  onResetCatalog,
  whatsappNumber,
  setWhatsappNumber,
}: AdminPanelProps) {
  // New Product state model
  const [newTitle, setNewTitle] = useState<string>('');
  const [newTagline, setNewTagline] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'tshirt' | 'sweatshirt'>('tshirt');
  const [newPrice, setNewPrice] = useState<number>(1200);
  const [newMaterial, setNewMaterial] = useState<string>('95% премиум хлопок / 5% эластан');
  const [newDensity, setNewDensity] = useState<string>('220 г/м²');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');
  const [isPopular, setIsPopular] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);

  const [message, setMessage] = useState<string>('');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      alert('Пожалуйста, введите название!');
      return;
    }

    // Assign default aesthetic photos if unconfigured
    const imageToUse = newImageUrl.trim() || (
      newCategory === 'tshirt'
        ? 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80'
    );

    const generatedProduct: Product = {
      id: Date.now().toString(),
      name: newTitle,
      tagline: newTagline || 'Свободный силуэт, сделанный с душой',
      category: newCategory,
      price: Number(newPrice) || 1200,
      images: [imageToUse],
      colors: [
        { name: 'Глубокий черный', hex: '#0B0B0C' },
        { name: 'Молочный белый', hex: '#F9F6EE' },
        { name: 'Мелаж серый', hex: '#9CA3AF' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      material: newMaterial,
      density: newDensity,
      description: newDesc || 'Качественная базовая одежда от Suraya Brand. Создана по эксклюзивным лекалам нашей мастерской в Бишкеке, сидит великолепно и дарит приятную мягкость.',
      isNew,
      isPopular,
    };

    onAddProduct(generatedProduct);
    
    // Clear fields
    setNewTitle('');
    setNewTagline('');
    setNewPrice(1200);
    setNewImageUrl('');
    setNewDesc('');
    
    setMessage('Товар успешно добавлен и сохранен в памяти!');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="admin-section">
      
      {/* Banner */}
      <div className="bg-zinc-900 text-white p-7 rounded-3xl border border-zinc-800 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1">
            <ShieldAlert className="h-3.5 w-3.5" /> Панель управления (Local Admin Dashboard)
          </span>
          <h2 className="font-sans font-black text-2xl uppercase mt-1">Облегченное обновление каталога</h2>
          <p className="font-sans text-xs text-zinc-450 mt-1 max-w-xl font-light">
            Здесь вы можете легко настраивать WhatsApp-номер бренда, удалять модели или добавлять новые футболки и свитшоты. Все изменения мгновенно сохраняются в вашем браузере!
          </p>
        </div>
        <button
          onClick={onResetCatalog}
          className="px-5 py-2.5 bg-zinc-800 text-xs font-mono font-bold tracking-wider rounded-xl hover:bg-red-750 hover:bg-zinc-700 transition flex items-center gap-1.5 cursor-pointer text-zinc-300"
          title="Сбросить все товары к исходному каталогу"
          id="admin-reset-catalog-btn"
        >
          <RefreshCcw className="h-3 w-3" /> Сбросить каталог
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Setup WhatsApp and Create Product form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section A: Brand WhatsApp Number setup */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-150 space-y-4">
            <h3 className="font-sans font-black text-sm uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-2">
              ⚙️ Настройка мессенджера WhatsApp
            </h3>
            <div className="space-y-1.5 max-w-sm">
              <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">WhatsApp Номер получателя *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="996700123456"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2 text-xs font-mono select-all focus:ring-1.5 focus:ring-zinc-900 outline-none w-full"
                  id="admin-whatsapp-input"
                />
              </div>
              <p className="text-[9px] font-sans text-zinc-400 leading-relaxed">
                Введите номер в международном формате (только цифры, без знака плюс). К примеру: <strong>996700123456</strong> для Кыргызстана.
              </p>
            </div>
          </div>

          {/* Section B: Create apparel model form */}
          <form onSubmit={handleCreateProduct} className="bg-white p-6 rounded-2xl border border-zinc-150 space-y-5">
            <h3 className="font-sans font-black text-sm uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-2">
              ➕ Добавить новую вещь в каталог
            </h3>

            {message && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-sans font-bold rounded-xl flex items-center gap-2 animate-scale-in" id="admin-toast-message">
                <Check className="h-4 w-4" /> {message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Название товара *</label>
                <input
                  type="text"
                  required
                  placeholder="Свитшот Оверсайз Терракота"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-sans"
                  id="admin-title-input"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Короткий слоган/Подзаголовок</label>
                <input
                  type="text"
                  placeholder="Свобода движения в теплом оттенке"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-sans"
                  id="admin-tagline-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Тип / Категория *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-sans cursor-pointer"
                  id="admin-category-select"
                >
                  <option value="tshirt">Футболка</option>
                  <option value="sweatshirt">Свитшот</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Стоимость (сом) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-mono"
                  id="admin-price-input"
                />
              </div>

              <div className="space-y-1 pt-4 flex flex-row items-center justify-around">
                <label className="flex items-center gap-1.5 text-xs font-sans text-zinc-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="accent-zinc-900"
                  />
                  <span>Новинка</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs font-sans text-zinc-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="accent-zinc-900"
                  />
                  <span>Популярный</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Состав ткани</label>
                <input
                  type="text"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-sans"
                  id="admin-material-input"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Плотность полотна</label>
                <input
                  type="text"
                  value={newDensity}
                  onChange={(e) => setNewDensity(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-sans"
                  id="admin-density-input"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block block flex justify-between">
                <span>Ссылка на фото товара (URL)</span>
                <span className="text-zinc-400 font-normal lowercase italic text-[8px]">(оставьте пустым для авто-заполнения)</span>
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/your-custom-image-url..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-mono"
                id="admin-image-input"
              />
            </div>

            <div className="space-y-1">
              <label className="font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Эмоциональное описание</label>
              <textarea
                rows={3}
                placeholder="Расскажите об особенностях этой капсулы..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-xl px-3 py-2.5 text-xs outline-none focus:ring-1.5 focus:ring-zinc-900 font-sans resize-none"
                id="admin-desc-textarea"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-zinc-900 text-white font-sans text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl hover:bg-zinc-800 transition cursor-pointer"
              id="admin-add-submit-btn"
            >
              <Plus className="h-4 w-4" /> Добавить товар в магазин
            </button>
          </form>

        </div>

        {/* Right Side: List layout with quick statistics and removal options */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-150 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-sans font-black text-sm uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                📦 Вещи на витрине ({products.length})
              </h3>
            </div>

            <div className="divide-y divide-zinc-100 max-h-[500px] overflow-y-auto space-y-3 scrollbar-none pr-1" id="admin-products-list">
              {products.map((p) => (
                <div key={p.id} className="flex gap-4.5 pt-3 first:pt-0 pb-1.5 items-center justify-between" id={`admin-row-${p.id}`}>
                  
                  <div className="flex gap-3 items-center">
                    <img
                      src={p.images[0]}
                      alt=""
                      className="h-12 w-10 object-cover rounded bg-zinc-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-sans font-bold text-xs text-zinc-900 block leading-tight">
                        {p.name}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 font-bold">
                        {p.price.toLocaleString('ru-RU')} сом
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Вы уверены, что хотите удалить товар "${p.name}" из витрины?`)) {
                        onDeleteProduct(p.id);
                      }
                    }}
                    className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-650 rounded-xl transition cursor-pointer"
                    title="Удалить товар"
                    id={`admin-delete-btn-${p.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>
              ))}
            </div>

          </div>

          <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200 flex items-start gap-3.5">
            <Sparkles className="h-5.5 w-5.5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-sans text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">Полезный совет</span>
              <p className="font-sans text-[11px] text-zinc-600 leading-relaxed font-light">
                Для тестирования новых моделей скопируйте ссылку на абсолютно любое изображение одежлы из интернета, вставьте в поле выше и нажмите кнопку. Товар появится во всех фильтрах каталога, и при покупке сформируется правильное ТЗ для WhatsApp!
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
