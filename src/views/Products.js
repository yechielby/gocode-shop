import { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import Product from "../components/Product";
import Spinner from "../components/Spinner";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("1");
  const [sliderValue, setSliderValue] = useState([0, 1000]);

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

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  function valuetext(value) {
    return `${value}$`;
  }

  const categories = products
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);
  const marks = products
    .filter((p) => p.category === category || !category.length)
    .map((p) => ({ value: p.price, label: "" }))
    .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0));

  return (
    <>
      <div className="sort">
        <div className="collection-sort">
          <label>Filter by:</label>
          <select onChange={(event) => onCategorySlected(event.target.value)}>
            <option value="">All Category</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="collection-sort">
          <label>Sort by:</label>
          <select onChange={(event) => onSortSlected(event.target.value)}>
            <option value="id,1">Featured</option>
            <option value="id,-1">New Arrival</option>
            <option value="title,1">Alphabetically, A-Z</option>
            <option value="title,-1">Alphabetically, Z-A</option>
            <option value="price,1">Price, low to high</option>
            <option value="price,-1">Price, high to low</option>
          </select>
        </div>
      </div>
      <div className="slider">
        {marks.length > 0 && (
          <Slider
            value={sliderValue}
            onChange={handleChange}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            marks={marks}
            defaultValue={[marks[0].value, marks[marks.length - 1].value]}
            min={marks[0].value}
            max={marks[marks.length - 1].value}
            valueLabelDisplay="on"
          />
        )}
      </div>
      <section className="products">
        {!products.length && <Spinner />}
        {products
          .filter((p) => p.category === category || !category.length)
          .filter((p) => sliderValue[0] <= p.price && p.price <= sliderValue[1])
          .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * order)
          .map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </section>
    </>
  );
}

export default Products;
