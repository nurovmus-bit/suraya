export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'tshirt' | 'sweatshirt';
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  material: string;
  density: string;
  description: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  city: 'Bishkek' | 'Osh' | 'Jalal-Abad' | 'Karakol' | 'Naryn' | 'Talas' | 'Batken' | 'Other_KG' | 'CIS';
  address: string;
  paymentMethod: 'cash' | 'mbank' | 'optima';
}

export const SIZE_CHART = [
  { size: 'S', chest: '96 - 100 см', length: '68 см', sleeve: '20 см (футб.) / 60 см (свит.)' },
  { size: 'M', chest: '100 - 104 см', length: '70 см', sleeve: '21 см (футб.) / 62 см (свит.)' },
  { size: 'L', chest: '104 - 108 см', length: '72 см', sleeve: '22 см (футб.) / 64 см (свит.)' },
  { size: 'XL', chest: '108 - 114 см', length: '74 см', sleeve: '23 см (футб.) / 66 см (свит.)' },
  { size: 'XXL', chest: '114 - 120 см', length: '76 см', sleeve: '24 см (футб.) / 68 см (свит.)' },
];
