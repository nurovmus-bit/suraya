import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, ShoppingBag, Eye, Heart, MapPin, Instagram, Phone, Info } from 'lucide-react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import AboutBrand from './components/AboutBrand';
import DeliveryPayment from './components/DeliveryPayment';
import Contacts from './components/Contacts';
import AdminPanel from './components/AdminPanel';
import ChatBot from './components/ChatBot';

export default function App() {
  // 1. Core State Managers
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [whatsappNumber, setWhatsappNumber] = useState<string>('996700123456');

  // 2. LocalStorage Persistence Syncing
  useEffect(() => {
    // Products
    const savedProducts = localStorage.getItem('suraya_products_v2');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts(INITIAL_PRODUCTS);
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('suraya_products_v2', JSON.stringify(INITIAL_PRODUCTS));
    }

    // Cart
    const savedCart = localStorage.getItem('suraya_cart_v2');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }

    // WhatsApp number configuration
    const savedNum = localStorage.getItem('suraya_whatsapp_v2');
    if (savedNum) {
      setWhatsappNumber(savedNum);
    }
  }, []);

  // Sync state mutations back to localstorage
  const saveProductsToStorage = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('suraya_products_v2', JSON.stringify(newProducts));
  };

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('suraya_cart_v2', JSON.stringify(newCart));
  };

  const saveWhatsAppToStorage = (num: string) => {
    setWhatsappNumber(num);
    localStorage.setItem('suraya_whatsapp_v2', num);
  };

  // 3. Cart Action Handlers
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.hex === color.hex
    );

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
      });
    }
    saveCartToStorage(updatedCart);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    let updatedCart = [...cart];
    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }
    saveCartToStorage(updatedCart);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cart.filter((_, idx) => idx !== index);
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // 4. Admin Add-Remove utilities
  const handleAddNewProduct = (newProd: Product) => {
    const updated = [newProd, ...products];
    saveProductsToStorage(updated);
  };

  const handleDeleteProduct = (pId: string) => {
    const updated = products.filter((p) => p.id !== pId);
    saveProductsToStorage(updated);
  };

  const handleResetCatalog = () => {
    if (confirm('Вы действительно хотите вернуть первоначальный каталог товаров? Все добавленные вами изделия сотрутся.')) {
      saveProductsToStorage(INITIAL_PRODUCTS);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col antialiased">
      
      {/* 1. Header Bar */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* 2. Main Body Route Sections */}
      <main className="flex-grow">
        
        {activeSection === 'home' && (
          <div className="animate-fade-in space-y-12">
            <Hero
              onExploreCatalog={() => {
                setActiveSection('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAboutBrand={() => {
                setActiveSection('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            {/* Quick Teaser Grid inside home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="border-t border-zinc-100 pt-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-sans font-black text-xl uppercase tracking-tight text-zinc-900">
                      Лидеры продаж 🔥
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 mt-0.5">Самые популярные футболки и свитшоты сезона</p>
                  </div>
                  <button
                    onClick={() => setActiveSection('catalog')}
                    className="font-mono text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors uppercase tracking-wider underline cursor-pointer"
                  >
                    Все товары &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="group cursor-pointer relative"
                    >
                      <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-150 mb-3 relative">
                        {p.isNew && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-[9px] font-mono rounded tracking-widest font-bold">NEW</span>
                        )}
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-104 transition duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-sans font-bold text-xs uppercase text-zinc-900 line-clamp-1">{p.name}</h4>
                      <p className="font-mono text-xs text-zinc-700 mt-1 font-bold">{p.price} сом</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <Catalog
              products={products}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onQuickAdd={(p) => {
                if (p.sizes.length > 0) {
                  handleAddToCart(p, p.sizes[0], p.colors[0]);
                }
              }}
            />
          </div>
        )}

        {activeSection === 'about' && (
          <div className="animate-fade-in">
            <AboutBrand />
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="animate-fade-in">
            <DeliveryPayment />
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="animate-fade-in">
            <Contacts whatsappNumber={whatsappNumber} />
          </div>
        )}

        {activeSection === 'admin' && (
          <div className="animate-fade-in">
            <AdminPanel
              products={products}
              onAddProduct={handleAddNewProduct}
              onDeleteProduct={handleDeleteProduct}
              onResetCatalog={handleResetCatalog}
              whatsappNumber={whatsappNumber}
              setWhatsappNumber={saveWhatsAppToStorage}
            />
          </div>
        )}

      </main>

      {/* 3. Global Footer Details */}
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <span className="font-sans font-black text-white text-2xl tracking-widest uppercase block">
                Suraya
              </span>
              <p className="font-sans text-xs text-zinc-500 leading-relaxed font-light">
                От ткани до принта — каждая футболка и свитшот создаётся нашей командой в Бишкеке по собственным лекалам с душой и заботой.
              </p>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://instagram.com/suraya_brand"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Sitemap column navigation Quick links */}
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4">Навигация</h4>
              <ul className="space-y-2.5 text-xs">
                <li><button onClick={() => { setActiveSection('home'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition text-left cursor-pointer">Главная страница</button></li>
                <li><button onClick={() => { setActiveSection('catalog'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition text-left cursor-pointer">Каталог одежды</button></li>
                <li><button onClick={() => { setActiveSection('about'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition text-left cursor-pointer">О нашем бренде</button></li>
                <li><button onClick={() => { setActiveSection('delivery'); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition text-left cursor-pointer">Условия доставки</button></li>
              </ul>
            </div>

            {/* Kyrgyzstan details, contacts column */}
            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4">Контакты</h4>
              <ul className="space-y-3 text-xs font-light">
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                  <span>Бишкек, Кыргызстан, ул. Киевская, 125</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                  <span>+996 700 123 456</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageSquare className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                  <span>номер WhatsApp: +{whatsappNumber}</span>
                </li>
              </ul>
            </div>

            {/* Market credentials, trust badge column */}
            <div className="space-y-4">
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white mb-4">Локальный пошив</h4>
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <p className="font-sans text-[11px] leading-relaxed text-zinc-400">
                  Мы поддерживаем текстильную культуру Кыргызстана и гарантируем высочайший крой каждого изделия.
                </p>
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-500 font-bold block mt-3">
                  🇰🇬 Сделано в Бишкеке
                </span>
              </div>
            </div>

          </div>

          <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
            <p>&copy; {new Date().getFullYear()} Suraya Brand. Все права защищены.</p>
            <div className="flex gap-4">
              <span>Собственное производство в КР</span>
              <span>•</span>
              <button onClick={() => setActiveSection('admin')} className="hover:text-zinc-400 underline">Панель Администратора</button>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Drawer & Modals Global Elements */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        whatsappNumber={whatsappNumber}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsappNumber={whatsappNumber}
      />

      <ChatBot />

    </div>
  );
}
