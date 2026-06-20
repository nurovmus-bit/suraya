import React from 'react';
import { ShoppingBag, Star, HelpCircle, Phone, Compass, MapPin, ShieldAlert, Instagram } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export default function Header({
  activeSection,
  setActiveSection,
  cart,
  setIsCartOpen,
  isAdmin,
  setIsAdmin,
}: HeaderProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'about', label: 'О бренде' },
    { id: 'delivery', label: 'Доставка и оплата' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-3 group"
            id="header-logo-btn"
          >
            <span className="font-display font-black text-2xl tracking-tighter text-slate-900 group-hover:text-slate-800 transition-colors uppercase">
              Suraya
            </span>
            <span className="h-4 w-[1px] bg-slate-200 hidden sm:inline-block"></span>
            <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-bold hidden sm:inline-block">
              Bishkek
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium uppercase tracking-widest text-slate-500">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-sans text-xs font-semibold tracking-widest pb-1 border-b-2 transition-all duration-150 cursor-pointer ${
                  activeSection === item.id
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-900 hover:border-slate-300'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Quick Instagram / Contact */}
            <a
              href="https://instagram.com/suraya_brand"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors hidden sm:inline-flex"
              title="Наш Instagram"
              id="instagram-social-btn"
            >
              <Instagram className="h-5 w-5" />
            </a>

            {/* Bishkek Location Indicator Badge styled like the Professional Polish guideline mockup */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 text-xs font-medium text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Бишкек</span>
            </div>

            {/* Admin Toggle Panel */}
            <button
              onClick={() => {
                setActiveSection(activeSection === 'admin' ? 'catalog' : 'admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3 py-1 bg-slate-50 border rounded-full text-[10px] font-mono font-medium transition-all duration-200 uppercase tracking-wider ${
                activeSection === 'admin'
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
              title="Управление каталогом"
              id="admin-panel-toggle"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeSection === 'admin' ? 'bg-amber-400' : 'bg-slate-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${activeSection === 'admin' ? 'bg-amber-500' : 'bg-slate-500'}`}></span>
              </span>
              <span>Админ</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer border border-slate-200"
              aria-label="Открыть корзину"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="h-5 w-5 stroke-[2]" />
              {cartCount > 0 && (
                <span className="bg-slate-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full absolute -top-1 -right-2 font-mono font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            
          </div>

        </div>
      </div>
      
      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around py-2.5 bg-slate-50 border-t border-slate-100 overflow-x-auto text-nowrap scrollbar-none px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-sans text-[11px] font-bold tracking-wider px-3.5 py-1.5 text-center rounded-full transition-all duration-150 cursor-pointer ${
              activeSection === item.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            id={`nav-mob-${item.id}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
