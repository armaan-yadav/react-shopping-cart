import { Col, Row } from "react-bootstrap";
import products from "../data/index.json";
import { StoreItem } from "../components/StoreItem";
    
const Store = () => {
  return (
    <div>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <StoreItem {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Store;
