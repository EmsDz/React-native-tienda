import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Address = {
  street: string;
  city: string;
  zipCode: string;
};

type UserData = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  isActive: boolean;
  address: Address;
  role: string;
};

export const useAuth = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      userData: null as UserData | null,

      setUser: (user: string) => set({ user }),
      setToken: (token: string) => set({ token }),
      setUserData: (userData: UserData) => set({ userData }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
