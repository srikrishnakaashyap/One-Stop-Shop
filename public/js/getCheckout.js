var addresses;

var cookies;

var paymentMethods;

window.onload = async function () {

console.log("inside checkout js");

cookies = document.cookie
  .split(";")
  .map((cookie) => cookie.split("="))
  .reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key.trim()]: decodeURIComponent(value),
    }),
    {}
  );

  const resp = await fetch(`/getCheckoutDetails?emailID=${cookies.email}`);

  var select = document.getElementById("selectAddress");
  addresses = await resp.json();

    for(var i = 0; i < addresses.length; i++) {
        var opt = addresses[i].address;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    const paymentResp = await fetch(`/getPaymentDetails?emailID=${cookies.email}`);

    var selectPayment = document.getElementById("selectPayment");
    paymentMethods = await paymentResp.json();

    console.log("payment methods--", paymentMethods);
  
      for(var i = 0; i < paymentMethods.length; i++) {
          var opt = paymentMethods[i].cardNumber;
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          selectPayment.appendChild(el);
      }


    const options = {
        method: "GET"
    };

    const cartResp = await fetch("/getUserCart", options)

}

function fillAddress() {

    //console.log("inside dropdown change");

    const a_fname = document.getElementById("firstName");
    const a_lname = document.getElementById("lastName");
    const a_email = document.getElementById("email");
    const a_address = document.getElementById("address");
    const a_state = document.getElementById("state");
    const a_country = document.getElementById("country");
    const a_zip = document.getElementById("zip");
    //const a_phoneNumber = document.getElementById("a_phoneNumber").value;
    //const a_addressId = document.getElementById("a_addressId").value;
    //const a_type = document.getElementById("a_type").value;

    const selectedAddress = document.getElementById("selectAddress").value;

    for(var i = 0; i < addresses.length; i++) {

        var opt = addresses[i];

        if(selectedAddress == 'Choose a Address'){

            a_fname.value = "";
            a_lname.value = "";
            a_email.value = "";
            a_address.value = "";
            a_state.value = "";
            a_country.value = "";
            a_zip.value = "";

        }

        if(opt.address === selectedAddress){

            console.log("opt--", opt);

            a_fname.value = opt.firstName;
            a_lname.value = opt.lastName;
            a_email.value = cookies.email;
            a_address.value = opt.address;
            a_state.value = opt.state;
            a_country.value = opt.country;
            a_zip.value = opt.zipcode;


        }

    }


}

function fillPaymentMethods() {


    const a_credit = document.getElementById("credit");
    const a_debit = document.getElementById("debit");
    const a_name = document.getElementById("cc-name");
    const a_number = document.getElementById("cc-number");
    const a_expiry = document.getElementById("cc-expiration");
    const a_cvv = document.getElementById("cc-cvv");
    //const a_zip = document.getElementById("zip");

    const selectedPayment = document.getElementById("selectPayment").value;

    for(var i = 0; i < paymentMethods.length; i++) {

        var opt = paymentMethods[i];

        if(selectedPayment == 'Choose a Payment'){

            a_credit.value = "";
            a_debit.value = "";
            a_name.value = "";
            a_number.value = "";
            a_expiry.value = "";
            a_cvv.value = "";
            //a_zip.value = "";

        }

        if(opt.cardNumber === selectedPayment){

            console.log("opt--", opt);

            if(opt.cardType == '2'){

                a_credit.checked = true;

            }else{

                a_debit.checked = true;
            }

            //a_credit.value = "";
            //a_debit.value = "";
            a_name.value = "";
            a_number.value = opt.cardNumber;
            a_expiry.value = opt.expiryDate.slice(0, 10);
            a_cvv.value = opt.cvv;


        }

    }


}