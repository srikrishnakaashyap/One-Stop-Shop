const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { application } = require("express");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { getCookies } = require("../services/getCookies");
const { getUserCart, addToCart } = require("../services/cartServices");

app.get("/getUserCart", async function (request, response) {
  let cookies = getCookies(request);

  let resp;

  if (cookies.emailId == undefined) {
    resp = { status: 401, message: "User Not Logged In" };

    // response.send(resp);
  } else {
    resp = await getUserCart(cookies.emailId);

    resp["status"] = 200;
  }
  response.send(resp);
});

app.post("/addToCart", urlencodedParser, async function (request, response) {
  let cookies = getCookies(request);
  let resp;

  if (cookies.emailId == undefined) {
    resp = { status: 401, message: "User Not Logged In" };

    // response.send(resp);
  } else {
    resp = await addToCart(
      cookies.emailId,
      request.body.productId,
      request.body.quantity
    );
  }

  response.send(resp);
});

module.exports = router;