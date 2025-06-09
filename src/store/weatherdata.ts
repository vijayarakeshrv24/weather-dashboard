// src/store/weatherdata.ts
import { create } from 'zustand';

type StoreState = {
  city: string;
  setCity: (city: string) => void;
};

export const useWeatherStore = create<StoreState>((set) => ({
  city: 'chennai',
  setCity: (city) => set({ city }),
}));
