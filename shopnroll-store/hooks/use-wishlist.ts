import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, WishlistItem } from "@/lib/types";

interface WishlistStore {
  items: WishlistItem[];
  addItem: (data: {
    product: Product;
    selectedColor?: string | null;
    selectedSize?: string | null;
    quantity: number;
  }) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  checkExpiry: () => void;
}

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const useWishlist = create(
  persist<WishlistStore>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === data.product.id
        );

        if (!existingItem) {
          set({
            items: [
              ...currentItems,
              {
                ...data,
                addedAt: Date.now(),
              },
            ],
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
            (item) => currentTime - item.addedAt < THIRTY_DAYS
          ),
        });
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.checkExpiry();
        }
      },
    }
  )
);

export default useWishlist;
