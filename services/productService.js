const Product = require("../models/Product");

// =========================
// CREATE PRODUCT
// =========================
exports.createProduct = async (data, userId, businessId) => {
return await Product.create({
  ...data,
  user: userId,
  business: businessId,
})
};

// =========================
// GET ALL PRODUCTS
// =========================
exports.getAllProducts = async (businessId, query) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const search = query.search || "";

  const filter = {
    business: businessId,

    ...(search && {
      name: {
        $regex: search,
        $options: "i",
      },
    }),
  };

  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  return {
    products,

    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};
// =========================
// GET SINGLE PRODUCT
// =========================
exports.getProductById = async (id, businessId) => {
  const product = await Product.findOne({
    _id: id,
    business: businessId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// =========================
// UPDATE PRODUCT
// =========================
exports.updateProduct = async (id, data, businessId) => {
  const product = await Product.findOneAndUpdate(
    {
      _id: id,
      business: businessId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// =========================
// DELETE PRODUCT
// =========================
exports.deleteProduct = async (id, businessId) => {
  const product = await Product.findOneAndDelete({
    _id: id,
    business: businessId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
