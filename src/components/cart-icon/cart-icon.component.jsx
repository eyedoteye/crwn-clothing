import { ShoppingIcon, ItemCount, CartIconContainer } from "./cart-icon.styles";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { toggleIsCartOpen, cartQuantity } = useContext(CartContext);

  const toggleCartDropdown = () => {
    toggleIsCartOpen();
  };

  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <ShoppingIcon />
      <ItemCount>{cartQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
