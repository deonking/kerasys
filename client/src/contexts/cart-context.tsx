import { createContext, useContext, useReducer, useEffect, useMemo, useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CartItemWithProduct } from "@shared/schema";

interface CartState {
  items: CartItemWithProduct[];
  isOpen: boolean;
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItemWithProduct[] }
  | { type: "SET_OPEN"; payload: boolean }
  | { type: "TOGGLE_OPEN" };

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ITEMS": {
      const items = action.payload;
      const total = items.reduce((sum, item) => {
        return sum + parseFloat(item.product.salePrice) * item.quantity;
      }, 0);
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items,
        total,
        itemCount,
      };
    }
    case "SET_OPEN":
      return { ...state, isOpen: action.payload };
    case "TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
    refetchOnWindowFocus: false,
  });



  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      const response = await apiRequest("POST", "/api/cart", { productId, quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const response = await apiRequest("PUT", `/api/cart/${productId}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiRequest("DELETE", `/api/cart/${productId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/cart");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });



  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    await addToCartMutation.mutateAsync({ productId, quantity });
  }, [addToCartMutation]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    await updateQuantityMutation.mutateAsync({ productId, quantity });
  }, [updateQuantityMutation]);

  const removeFromCart = useCallback(async (productId: string) => {
    await removeFromCartMutation.mutateAsync(productId);
  }, [removeFromCartMutation]);

  const clearCart = useCallback(async () => {
    await clearCartMutation.mutateAsync();
  }, [clearCartMutation]);

  const openCart = useCallback(() => dispatch({ type: "SET_OPEN", payload: true }), []);
  const closeCart = useCallback(() => dispatch({ type: "SET_OPEN", payload: false }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_OPEN" }), []);

  const contextValue: CartContextType = useMemo(() => ({
    items: cartItems,
    isOpen: state.isOpen,
    total: cartItems.reduce((sum, item) => sum + (parseFloat(item.product.salePrice) * item.quantity), 0),
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  }), [cartItems, state.isOpen, addToCart, updateQuantity, removeFromCart, clearCart, openCart, closeCart, toggleCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
