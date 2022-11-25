express = require("express");
app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var forms = multer();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
var cookieParser = require("cookie-parser");

var engines = require("consolidate");
app.set("views", __dirname + "/views");
// app.engine("html", engines.mustache);
app.set("view engine", "ejs");
app.use(express.static("public"));
const cors = require("cors");
app.use(cors());

// # SESSION MANAGEMENT
// const oneDay = 1000 * 60 * 60 * 24;

//session middleware
// app.use(
//   sessions({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     cookie: { maxAge: oneDay },
//     resave: false,
//   })
// );

// API ROUTES REGISTER
const signuproute = require("./routes/signUp");
app.use(signuproute);

const signinroute = require("./routes/login");
app.use(signinroute);

const addPaymentMethodroute = require("./routes/addPaymentMethod");
app.use(addPaymentMethodroute);

const modifyuserroute = require("./routes/modifyUser");
app.use(modifyuserroute);

const addDataRoute = require("./routes/addDataToDatabase");
app.use(addDataRoute);

const gethomedata = require("./routes/home");
app.use(gethomedata);

const homePageRoute = require("./routes/homePage");
app.use(homePageRoute);

const getloggeduser = require("./routes/current_user_details");
app.use(getloggeduser);

const searchproduct = require("./routes/search_product");
app.use(searchproduct);

const checkout = require("./routes/checkout");
app.use(checkout);

const profile = require("./routes/profile");
app.use(profile);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8001;

app.listen(PORT, function () {
  console.log(`server started on port ${PORT}`);
});