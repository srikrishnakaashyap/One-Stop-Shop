// const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");
const { PaymentMethod } = require("../models/PaymentMethod");

async function editPaymentMethodService(data) {
  console.log(data);
  if (data.type == "Add") {
    console.log("test", data.userId);
    let responseData;
    const paymentMethod = await PaymentMethod.create({
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardType: data.cardType,
      UserId: data.userId,
    })
      .then(function (item) {
        // console.log("ITEM", item);
        responseData = {
          message: "Payment Method Created",
          status: 200,
          error: "",
          userObject: item,
        };
      })
      .catch(function (error) {
        console.log("ERROR", error);
        responseData = { message: "Error", status: 501, error: error.errors };
        //   return "test";
      });
  } else {
  }
}

module.exports = { editPaymentMethodService };
