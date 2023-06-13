import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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
      return {
        ...state,
        ...payload,
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
  const [{ isCartOpen, cartItems, cartQuantity, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (cartItems) => {
    const cartQuantity = cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.quantity,
      0
    );
    const cartTotal = cartItems.reduce(
      (accumulator, cartItem) =>
        accumulator + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartQuantity,
      cartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const toggleIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (cartItemToDelete) => {
    const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
    updateCartItemsReducer(newCartItems);
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
