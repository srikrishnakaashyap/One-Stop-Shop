const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Order } = require("../models/Order");
const { User } = require("../models/User");


async function checkout(cart, emailId) {

    let user = await User.findOne({
        where: {
          emailId: emailId,
        },
    });
    console.log(user);

    let responseData;

    const order = await Order.create({
        UserId:user.id,
        orderAmount:100
      })
        .then(function (item) {
          console.log("ITEM", item);
          responseData = {
            message: "Order Created",
            status: 200,
            error: "",
            userObject: item,
          };
        })
        .catch(function (error) {
          console.log("ERROR", error);
          console.log(user);
          responseData = { message: "Error", status: 501, error: error.errors };
        });

        return responseData;

} 

module.exports = { checkout };