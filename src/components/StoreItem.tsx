import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type Props = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export const StoreItem = ({ id, imgUrl, name, price }: Props) => {
  const {
    decreaseItemQuantity,
    getItemQuantity,
    increaseItemQuantity,
    removeItem,
  } = useShoppingCart();

  return (
    <Card className="h-100">
      <Card.Img
        src={imgUrl}
        variant="top"
        height={"200px"}
        style={{ objectFit: "cover" }}
      ></Card.Img>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="card-title">
          <span className="fs-2">{name}</span>
          <span className="text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {getItemQuantity(id) === 0 ? (
          <Button
            onClick={() => {
              increaseItemQuantity(id);
            }}
          >
            Add To Cart +
          </Button>
        ) : (
          <div className="w-100 d-flex flex-column align-items-center gap-3">
            <div className="w-100 d-flex align-items-center gap-3 justify-content-center">
              <Button
                onClick={() => {
                  decreaseItemQuantity(id);
                }}
              >
                -
              </Button>{" "}
              <span className="fs-2">{getItemQuantity(id)}</span> in cart
              <Button
                onClick={() => {
                  increaseItemQuantity(id);
                }}
              >
                +
              </Button>
            </div>
            <Button
              variant="outline-danger"
              className="w-50"
              onClick={() => {
                removeItem(id);
              }}
            >
              Remove Item
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
