// =====================================
// ORDER SUCCESS PAGE
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // GET ORDER DATA
    // =====================================

    const orderData =
        JSON.parse(
            localStorage.getItem("amazonLastOrder")
        );


    // =====================================
    // CHECK ORDER DATA
    // =====================================

    if (!orderData) {

        alert("No recent order found!");

        window.location.href =
            "index.html";

        return;
    }


    // =====================================
    // GET HTML ELEMENTS
    // =====================================

    const orderId =
        document.getElementById("order-id");

    const orderTotal =
        document.getElementById("order-total");

    const customerName =
        document.getElementById("customer-name");

    const customerMobile =
        document.getElementById("customer-mobile");

    const customerAddress =
        document.getElementById("customer-address");

    const customerCity =
        document.getElementById("customer-city");

    const customerState =
        document.getElementById("customer-state");

    const customerPincode =
        document.getElementById("customer-pincode");

    const paymentMethod =
        document.getElementById("payment-method");

    const orderedItems =
        document.getElementById("ordered-items");

    const deliveryDate =
        document.getElementById("delivery-date");

    const continueShopping =
        document.getElementById("continue-shopping");


    // =====================================
    // DISPLAY ORDER INFORMATION
    // =====================================

    orderId.innerText =
        orderData.orderId;

    orderTotal.innerText =
        "₹" + orderData.totalPrice;


    // =====================================
    // CUSTOMER DETAILS
    // =====================================

    customerName.innerText =
        orderData.customer.name;

    customerMobile.innerText =
        orderData.customer.mobile;

    customerAddress.innerText =
        orderData.customer.address;

    customerCity.innerText =
        orderData.customer.city;

    customerState.innerText =
        orderData.customer.state;

    customerPincode.innerText =
        orderData.customer.pincode;


    // =====================================
    // PAYMENT METHOD
    // =====================================

    paymentMethod.innerText =
        orderData.paymentMethod;


    // =====================================
    // DELIVERY DATE
    // =====================================

    deliveryDate.innerText =
        orderData.deliveryDate;


    // =====================================
    // DISPLAY ORDERED ITEMS
    // =====================================

    orderedItems.innerHTML = "";


    orderData.items.forEach(
        function (item) {

            const quantity =
                Number(item.quantity) || 0;

            const price =
                Number(item.price) || 0;

            const itemTotal =
                price * quantity;


            const itemElement =
                document.createElement("div");

            itemElement.className =
                "success-item";


            itemElement.innerHTML = `

                <div>

                    <div class="success-item-name">
                        ${item.name}
                    </div>

                    <div class="success-item-quantity">
                        Quantity: ${quantity}
                    </div>

                </div>

                <div class="success-item-price">
                    ₹${itemTotal}
                </div>

            `;


            orderedItems.appendChild(
                itemElement
            );

        }
    );


    // =====================================
    // CONTINUE SHOPPING
    // =====================================

    continueShopping.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );


    // =====================================
    // CONSOLE MESSAGE
    // =====================================

    console.log(
        "Order Success JavaScript Loaded Successfully!"
    );

});