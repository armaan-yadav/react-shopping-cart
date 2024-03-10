import { ReactNode, createContext, useContext, useState } from "react";
import products from "../data/index.json";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
type ShoppingCartProviderProps = {
  children: ReactNode;
};
export type Item = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
type CartItem = {
  id: number;
  quantity: number;
};
type ShoppingCart = {
  getItemById: (id: number) => Item;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
  cartTotal: number;
};
//initialising the  context //
const ShoppingCartContext = createContext({} as ShoppingCart);

//exporting a function to use the context => directly using useShoppingCart instead of useContext(ShoppingCartContext)
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const cartTotal = cartItems.reduce(
    (total, item) => total + getItemById(item.id).price * item.quantity,
    0
  );
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  function getItemQuantity(id: number): number {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseItemQuantity(id: number): void {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id == id) == null)
        //item does not exist in cart
        return [...currItems, { id, quantity: 1 }];
      else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseItemQuantity(id: number): void {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id != id);
      } else {
        return currItems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeItem(id: number): void {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  }
  function getItemById(id: number): Item {
    return products.find((item) => item.id === id)!;
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        getItemById,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isCartOpen,
        cartTotal,
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
}
