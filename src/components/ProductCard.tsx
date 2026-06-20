import React from 'react';
import { ShoppingCart, Eye, Heart, Flame } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export default function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col overflow-hidden bg-white border border-slate-100 p-2 card-hover-effect cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Photo Stage (Clean and sleek sharp rectangular visual frame) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 w-full mb-4">
        
        {/* Badges container */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-slate-900 text-white">
              NEW
            </span>
          )}
          {product.isPopular && (
            <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1">
              <Flame className="h-2.5 w-2.5 text-slate-900 fill-slate-900" /> POPULAR
            </span>
          )}
        </div>

        {discount && (
          <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest">
            -{discount}%
          </div>
        )}

        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out select-none"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Hover quick settings overlays */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between pointer-events-auto">
          <span className="text-[10px] font-sans text-white/90 uppercase tracking-widest">Детали изделия</span>
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="p-1.5 bg-white text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Быстрый просмотр"
              id={`quick-view-${product.id}`}
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Info labels */}
      <div className="flex-1 flex flex-col px-2 pb-2">
        <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">
          {product.category === 'tshirt' ? 'Оверсайз футболка' : 'Свитшот на флисе'}
        </span>
        
        <h3 className="font-display font-bold text-slate-900 text-sm tracking-tight group-hover:text-slate-600 transition-colors uppercase line-clamp-1">
          {product.name}
        </h3>
        
        <p className="font-sans text-[11px] text-slate-400 mt-1 line-clamp-1 italic font-light">
          {product.tagline}
        </p>

        {/* Price Tag Line with beautiful Space Grotesk alignment */}
        <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-slate-100">
          <span className="font-display text-sm font-bold text-slate-900 uppercase">
            {product.price.toLocaleString('ru-RU')} сом
          </span>
          {product.originalPrice && (
            <span className="font-mono text-xs text-slate-400 line-through">
              {product.originalPrice.toLocaleString('ru-RU')} сом
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
}
