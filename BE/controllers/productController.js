import Product from "../models/productModel.js";

export const getProducts = async (req, res, next) => {
  try {
    console.log("DB NAME:", Product.db.name);
    console.log("COLLECTION:", Product.collection.name);

    const products = await Product.find();

    console.log("PRODUCT COUNT:", products.length);

    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const lastId = await Product.findOne().sort({ id: -1 });

    const {
      name,
      price,
      category,
      image,
      description,
      stock,
      sold,
      rating,
      reviewCount,
      status,
      featured,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    const newId = lastId ? Number(lastId.id) + 1 : 1;

    const newProduct = await Product.create({
      id: newId,
      name,
      price,
      category,
      image,
      description,
      stock,
      sold,
      rating,
      reviewCount,
      status,
      featured,
    });

    res.status(201).json({
      message: "Đã thêm sản phẩm thành công",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const productName = req.query.name;
    if (!productName)
      return res.status(404).json({
        message: "Không tìm thấy được sản phẩm",
      });
    const product = await Product.find({
      name: { $regex: productName, $options: "i" },
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productsId = Number(req.params.id);
    const product = await Product.findOne({ id: productsId });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductNew = async (req, res, next) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 }).limit(6);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProducts = async (req, res, next) => {
  try {
    const productsId = Number(req.params.id);

    const {
      name,
      price,
      category,
      image,
      description,
      stock,
      sold,
      rating,
      reviewCount,
      status,
      featured,
    } = req.body;

    const updateField = {};

    if (name !== undefined) updateField.name = name;
    if (price !== undefined) updateField.price = price;
    if (category !== undefined) updateField.category = category;
    if (image !== undefined) updateField.image = image;
    if (description !== undefined) updateField.description = description;
    if (stock !== undefined) updateField.stock = stock;
    if (sold !== undefined) updateField.sold = sold;
    if (rating !== undefined) updateField.rating = rating;
    if (reviewCount !== undefined) updateField.reviewCount = reviewCount;
    if (status !== undefined) updateField.status = status;
    if (featured !== undefined) updateField.featured = featured;

    const updateProducts = await Product.findOneAndUpdate(
      { id: productsId },
      { $set: updateField },
      { new: true, runValidators: true },
    );

    if (!updateProducts) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Đã cập nhật sản phẩm thành công",
      product: updateProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productsId = Number(req.params.id);
    const productToDelete = await Product.findOneAndDelete({ id: productsId });
    if (!productToDelete)
      return res.status(404).json({ message: "Product not found" });

    res.json({
      message: "Đã xóa sản phẩm",
      product: productToDelete,
    });
  } catch (error) {
    next(error);
  }
};
