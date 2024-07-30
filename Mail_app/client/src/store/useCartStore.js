import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ),
      };
    } else {
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      };
    }
  }),
  removeFromCart: (itemId) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== itemId),
  })),
  increaseQuantity: (itemId) => set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),
  decreaseQuantity: (itemId) => set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ),
  })),
  resetCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
