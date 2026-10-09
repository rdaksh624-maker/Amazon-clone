// ===============================
// SEARCH
// ===============================

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-icon");
const boxes = document.querySelectorAll(".box");


searchButton.addEventListener("click", searchProducts);


searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchProducts();
    }

});


function searchProducts() {

    const searchValue = searchInput.value.trim().toLowerCase();

    if (searchValue === "") {

        boxes.forEach(function (box) {
            box.style.display = "block";
        });

        return;
    }


    let productFound = false;


    boxes.forEach(function (box) {

        const productName =
            box.querySelector("h2").innerText.toLowerCase();


        if (productName.includes(searchValue)) {

            box.style.display = "block";
            productFound = true;

        } else {

            box.style.display = "none";

        }

    });


    if (!productFound) {

        alert("Product not found!");

        boxes.forEach(function (box) {
            box.style.display = "block";
        });

    }

}


// ===============================
// PRODUCT PRICES
// ===============================

const productPrices = {

    "Clothes": 999,

    "Health & Personal Care": 599,

    "Furniture": 4999,

    "Electronics": 1999,

    "Beauty picks": 799,

    "Pet care": 699,

    "New Arrival in Toys": 1299,

    "Discover Fashion Trends": 1499

};


// ===============================
// CART ELEMENTS
// ===============================

const cart = document.querySelector(".nav-cart");

const cartCountElement =
    document.querySelector(".cart-count");

const cartDropdown =
    document.querySelector(".cart-dropdown");

const cartItemsContainer =
    document.querySelector(".cart-items");

const totalItemsElement =
    document.querySelector("#total-items");

const checkoutButton =
    document.querySelector(".checkout-btn");

const addCartButtons =
    document.querySelectorAll(".add-cart");


// ===============================
// LOAD CART
// ===============================

let cartItems =
    JSON.parse(localStorage.getItem("amazonCart")) || [];


// ===============================
// ADD TO CART
// ===============================

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.stopPropagation();


        const productName =
            button.parentElement.querySelector("h2").innerText;


        // Check if product already exists
        const existingProduct =
            cartItems.find(function (item) {

                return item.name === productName;

            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cartItems.push({

                name: productName,

                price: productPrices[productName],

                quantity: 1

            });

        }


        saveCart();

        updateCart();


        alert(productName + " added to cart!");

    });

});


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "amazonCart",
        JSON.stringify(cartItems)
    );

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    cartItemsContainer.innerHTML = "";


    // Total quantity
    let totalQuantity = 0;


    // Total price
    let totalPrice = 0;


    cartItems.forEach(function (item, index) {

        totalQuantity += item.quantity;

        totalPrice += item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div>
                    ₹${item.price}
                </div>

            </div>


            <div class="quantity">

                <button
                    class="quantity-btn decrease"
                    data-index="${index}">
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    class="quantity-btn increase"
                    data-index="${index}">
                    +
                </button>

            </div>


            <button
                class="remove-btn"
                data-index="${index}">
                Remove
            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    // Update cart count
    cartCountElement.innerText =
        totalQuantity;


    // Update total items
    totalItemsElement.innerText =
        totalQuantity;


    // Update total price
    const totalPriceElement =
        document.querySelector("#total-price");


    if (totalPriceElement) {

        totalPriceElement.innerText =
            "₹" + totalPrice;

    }


    // ===============================
    // REMOVE PRODUCT
    // ===============================

    const removeButtons =
        document.querySelectorAll(".remove-btn");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();


            const index =
                Number(button.dataset.index);


            cartItems.splice(index, 1);


            saveCart();

            updateCart();

        });

    });


    // ===============================
    // INCREASE QUANTITY
    // ===============================

    const increaseButtons =
        document.querySelectorAll(".increase");


    increaseButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();


            const index =
                Number(button.dataset.index);


            cartItems[index].quantity++;


            saveCart();

            updateCart();

        });

    });


    // ===============================
    // DECREASE QUANTITY
    // ===============================

    const decreaseButtons =
        document.querySelectorAll(".decrease");


    decreaseButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();


            const index =
                Number(button.dataset.index);


            if (cartItems[index].quantity > 1) {

                cartItems[index].quantity--;

            } else {

                cartItems.splice(index, 1);

            }


            saveCart();

            updateCart();

        });

    });

}


// ===============================
// CART DROPDOWN
// ===============================

cart.addEventListener("click", function (event) {

    event.stopPropagation();


    if (cartDropdown.style.display === "block") {

        cartDropdown.style.display = "none";

    } else {

        cartDropdown.style.display = "block";

    }

});


// ===============================
// CLICK OUTSIDE
// ===============================

document.addEventListener("click", function () {

    cartDropdown.style.display = "none";

});


// ===============================
// CHECKOUT
// ===============================

checkoutButton.addEventListener("click", function (event) {

    event.stopPropagation();

    if (cartItems.length === 0) {

        alert("Your cart is empty!");

    } else {

        window.location.href = "checkout.html";

    }

});


// ===============================
// BACK TO TOP
// ===============================

const backToTop =
    document.querySelector(".foot-panel");


backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ===============================
// INITIAL LOAD
// ===============================

updateCart();


console.log("Amazon Clone JavaScript Loaded!");