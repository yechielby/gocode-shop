import { useEffect } from 'react';

import './Header.css';

function Header({categories, onCategorySlected, onSortSlected, setShowCart, countItems}) {

    
    useEffect(()=> {
        swing();
      }, [countItems]);

      function swing() {
        let swing = document.getElementById('swing');
        swing.classList.remove('swing'); 
        setTimeout(function() {
            swing.classList.add('swing'); 
        }, 100);
      }

    return (
        <nav className="product-filter">
        
            <div id="swing" className={`cart-icon swing items-${countItems}`}
                onClick={() => {setShowCart(true); swing();}}>🛒<span>{countItems}</span></div>

            <h1>My Online Store</h1>

            <div className="sort">
                <div className="collection-sort">
                    <label>Filter by:</label>
                    <select onChange={(event)=>onCategorySlected(event.target.value)}>
                        <option value="">All Category</option>
                        { categories.map(category => <option value={category} key={category}>{category}</option>) }
                    </select>
                </div>

                <div className="collection-sort">
                    <label>Sort by:</label>
                    <select onChange={(event)=>onSortSlected(event.target.value)}>
                        <option value="id,1">Featured</option>
                        <option value="id,-1">New Arrival</option>
                        <option value="title,1">Alphabetically, A-Z</option>
                        <option value="title,-1">Alphabetically, Z-A</option>
                        <option value="price,1">Price, low to high</option>
                        <option value="price,-1">Price, high to low</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}

export default Header;