import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import "./Header.css";

function Header({
  categories,
  onCategorySlected,
  onSortSlected,
  setShowCart,
  countItems,
  sliderValue,
  setSliderValue,
  marks,
}) {
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

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: 1700,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

  function valuetext(value) {
    return `${value}$`;
  }

  const classes = useStyles();

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
      </nav>
      <div className="a">
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
    </>
  );
}

export default Header;
