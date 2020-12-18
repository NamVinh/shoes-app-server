const Product = require("../../Models/Models.Products");

const getProduct = async (req, res) => {
  try {
    let ProductsData = await Product.find().populate({
      path: "category",
      select: "name",
    });

    return res.status(200).json({ status: true, data: ProductsData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};
const getProductByCategoryId = async (req, res) => {
  console.log(req);
  
  try {
    let ProductsData = await Product.find({ category: req.params.id }).populate({
      path: "category",
      select: "name",
    });
    return res.status(200).json({ status: true, data: ProductsData });
  } catch (error) {
    return res.status(400).json({ status: true, msg: "Có lỗi xảy ra" });
  }
};

const removeProduct = async (req, res) => {
    try {
      let ProductsData = await Products.findByIdAndRemove(req.params.id);
      return res.status(200).json({ status: true, data: ProductsData });
    } catch (error) {
      return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
    }
  };
module.exports = {
  getProduct,
  getProductByCategoryId,
  removeProduct
};
