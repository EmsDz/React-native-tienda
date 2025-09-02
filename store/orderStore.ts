import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define types for delivery information
type DeliveryInfo = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  notes?: string;
};

type item = {
  productId: number,
  quantity: number,
  price: number,
};

export type order = {
  id: string;// unique ID
  items: item[],
  deliveryInfo: DeliveryInfo,
  createdAt: string,
};

export const useOrders = create(
  persist(
    (set, get) => ({
      orders: null as order[] | null,

      setUser: (orders: order) => set({ orders }),
    }),
    {
      name: 'order-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
