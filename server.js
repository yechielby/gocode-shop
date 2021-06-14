const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const ProductSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model("Product", ProductSchema);

app.use(express.json());

// Serve static files from the React app
app.use(express.static("client/build"));

app.get("/api/products", (req, res) => {
  const { q, cat, min, max } = req.query;
  const regexQ = new RegExp(decodeURIComponent(q), "i");
  const query = {
    ...(!!cat && { category: decodeURIComponent(cat) }),
    ...(!!min && { price: { $gte: +min } }),
    ...(!!max && { price: { $lte: +max } }),
    ...(!!q && { $or: [{ title: regexQ }, { description: regexQ }] }),
  };
  Product.find(query)
    .exec()
    .then((products) => {
      const newProducts = products.map((p) => {
        const product = { id: p._doc._id, ...p._doc };
        delete product._id;
        delete product.__v;
        return product;
      });
      res.send(newProducts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((p) => {
      const product = { id: p._doc._id, ...p._doc };
      delete product._id;
      delete product.__v;
      res.send(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send();
      //   res.status(500).send();
    });
});

app.post("/api/products", (req, res) => {
  Product.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
  })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;

  Product.findById(id)
    .then((product) => {
      product.title = title ?? product.title;
      product.price = price ?? product.price;
      product.description = description ?? product.description;
      product.category = category ?? product.category;
      product.image = image ?? product.image;
      product.save().then(
        (product) => {
          res.send(product);
        },
        (err) => {
          res.status(400).send(err);
        },
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .exec()
    .then((product) => {
      if (product) {
        res.send(product);
      } else {
        res.status(404).send();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

//"mongodb://localhost/gocode_shop_db"
mongoose
  //   .connect("mongodb://localhost/gocode_shop_db", {
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSPORT}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  )
  .then(() => {
    console.log("MongoDB is Running!");
    app.listen(process.env.PORT || 8080);
  });
