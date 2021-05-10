import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

import "./Product.css";

function Product({ product }) {
  const { cart, addItemFromCart, removeItemFromCart } = useCart();

  const count =
    (cart.length && cart.find((p) => p.id === product.id)?.count) || 0;

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.title}
          title={product.description}
        />
        <div className="counts">
          <span className="plus" onClick={() => addItemFromCart(product)}>
            +
          </span>
          <span className="number">{count}</span>
          <span
            className={count ? "minus" : "minus display"}
            onClick={() => removeItemFromCart(product)}
          >
            −
          </span>
        </div>
      </div>

      <div className="product-info">
        <Link to={`/products/${product.id}`}>
          <h5>{product.title}</h5>
        </Link>
        <h6>${product.price.toFixed(2)}</h6>
      </div>
    </div>
  );
}

export default Product;
