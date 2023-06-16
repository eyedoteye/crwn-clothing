import { ShoppingIcon, ItemCount, CartIconContainer } from "./cart-icon.styles";

import { useSelector, useDispatch } from "react-redux";

import { toggleIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const cartQuantity = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const toggleCartDropdown = () => {
    dispatch(toggleIsCartOpen());
  };

  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <ShoppingIcon />
      <ItemCount>{cartQuantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
