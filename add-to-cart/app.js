var NUMBER_OF_PRODUCTS = 3;
var productsContainer = document.querySelector(".products-container");
var cart = document.querySelector(".header-container");
var AddToCart = /** @class */ (function () {
    function AddToCart() {
        this.fragment = new DocumentFragment();
        this.cartCount = 0;
        this.appendTemplate();
        this.setUpListeners();
    }
    AddToCart.prototype.setUpListeners = function () {
        var _this = this;
        productsContainer.addEventListener("click", function (e) {
            var eventTarget = e.target;
            var type = eventTarget.getAttribute("data-type");
            var id = eventTarget.getAttribute("data-id");
            var inputValue = document.querySelector(".add-to-cart__input-" + id);
            switch (type) {
                case "minus":
                    inputValue.value = (Number(inputValue.value) - 1).toString();
                    _this.isLimitReached(0, eventTarget, inputValue);
                    _this.cartCount--;
                    document.querySelector(".add-to-cart__button-plus-" + id).removeAttribute("disabled");
                    break;
                case "plus":
                    inputValue.value = (Number(inputValue.value) + 1).toString();
                    _this.isLimitReached(10, eventTarget, inputValue);
                    _this.cartCount++;
                    document.querySelector(".add-to-cart__button-minus-" + id).removeAttribute("disabled");
                    break;
            }
            cart.textContent = _this.cartCount.toString();
        });
    };
    AddToCart.prototype.isLimitReached = function (limit, eventTarget, inputValue) {
        if (Number(inputValue.value) == limit) {
            eventTarget.setAttribute("disabled", "disabled");
        }
        else {
            eventTarget.removeAttribute("disabled");
        }
    };
    AddToCart.prototype.appendTemplate = function () {
        for (var i = 0; i < NUMBER_OF_PRODUCTS; i++) {
            var container = document.createElement("div");
            container.classList.add("product-item");
            var button1 = document.createElement("button");
            button1.type = "button";
            button1.classList.add("add-to-cart__button-minus-" + (i + 1));
            button1.textContent = "-";
            button1.setAttribute("data-id", "" + (i + 1));
            button1.setAttribute("data-type", "minus");
            button1.setAttribute("disabled", "disabled");
            var input = document.createElement("input");
            input.type = "text";
            input.min = "0";
            input.max = "10";
            input.value = "0";
            input.classList.add("add-to-cart__input-" + (i + 1));
            var button2 = document.createElement("button");
            button2.type = "button";
            button2.classList.add("add-to-cart__button-plus-" + (i + 1));
            button2.textContent = "+";
            button2.setAttribute("data-id", "" + (i + 1));
            button2.setAttribute("data-type", "plus");
            this.fragment.appendChild(container);
            container.appendChild(button1);
            container.appendChild(input);
            container.appendChild(button2);
        }
        productsContainer.appendChild(this.fragment);
        cart.textContent = this.cartCount.toString();
    };
    return AddToCart;
}());
new AddToCart();
