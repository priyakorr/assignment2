const { Product, Category } = require("../models/product");

const getProducts = (req, res) => {
  const nameSubstring = req.query.name;

  let promise;
  if (nameSubstring) {
    promise = Product.find({ name: { $regex: nameSubstring, $options: "i" } });
  } else {
    promise = Product.find();
  }

  promise
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const createProduct = (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: err.message });
    });
};

const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const deleteProductById = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const deleteAllProducts = (req, res) => {
  Product.deleteMany({})
    .then(() => {
      res.json({ message: "All products deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
};
