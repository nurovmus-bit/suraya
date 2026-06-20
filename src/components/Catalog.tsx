import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search, Grid, List, Smile, HelpCircle } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface CatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function Catalog({ products, onSelectProduct, onQuickAdd }: CatalogProps) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColorHex, setSelectedColorHex] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [sortBy, setSortBy] = useState<string>('popular');

  // Quick category tags
  const categories = [
    { id: 'all', label: 'Все товары' },
    { id: 'tshirt', label: 'Футболки' },
    { id: 'sweatshirt', label: 'Свитшоты' },
    { id: 'new', label: 'Новинки 🔥' },
  ];

  // All unique sizes across listing
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Extract all unique colors across currently configured items
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        map.set(c.hex, c.name);
      });
    });
    return Array.from(map.entries()).map(([hex, name]) => ({ hex, name }));
  }, [products]);

  // Handle resetting filters safely
  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedSizes([]);
    setSelectedColorHex('');
    setMaxPrice(3500);
    setSortBy('popular');
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Filter and Sort Processing
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filters
        if (selectedCategory === 'tshirt' && p.category !== 'tshirt') return false;
        if (selectedCategory === 'sweatshirt' && p.category !== 'sweatshirt') return false;
        if (selectedCategory === 'new' && !p.isNew) return false;

        // Search query filter
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Selected sizes filter (Must contain at least one of selected sizes)
        if (selectedSizes.length > 0) {
          const hasMatchingSize = p.sizes.some((s) => selectedSizes.includes(s));
          if (!hasMatchingSize) return false;
        }

        // Selected color filter
        if (selectedColorHex && !p.colors.some((col) => col.hex === selectedColorHex)) {
          return false;
        }

        // Price limit
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        return 0; // default
      });
  }, [products, selectedCategory, searchQuery, selectedSizes, selectedColorHex, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12" id="catalog-section">
      
      {/* Title block */}
      <div className="text-center md:text-left mb-10">
        <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 tracking-tighter uppercase">
          Коллекция одежды
        </h2>
        <p className="font-sans text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">
          Качество в деталях • Прямой пошив из Бишкека
        </p>
      </div>

      {/* Main Categories Navigation Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-slate-100 mb-10 overflow-x-auto">
        <div className="flex gap-1.5 p-1 bg-slate-50 border border-slate-200/60 rounded-none w-full md:w-auto overflow-x-auto scrollbar-none text-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-none text-[10px] font-sans font-bold uppercase tracking-widest transition-all duration-150 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              id={`cat-filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Searching bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs text-slate-800 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-none border border-slate-200 focus:outline-none focus:border-slate-900 transition-all font-sans"
            id="catalog-search-input"
          />
        </div>
      </div>

      {/* Responsive layout: Filter sidebar + product grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Interactive Filter Panel */}
        <div className="lg:col-span-1 space-y-6 bg-slate-50 p-6 border border-slate-100 h-fit" id="filter-sidebar">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <span className="font-sans font-extrabold text-xs text-slate-800 tracking-wider uppercase flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Фильтры
            </span>
            <button
              onClick={resetFilters}
              className="text-[10px] font-mono text-slate-400 hover:text-red-650 flex items-center gap-1 transition-colors uppercase font-bold"
              id="reset-filters-btn"
            >
              <RotateCcw className="h-3 w-3" /> Сбросить
            </button>
          </div>

          {/* Size Multi-Filter */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              Размер одежды
            </h4>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((sz) => {
                const active = selectedSizes.includes(sz);
                return (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`h-9 w-9 text-xs font-mono font-bold border flex items-center justify-center transition-all ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                    }`}
                    id={`filter-size-${sz}`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Pallettes Switcher */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              Цветовая гамма
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColorHex('')}
                className={`h-7 px-2.5 text-[10px] font-sans font-bold uppercase tracking-wider border flex items-center justify-center transition-all cursor-pointer ${
                  selectedColorHex === ''
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                }`}
                id="filter-color-all"
              >
                Все цвета
              </button>
              {allColors.map((col) => {
                const active = selectedColorHex === col.hex;
                return (
                  <button
                    key={col.hex}
                    onClick={() => setSelectedColorHex(col.hex)}
                    className="group relative h-7 w-7 rounded-full border-2 transition-all duration-150 flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor: col.hex,
                      borderColor: active ? '#0f172a' : '#e2e8f0',
                    }}
                    title={col.name}
                    id={`filter-color-${col.name}`}
                  >
                    {active && (
                      <span className="block h-2 w-2 rounded-full bg-white shadow-xs" />
                    )}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded text-nowrap z-20 font-sans">
                      {col.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                Макс. Цена
              </h4>
              <span className="font-mono text-xs font-bold text-slate-900">
                {maxPrice} сом
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="3500"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer h-1 bg-slate-200 rounded-none appearance-none"
              id="filter-price-slider"
            />
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>1000 сом</span>
              <span>3500 сом</span>
            </div>
          </div>

          {/* Sorting Controller */}
          <div className="space-y-2.5 pt-2">
            <h4 className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              Сортировка по
            </h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white text-xs px-3 py-2 border border-slate-200 rounded-none focus:outline-none focus:border-slate-900 font-sans text-slate-800 cursor-pointer"
              id="filter-sort-select"
            >
              <option value="popular">Рекомендовать (Популярное)</option>
              <option value="price-asc">Цены: Сначала дешевле</option>
              <option value="price-desc">Цены: Сначала дороже</option>
            </select>
          </div>
        </div>

        {/* Right Product Grid Column */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200">
              <p className="font-sans text-base text-slate-600 font-medium">
                Подходящих товаров не найдено
              </p>
              <p className="font-sans text-xs text-slate-400 mt-1 max-w-sm mx-auto p-4 leading-relaxed">
                Попробуйте изменить параметры фильтров (размеры, цвета или макс. цену) или введите другой поисковый запрос.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2.5 bg-slate-900 text-white font-mono text-xs font-bold uppercase transition hover:bg-slate-800 shadow-md"
                id="no-products-reset-btn"
              >
                Сбросить поиск
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-slate-400 font-bold uppercase">
                  Найдено товаров: {filteredProducts.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={onSelectProduct}
                    onQuickAdd={onQuickAdd}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
      
    </div>
  );
}
