import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";

const ShoppingCart = () => {
  const { isCartOpen, closeCart, cartItems, cartTotal } = useShoppingCart();

  return (
    <Offcanvas show={isCartOpen} onHide={() => closeCart()} placement="end">
      <Offcanvas.Header closeButton>Cart</Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem {...item} key={item.id} />
          ))}
        </Stack>
        <h3 style={{ textAlign: "right" }}>
          Total {formatCurrency(cartTotal)}
        </h3>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
