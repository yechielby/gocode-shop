import CartItem from "./CartItem";

import "./Cart.css";

function Cart({ cart, setShowCart }) {
  const countItems = cart.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="cart">
      <div className="title">
        Shopping cart ({countItems} item{countItems > 1 && "s"})
        <span className="close" onClick={() => setShowCart(false)}>
          ✕
        </span>
      </div>
      <div className="cart-list">
        {cart.map((p) => (
          <CartItem key={p.id} product={p} />
        ))}
      </div>
      <div className="subtotal">
        <div className="text">Subtotal</div>
        <div className="price">
          ${cart.reduce((sum, p) => sum + p.count * p.price, 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default Cart;
