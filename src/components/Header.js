import { useEffect } from "react";

import "./Header.css";

function Header({ setShowCart, countItems }) {
  useEffect(() => {
    swing();
  }, [countItems]);

  function swing() {
    let swing = document.getElementById("swing");
    swing.classList.remove("swing");
    setTimeout(function () {
      swing.classList.add("swing");
    }, 100);
  }

  return (
    <>
      <nav className="product-filter">
        <div
          id="swing"
          className={`cart-icon swing items-${countItems}`}
          onClick={() => {
            setShowCart(true);
            swing();
          }}
        >
          🛒<span>{countItems}</span>
        </div>

        <h1>My Online Store</h1>
      </nav>
    </>
  );
}

export default Header;
