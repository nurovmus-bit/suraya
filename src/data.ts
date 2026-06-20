import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Черная Футболка Oversize',
    tagline: 'Базовая футболка свободного кроя для любого повода',
    category: 'tshirt',
    price: 1200,
    originalPrice: 1500,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Глубокий черный', hex: '#0B0B0C' },
      { name: 'Графит', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '95% премиум хлопок / 5% эластан',
    density: '220 г/м² (плотный премиум трикотаж)',
    description: 'Идеальная футболка свободного силуэта из плотного хлопкового трикотажа пенье. Мягкая, тяжелая ткань красиво держит форму, не растягивается и не выцветает после многочисленных стирок. Собственное производство в Бишкеке гарантирует контроль швов.',
    isNew: true,
    isPopular: true
  },
  {
    id: '2',
    name: 'Свитшот Minimalist Серый',
    tagline: 'Свитшот для тех, кто ценит комфорт в движении',
    category: 'sweatshirt',
    price: 2400,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Меланж серый', hex: '#9CA3AF' },
      { name: 'Черный', hex: '#0B0B0C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '90% турецкий трехниточный футер / 10% полиэстер (для удержания тепла)',
    density: '340 г/м² (сверхтеплый, формоудерживающий)',
    description: 'Наш культовый свитшот свободного кроя с классическим круглым вырезом. Плотная хлопковая ткань с мягким начесом внутри согреет прохладными вечерами в горах или на улицах Бишкека. Двойные строчки воротника и манжет гарантируют долговечность.',
    isPopular: true
  },
  {
    id: '3',
    name: 'Футболка Молочный Oversize',
    tagline: 'Легкость и чистота линий в каждом шве',
    category: 'tshirt',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Молочный белый', hex: '#F9F6EE' },
      { name: 'Бежевый песок', hex: '#EAE0D5' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '95% натуральный хлопок / 5% спандекс',
    density: '200 г/м²',
    description: 'Базовая футболка в теплом молочном оттенке. Свободный крой оверсайз, опущенное плечо и дышащая ткань пенье. Превосходно сочетается с любыми элементами гардероба. Идеально подходит под нанесение индивидуальных принтов или как чистая база.',
    isNew: true
  },
  {
    id: '4',
    name: 'Свитшот Sage Green',
    tagline: 'Природный шалфейный оттенок для стильного кэжуал образа',
    category: 'sweatshirt',
    price: 2600,
    originalPrice: 2900,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Шалфейный зеленый', hex: '#879884' },
      { name: 'Земляно-серый', hex: '#5C5454' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% органический хлопок футер трехнитка',
    density: '350 г/м²',
    description: 'Благородный оттенок шалфея идеально дополняет цветовую палитру одежды Suraya. Крой вдохновлен винтажной спортивной одеждой, обладает повышенным комфортом, регулируемым внутренним балансом температуры и превосходными манжетами из эластичного рибана.',
    isNew: true
  },
  {
    id: '5',
    name: 'Футболка Terracotta Dust',
    tagline: 'Теплый терракотовый оттенок с чувством свободы',
    category: 'tshirt',
    price: 1100,
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Песочная терракота', hex: '#D18063' },
      { name: 'Глубокий шоколад', hex: '#4B382A' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '98% мягкий органический трикотаж / 2% лайкра',
    density: '210 г/м²',
    description: 'Футболка в уникальном кирпично-терракотовом цвете. Сделана по эксклюзивным лекалам нашей мастерской в Бишкеке, сидит великолепно как на девушках, так и на парнях. Подчеркивает индивидуальный стиль и дарит приятную мягкость в течение всего дня.',
    isPopular: true
  }
];
