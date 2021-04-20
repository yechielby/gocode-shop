import './Header.css';

function Header({categories, categorySlected, sortSlected}) {
    return (
        <nav className="product-filter">
            <h1>Jackets</h1>

            <div className="sort">
                <div className="collection-sort">
                    <label>Filter by:</label>
                    <select onChange={(event)=>categorySlected(event.target.value)}>
                        <option value="">All Category</option>
                        { categories.map(category => <option value={category} key={category}>{category}</option>) }
                    </select>
                </div>

                <div className="collection-sort">
                    <label>Sort by:</label>
                    <select onChange={(event)=>sortSlected(event.target.value)}>
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