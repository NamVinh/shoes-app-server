const Category = require("../Models/Models.Category");

//get tất cả thể loại
exports.getAll = async (request, response) => {
  let category = await Category.find().lean();
  let newData = category.map((item, index) => ({
    ...item,
    noNum: index + 1,
  }));

  response.render("Theloai", {
    title: "Trang quản trị",
    layout: "main",
    categoryList: newData,
  });
};
//xóa thể loại
exports.delete = async (request, response) => {
  
   //await Product.updateMany({category: request.params.id},{category: 'chưa xếp loại'}, {new: true});

   Category.deleteOne({ _id: request.params.id }, (err, doc) => {
      if (!err) {
        response.redirect("/Theloai");
      } else {
        console.log(err);
      }
    });
  
};

exports.addCategories = async (request, response) => {
  const { categoryId, name  } = request.body;
  let form = {
    name,
  };
  if ( categoryId !== "") {
    try {
      await Category.findByIdAndUpdate(categoryId,form, { new: true });
        response.redirect("/Theloai");
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      await Category.create(form);
      response.redirect("/Theloai");
    } catch (error) {
      console.log(error.message);
    }
  }
};
