import { createContext, useContext, useState } from "react";

// export default createContext();

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  function addItemFromCart(product) {
    let newCart;
    if (cart.find((p) => p.id === product.id)) {
      newCart = cart.map((p) =>
        p.id === product.id ? { ...p, count: ++p.count } : p,
      );
    } else {
      newCart = [...cart, { ...product, count: 1 }];
      if (newCart.length === 1) {
        setShowCart(true);
      }
    }
    setCart(newCart);
  }
  function removeItemFromCart(product) {
    let newCart;
    if (cart.find((p) => p.id === product.id && p.count > 1)) {
      newCart = cart.map((p) =>
        p.id === product.id ? { ...p, count: --p.count } : p,
      );
    } else {
      if (cart.length === 1) {
        setShowCart(false);
      }
      newCart = cart.filter((p) => p.id !== product.id);
    }
    // console.log(newCart);
    setCart(newCart);
  }
  function removeProductFromCart(product) {
    if (cart.length === 1) {
      setShowCart(false);
    }
    let newCart = cart.filter((p) => p.id !== product.id);
    // console.log(newCart);
    setCart(newCart);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemFromCart,
        removeItemFromCart,
        removeProductFromCart,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartContext;
