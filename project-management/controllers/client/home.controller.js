const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/products");

//[GET] /home
module.exports.index = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(6);

  const newProductsFeartued = productsHelper.priceNewProducts(productsFeatured);

  // lấy ra sản phẩm mới nhất
  const productsNew = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).sort({position: "desc"}).limit(6);

  const newProductsNew = productsHelper.priceNewProducts(productsNew);


  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeartued,
    productsNew: newProductsNew
  });
}