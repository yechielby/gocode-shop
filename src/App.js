import { useEffect, useState } from 'react';


import './App.css';
import Header from './Header';
import Products from './Products';
import Cart from './Cart';
import { useCart } from './contexts/CartContext';

function App() {
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('1');
  const { cart=[], showCart, setShowCart } = useCart();

  //hook ref
  // const inputRef = useRef(null);
  // inputRef.current.focus();
  // (<input ref="inputRef"></input>)

  useEffect(()=> {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      setProducts(data);
    });
  }, []);
  
  function onCategorySlected(category) {
    setCategory(category);
  }

  function onSortSlected(value) {
    const [fieldName, direction] = value.split(',');
    setSortBy(fieldName);
    setOrder(direction);
  }

  return (
    
      <div className={`App ${showCart?'openCart':'closeCart'}`} >
        <Header onCategorySlected={onCategorySlected} onSortSlected={onSortSlected} setShowCart={setShowCart} countItems={cart.reduce((sum,p) => sum + (p.count), 0)}
          categories={products.map(p => p.category).filter((value, index, array) => array.indexOf(value)===index)} />
        <div className="content">
          <Products products={products.filter((p)=>( (p.category === category) || (!category.length) ))
            .sort((a,b)=>((a[sortBy]>b[sortBy]?1:-1)*order))}/>
        </div>
        <div className="sidebar">
          <Cart cart={cart} setShowCart={setShowCart}/>
        </div>
      </div> 
     
  );
}

export default App;
