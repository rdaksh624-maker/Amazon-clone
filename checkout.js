// ===============================
// CHECKOUT PAGE LOADED
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // LOAD CART
  // ===============================

  let cartItems = JSON.parse(localStorage.getItem("amazonCart")) || [];

  // ===============================
  // GET ELEMENTS
  // ===============================

  const checkoutItems = document.getElementById("checkout-items");

  const summaryItems = document.getElementById("summary-items");

  const summaryTotal = document.getElementById("summary-total");

  const placeOrderButton = document.getElementById("place-order");

  const fullName = document.getElementById("full-name");

  const mobile = document.getElementById("mobile");

  const address = document.getElementById("address");

  const city = document.getElementById("city");

  const state = document.getElementById("state");

  const pincode = document.getElementById("pincode");

  // ===============================
  // CHECK ELEMENTS
  // ===============================

  if (
    !checkoutItems ||
    !summaryItems ||
    !summaryTotal ||
    !placeOrderButton ||
    !fullName ||
    !mobile ||
    !address ||
    !city ||
    !state ||
    !pincode
  ) {
    console.error("Some checkout elements are missing from checkout.html");

    return;
  }

  // ===============================
  // DISPLAY CART
  // ===============================

  function displayCheckoutItems() {
    checkoutItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    // ===============================
    // EMPTY CART
    // ===============================

    if (cartItems.length === 0) {
      checkoutItems.innerHTML = "<p>Your cart is empty.</p>";

      summaryItems.innerText = "0";

      summaryTotal.innerText = "₹0";

      placeOrderButton.disabled = true;

      return;
    }

    // ===============================
    // DISPLAY PRODUCTS
    // ===============================

    cartItems.forEach(function (item) {
      const quantity = Number(item.quantity) || 0;

      const price = Number(item.price) || 0;

      totalItems = totalItems + quantity;

      totalPrice = totalPrice + price * quantity;

      const product = document.createElement("div");

      product.className = "checkout-item";

      product.innerHTML = `

                <div>

                    <div class="checkout-item-name">
                        ${item.name}
                    </div>

                    <div class="checkout-item-quantity">
                        Quantity: ${quantity}
                    </div>

                </div>

                <div class="checkout-item-price">
                    ₹${price * quantity}
                </div>

            `;

      checkoutItems.appendChild(product);
    });

    // ===============================
    // UPDATE SUMMARY
    // ===============================

    summaryItems.innerText = totalItems;

    summaryTotal.innerText = "₹" + totalPrice;
  }

  // ===============================
  // PLACE ORDER
  // ===============================

  placeOrderButton.addEventListener("click", function () {
    // ===============================
    // EMPTY CART CHECK
    // ===============================

    if (cartItems.length === 0) {
      alert("Your cart is empty!");

      return;
    }

    // ===============================
    // GET FORM VALUES
    // ===============================

    const nameValue = fullName.value.trim();

    const mobileValue = mobile.value.trim();

    const addressValue = address.value.trim();

    const cityValue = city.value.trim();

    const stateValue = state.value.trim();

    const pincodeValue = pincode.value.trim();

    // ===============================
    // EMPTY FIELD VALIDATION
    // ===============================

    if (
      nameValue === "" ||
      mobileValue === "" ||
      addressValue === "" ||
      cityValue === "" ||
      stateValue === "" ||
      pincodeValue === ""
    ) {
      alert("Please fill all delivery details!");

      return;
    }

    // ===============================
    // MOBILE VALIDATION
    // ===============================

    if (!/^[0-9]{10}$/.test(mobileValue)) {
      alert("Please enter a valid 10-digit mobile number!");

      return;
    }

    // ===============================
    // PINCODE VALIDATION
    // ===============================

    if (!/^[0-9]{6}$/.test(pincodeValue)) {
      alert("Please enter a valid 6-digit PIN code!");

      return;
    }

    // ===============================
    // PAYMENT METHOD
    // ===============================

    const selectedPayment = document.querySelector(
      "input[name='payment']:checked",
    );

    let paymentText = "Cash on Delivery";

    if (selectedPayment) {
      if (selectedPayment.value === "upi") {
        paymentText = "UPI";
      } else if (selectedPayment.value === "card") {
        paymentText = "Credit / Debit Card";
      }
    }

    // ===============================
    // CALCULATE TOTAL
    // ===============================

    let totalPrice = 0;

    let totalItems = 0;

    cartItems.forEach(function (item) {
      const quantity = Number(item.quantity) || 0;

      const price = Number(item.price) || 0;

      totalItems = totalItems + quantity;

      totalPrice = totalPrice + price * quantity;
    });

    // ===============================
    // GENERATE ORDER ID
    // ===============================

    const orderId = "AMZ" + Date.now();

    // ===============================
    // DELIVERY DATE
    // ===============================

    const deliveryDate = new Date();

    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // ===============================
    // CREATE ORDER DATA
    // ===============================

    const orderData = {
      orderId: orderId,

      customer: {
        name: nameValue,

        mobile: mobileValue,

        address: addressValue,

        city: cityValue,

        state: stateValue,

        pincode: pincodeValue,
      },

      paymentMethod: paymentText,

      items: cartItems,

      totalItems: totalItems,

      totalPrice: totalPrice,

      deliveryDate: formattedDate,
    };

    // ===============================
    // SAVE ORDER
    // ===============================

    localStorage.setItem("amazonLastOrder", JSON.stringify(orderData));

    // ===============================
    // CLEAR CART
    // ===============================

    localStorage.removeItem("amazonCart");

    // ===============================
    // GO TO SUCCESS PAGE
    // ===============================

    window.location.href = "order-success.html";
  });

  // ===============================
  // LOAD CHECKOUT
  // ===============================

  displayCheckoutItems();

  console.log("Checkout JavaScript Loaded Successfully!");
});
