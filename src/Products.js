import Product from './Product';
import './Products.css';

function Products({products=[]}) {
    return (
        
        <section className="products">
            {
              !products.length &&  (<div class="example"><span class="smooth spinner" /><span class="label">Smooth Spinner</span></div>)
            }
            {products.map(product => <Product key={product.id} product={product}/>)}
        </section>
    );
}

export default Products;