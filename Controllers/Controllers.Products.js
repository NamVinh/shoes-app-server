const Products = require("../Models/Models.Products");
const Category = require("../Models/Models.Category");

//get tất cả sản phẩm
exports.getAll = async (request, response) => {
  let categories = await Category.find({}).lean();
  let products = await Products.find() //{ category: request.categories.id })
  .populate({ path: "category", select: "name" })
  .lean();
  console.log(products)
  let newData = products.map((item, index) => ({
    ...item,
    noNum: index + 1,
  }));
  response.render("Home", {
    title: "Trang quản Lí Sản Phẩm",
    layout: "main",
    productList: newData,
    categories: categories,
  });
};
//xóa sản phẩm
exports.delete = (request, response) => {
  Products.deleteOne({ _id: request.params.id }, (err, doc) => {
    if (!err) {
      response.redirect("/Home");
    } else {
      console.log(err);
    }
  });
};
// thêm sản phẩm
exports.addProduct = async (request, response) => {
  const { postId, name, price, description, category } = request.body;
  let form = {
    name,
    price,
    description,
    category,
    image: request.file ? request.file.originalname : null,
  };
  if (postId !== "") {
    try {
      if (!request.file) {
        await Products.findByIdAndUpdate(postId, 
          {name:request.body.name, price:request.body.price, 
            description:request.body.description, category:request.body.category}, { new: true });
        response.redirect("/Home");
      } else {
        await Products.findByIdAndUpdate(postId,form, { new: true });
        response.redirect("/Home");
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      await Products.create(form);
      response.redirect("/Home");
    } catch (error) {
      console.log(error.message);
    }
  }
};
// //get 1 sản phẩm
exports.getProduct = (request, response) => {
  Products.findById(request.params.id)
    .lean()
    .exec((err, doc) => {
      if (!err) {
        response.render("edit", { Product: doc });
      }
    });
};

// //chỉnh sửa sản phẩm
// exports.edit = (request, response) => {
//   Products.updateOne(
//     { _id: request.body._id },
//     {
//       $set: {
//         name: request.body.name,
//         price: request.body.price,
//         manufacturer: request.body.manufacturer,
//       },
//     },
//     (err, doc) => {
//       if (!err) {
//         response.redirect("/Home");
//       } else {
//         console.log("Edit Failed");
//       }
//     }
//   );
// };
