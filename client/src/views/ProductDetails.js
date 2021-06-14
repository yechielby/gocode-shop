import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Spinner from "../components/Spinner";

function ProductDetails() {
  let { id } = useParams();
  const [product, setProduct] = useState();
  const { cart, addItemFromCart, removeItemFromCart } = useCart();
  let count = (cart.length && cart.find((p) => p.id === +id)?.count) || 0;

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  return (
    <div>
      {!product ? (
        <Spinner />
      ) : (
        <div className="product-card product-details">
          <div>
            <Link to="/">products</Link>/{id}
          </div>
          <div className="product-info">
            <div className="category">{product.category}</div>
            <h1 className="title">{product.title}</h1>
            <div className="price">${product.price.toFixed(2)}</div>
          </div>
          <div className="product-image">
            <img
              src={product.image}
              alt={product.title}
              title={product.title}
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
            <div className="description">{product.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
