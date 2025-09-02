import { create } from 'zustand';

export type product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};
type cardItem = {
  product: product, quantity: number
}

export type card = {
  addProduct: card;
  items: cardItem[],
}

export const useCart = create((set) => ({
  items: [] as card[],

  addProduct: (product: product) =>
    set((state: card) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

  resetCart: () => set({ items: [] })
}));
