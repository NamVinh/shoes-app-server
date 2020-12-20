const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
var path = require("path");
const PORT = process.env.PORT || 4000;
const passport = require("passport");
const expressSession = require("express-session");
const Routes = require("./Routes/route.js");
const apiRoutes = require("./Routes/api");
var initPassport = require("./Passports/initSetup");
//import modules


//Cấu hình cảnh báo hiển thị cho người dùng
const flash = require("connect-flash");
app.use(flash());

//Cấu hình thư mục public
app.use(express.static(__dirname + "/Public"));
app.use(express.static(__dirname + "/Uploads"))
//Cấu hình passport
app.use(
    expressSession({
      secret: "Nam Vinh",
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  initPassport(passport);

  //Kết nối Mongo DB
const connectDB = require("./Config/database");
connectDB();

//Cấu hình form gửi đi
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cấu hình express handlebars
app.engine(
    "hbs",
    exphbs({
      extname: "hbs", // Tên đuôi file (VD: .hbs)
      defaultView: "main", //Tên layout mặc định
      layoutsDir: __dirname + "/Views/layouts/", //Đường dẫn chứa layout mặc định
    })
  );
  app.set('views',path.join(__dirname,'Views'));
  app.set("view engine", "hbs");

//Điều hướng trong trang
app.use("/", Routes(passport));
app.use("/api/v1", apiRoutes(passport));
app.get("*", (req, res) => {
  console.log(res);
  res.render("404", { title: "404 - Page not found", layout: "auth" });
});
  
//Khởi chạy server
app.listen(PORT, () => console.log(`App running on port http://localhost:${PORT}`));