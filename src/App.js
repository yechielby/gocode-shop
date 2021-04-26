import Header from './Header';
import Products from './Products';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('1');
  useEffect(()=> {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      setProducts(data);
    });
  },[])

  
  function onCategorySlected(category) {
    setCategory(category);
  }

  function onSortSlected(value) {
    const [fieldName, direction] = value.split(',');
    setSortBy(fieldName);
    setOrder(direction);
  }

  return (
    <div className="App">
      <Header categories={products.map(p => p.category).filter((value, index, array) => array.indexOf(value)===index)} onCategorySlected={onCategorySlected} onSortSlected={onSortSlected}/>
      <Products products={products.filter((p)=>( (p.category === category) || (!category.length) ))
        .sort((a,b)=>((a[sortBy]>b[sortBy]?1:-1)*order))}/>
    </div>
  );
}

export default App;
