export const SIZES = {
  regular: { id: 'regular', name: 'Regular', multiplier: 1.0, basePrice: 199 },
  medium: { id: 'medium', name: 'Medium', multiplier: 1.4, basePrice: 299 },
  large: { id: 'large', name: 'Large', multiplier: 1.8, basePrice: 429 },
};

export const CRUSTS = [
  { id: 'classic-hand-tossed', name: 'Classic Hand Tossed', extraPrice: 0 },
  { id: 'cheese-burst', name: 'Cheese Burst', extraPrice: 75 },
  { id: 'thin-crust', name: 'Crispy Thin Crust', extraPrice: 30 },
  { id: 'pan-crust', name: 'Fresh Pan', extraPrice: 40 },
];

export const TOPPINGS = [
  { id: 'extra-cheese', name: 'Mozzarella Cheese', price: 40, isPremium: false },
  { id: 'black-olives', name: 'Black Olives', price: 35, isPremium: false },
  { id: 'crisp-capsicum', name: 'Crisp Capsicum', price: 30, isPremium: false },
  { id: 'golden-corn', name: 'Golden Corn', price: 30, isPremium: false },
  { id: 'grilled-mushroom', name: 'Grilled Mushroom', price: 45, isPremium: false },
  // Premium toppings unlocked on Large
  { id: 'truffle-oil', name: 'Truffle Glaze', price: 70, isPremium: true },
  { id: 'smoked-paneer', name: 'Smoked Peri-Peri Paneer', price: 65, isPremium: true },
  { id: 'chargrilled-chicken', name: 'Chargrilled Roast Chicken', price: 80, isPremium: true },
];

export const PRESET_PIZZAS = [
  {
    id: 'pizza-margherita',
    name: 'Farmhouse Margherita',
    description: 'Fresh basil leaves, rich San Marzano tomato sauce, and double mozzarella.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    defaultSize: 'regular',
    defaultCrust: 'classic-hand-tossed',
  },
  {
    id: 'pizza-veggie-supreme',
    name: 'Garden Veggie Supreme',
    description: 'Black olives, crisp capsicum, golden corn, fresh mushrooms, and melted gouda.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    defaultSize: 'medium',
    defaultCrust: 'cheese-burst',
  },
  {
    id: 'pizza-rustic-fiery',
    name: 'Rustic Fiery Feast',
    description: 'Red paprika, jalapenos, spicy tomato puree, and infused garlic olive oil.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    defaultSize: 'large',
    defaultCrust: 'thin-crust',
  },
];