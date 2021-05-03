import { useCart } from './contexts/CartContext';

import './CartItem.css';

function CartItem({product}) {

    const { addItemFromCart, removeItemFromCart, removeProductFromCart } = useCart();

    return (
        <div className="cart-item">
            <div className="cart-image">
                <img src={product.image} alt={product.title} />
                <div className="counts">
                    <span className="plus" onClick={() => addItemFromCart(product)}>+</span>
                    <span className="number">{ product.count }</span>
                    <span className={product.count ? "minus" : "minus display"} onClick={() => removeItemFromCart(product)}>−</span>
                </div>
            </div>
            <div className="cart-title">{product.title}</div>
            <div className="cart-price">${(product.count * product.price).toFixed(2)}</div>
            <div className="cart-delete-product" onClick={() => removeProductFromCart(product)} title="Remove This Product"></div>
        </div>
    );
}

export default CartItem;