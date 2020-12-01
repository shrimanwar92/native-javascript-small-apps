const NUMBER_OF_PRODUCTS: number = 3;
const productsContainer: HTMLElement = document.querySelector(".products-container");
const cart: HTMLElement = document.querySelector(".header-container");

class AddToCart {
    fragment: DocumentFragment = new DocumentFragment();
    cartCount: number = 0;

    constructor() {
        this.appendTemplate();
        this.setUpListeners();
    }

    setUpListeners() {
        productsContainer.addEventListener("click", (e) => {
            const eventTarget = e.target as HTMLElement;
            const type = eventTarget.getAttribute("data-type");
            const id = eventTarget.getAttribute("data-id");
            const inputValue: HTMLInputElement = document.querySelector(`.add-to-cart__input-${id}`);

            switch (type) {
                case "minus":
                    inputValue.value = (Number(inputValue.value) - 1).toString();
                    this.isLimitReached(0, eventTarget, inputValue);
                    this.cartCount--;
                    document.querySelector(`.add-to-cart__button-plus-${id}`).removeAttribute("disabled");
                    break;
                case "plus":
                    inputValue.value = (Number(inputValue.value) + 1).toString();
                    this.isLimitReached(10, eventTarget, inputValue);
                    this.cartCount++;
                    document.querySelector(`.add-to-cart__button-minus-${id}`).removeAttribute("disabled");
                    break;
            }

            cart.textContent = this.cartCount.toString();
        });
    }

    isLimitReached(limit: number, eventTarget: HTMLElement, inputValue: HTMLInputElement) {
        if(Number(inputValue.value) == limit) {
            eventTarget.setAttribute("disabled", "disabled");
        } else {
            eventTarget.removeAttribute("disabled");
        }
    }

    appendTemplate() {
        for(let i=0; i<NUMBER_OF_PRODUCTS; i++) {
            const container = document.createElement("div");
            container.classList.add("product-item");

            const button1 = document.createElement("button");
            button1.type = "button";
            button1.classList.add(`add-to-cart__button-minus-${i+1}`);
            button1.textContent = "-";
            button1.setAttribute("data-id", `${i+1}`);
            button1.setAttribute("data-type", "minus");
            button1.setAttribute("disabled", "disabled");

            const input = document.createElement("input");
            input.type = "text";
            input.min = "0";
            input.max = "10";
            input.value = "0";
            input.classList.add(`add-to-cart__input-${i+1}`);

            const button2 = document.createElement("button");
            button2.type = "button";
            button2.classList.add(`add-to-cart__button-plus-${i+1}`);
            button2.textContent = "+";
            button2.setAttribute("data-id", `${i+1}`);
            button2.setAttribute("data-type", "plus");

            this.fragment.appendChild(container);
            container.appendChild(button1);
            container.appendChild(input);
            container.appendChild(button2);
        }

        productsContainer.appendChild(this.fragment);
        cart.textContent = this.cartCount.toString();
    }
}

new AddToCart();