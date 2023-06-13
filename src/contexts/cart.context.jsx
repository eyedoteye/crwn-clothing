import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === existingCartItem.id
        ? { ...cartItem, quantity: existingCartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1)
    return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);

  return cartItems.map((cartItem) =>
    cartItem.id === existingCartItem.id
      ? { ...cartItem, quantity: existingCartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, cartItemToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartQuantity: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      const cartQuantity = payload.reduce(
        (accumulator, cartItem) => accumulator + cartItem.quantity,
        0
      );
      const cartTotal = payload.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.quantity * cartItem.price,
        0
      );

      return {
        ...state,
        cartItems: payload,
        cartQuantity: cartQuantity,
        cartTotal: cartTotal,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartQuantity, setCartQuantity] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   const quantity = cartItems.reduce(
  //     (accumulator, cartItem) => accumulator + cartItem.quantity,
  //     0
  //   );
  //   setCartQuantity(quantity);
  // }, [cartItems]);

  // useEffect(() => {
  //   const cartTotal = cartItems.reduce(
  //     (accumulator, cartItem) =>
  //       accumulator + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(cartTotal);
  // }, [cartItems]);
  const [{ isCartOpen, cartItems, cartQuantity, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setCartItems = (cartItems) => {
    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems });
  };

  const toggleIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN });
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCart = removeCartItem(cartItems, cartItemToRemove);
    setCartItems(newCart);
  };

  const deleteItemFromCart = (cartItemToDelete) => {
    setCartItems(deleteCartItem(cartItems, cartItemToDelete));
  };

  const value = {
    isCartOpen,
    toggleIsCartOpen,
    addItemToCart,
    cartItems,
    cartQuantity,
    removeItemFromCart,
    deleteItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
