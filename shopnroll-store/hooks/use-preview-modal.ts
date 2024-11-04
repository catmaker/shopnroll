import { create } from "zustand";
import { Product } from "@/lib/types";

interface PreviewModalStore {
  isOpen: boolean;
  onOpen: (data: Product) => void;
  onClose: () => void;
  data?: Product;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  onOpen: (data: Product) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
  data: undefined,
}));

export default usePreviewModal;
