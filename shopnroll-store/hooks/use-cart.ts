import { create } from "zustand";
import { CartItem } from "@/lib/types";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  checkExpiry: () => void;
}

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === data.product.id
        );
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.product.id === data.product.id
                ? { ...data, addedAt: Date.now() }
                : item
            ),
          });
        } else {
          set({
            items: [...currentItems, { ...data, addedAt: Date.now() }],
          });
        }
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.product.id !== id)],
        });
      },
      removeAll: () => set({ items: [] }),
      checkExpiry: () => {
        const currentTime = Date.now();
        set({
          items: get().items.filter(
            (item) => currentTime - (item as CartItem).addedAt < THIRTY_DAYS
          ),
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.checkExpiry();
        }
      },
    }
  )
);

export default useCart;
