import Product from './Product';
import Spinner from './Spinner';
import './Products.css';

function Products({products=[]}) {
    return (
        <section className="products">
            {!products.length && (<Spinner/>)}
            {products.map(product => <Product key={product.id} product={product}/>)}
        </section>
    );
}

export default Products;