import { useCart } from "./contexts/CartContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Products from "./views/Products";
import ProductDetails from "./views/ProductDetails";
import Cart from "./components/Cart";

function App() {
  const { cart = [], showCart, setShowCart } = useCart();

  //hook ref
  // const inputRef = useRef(null);
  // inputRef.current.focus();
  // (<input ref="inputRef"></input>)

  return (
    <div className={`App ${showCart ? "openCart" : "closeCart"}`}>
      <Header
        setShowCart={setShowCart}
        countItems={cart.reduce((sum, p) => sum + p.count, 0)}
      />
      <div className="content">
        <Router>
          <Switch>
            <Route path="/products/:id">
              <ProductDetails />
            </Route>
            <Route path="/">
              <Products />
            </Route>
          </Switch>
        </Router>
      </div>
      <div className="sidebar">
        <Cart cart={cart} setShowCart={setShowCart} />
      </div>
    </div>
  );
}

export default App;
