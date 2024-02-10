import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  vendor: string;
  quantity: number;
  image: string | null;
}

interface CartItems {
  cartProducts: CartItem[];
  totalItems: number;
  totalPrice: number;
  currentVendor: string | null;
}

interface CartStore {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  currentVendor: string | null;
  setCurrentVendor: (vendorName: string | null) => void;
}

const INITIAL_STATE = {
  cartProducts: [],
  totalItems: 0,
  totalPrice: 0,
  currentVendor: null,
  previousVendor: null,
};

export const useCartStore = create(
  persist<CartItems & CartStore>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart(item) {
        set((state) => {
          const { currentVendor } = state;
          if (!currentVendor) {
            return {
              ...state,
              cartProducts: [item],
              totalItems: 1,
              totalPrice: item.price,
            };
          }
          if (currentVendor === item.vendor) {
            return {
              ...state,
              cartProducts: [...state.cartProducts, item],
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + item.price,
            };
          }

          throw new Error('You can only order from a single vendor at a time.');
        });
      },
      removeFromCart(item) {
        set((state) => {
          const updatedState = {
            ...state,
            cartProducts: state.cartProducts.filter(
              (product) => product.id !== item.id
            ),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - item.price,
          };

          if (updatedState.cartProducts.length === 0) {
            updatedState.currentVendor = null;
          }

          return updatedState;
        });
      },
      clearCart() {
        set((state) => ({
          ...INITIAL_STATE,
          currentVendor: null,
        }));
      },
      setCurrentVendor: (vendorName) => {
        set({ currentVendor: vendorName });
      },
    }),
    {
      name: 'cart',
      getStorage: () => sessionStorage, // or localStorage
    }
  )
);
