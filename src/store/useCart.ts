import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  includeWatchBox: boolean;
  discountCode: string;
  appliedDiscount: { code: string; discount: number; type: string } | null;
  packetaBranch: { id: string; name: string } | null;


  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  setIncludeWatchBox: (include: boolean) => void;
  setDiscountCode: (code: string) => void;
  setAppliedDiscount: (discount: { code: string; discount: number; type: string } | null) => void;
  setPacketaBranch: (branch: { id: string; name: string } | null) => void;

}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      includeWatchBox: false,
      discountCode: "",
      appliedDiscount: null,
      packetaBranch: null,


      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      })),
      clearCart: () => set({ 
        items: [], 
        discountCode: "", 
        appliedDiscount: null, 
        packetaBranch: null 
      }),

      setIncludeWatchBox: (include) => set({ includeWatchBox: include }),
      setDiscountCode: (code) => set({ discountCode: code }),
      setAppliedDiscount: (discount) => set({ appliedDiscount: discount }),
      setPacketaBranch: (branch) => set({ packetaBranch: branch }),

    }),
    {
      name: 'seiko-cart-storage',
    }
  )
);
