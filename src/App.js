import { useEffect, useState } from "react";

import "./App.css";
import Header from "./Header";
import Products from "./Products";
import Cart from "./Cart";
import { useCart } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("1");
  const [sliderValue, setSliderValue] = useState([0, 1000]);

  const { cart = [], showCart, setShowCart } = useCart();

  //hook ref
  // const inputRef = useRef(null);
  // inputRef.current.focus();
  // (<input ref="inputRef"></input>)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  function onCategorySlected(category) {
    setCategory(category);
  }

  function onSortSlected(value) {
    const [fieldName, direction] = value.split(",");
    setSortBy(fieldName);
    setOrder(direction);
  }

  return (
    <div className={`App ${showCart ? "openCart" : "closeCart"}`}>
      <Header
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        onCategorySlected={onCategorySlected}
        onSortSlected={onSortSlected}
        setShowCart={setShowCart}
        countItems={cart.reduce((sum, p) => sum + p.count, 0)}
        categories={products
          .map((p) => p.category)
          .filter((value, index, array) => array.indexOf(value) === index)}
        marks={products
          .filter((p) => p.category === category || !category.length)
          .map((p) => ({ value: p.price, label: "" })) //`$${p.price}`
          .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))}
      />
      <div className="content">
        <Products
          products={products
            .filter((p) => p.category === category || !category.length)
            .filter(
              (p) => sliderValue[0] <= p.price && p.price <= sliderValue[1],
            )
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * order)}
        />
      </div>
      <div className="sidebar">
        <Cart cart={cart} setShowCart={setShowCart} />
      </div>
    </div>
  );
}

export default App;
