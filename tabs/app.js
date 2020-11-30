const buttons = document.querySelector(".tabs__button-container");
const tabs = document.querySelector('.tabs__content-container');

class Tabs {
    constructor() {
        buttons.addEventListener("click", (e) => {
            const classList = Array.from(e.target.classList);
            this.removeSelectedClass();
            e.target.classList.add("selected");

            if(classList.includes("tabs__tab1")) {
                this.removeShowClass();
                document.querySelector(".tabs__content-tab1").classList.add("show");
            }
            if(classList.includes("tabs__tab2")) {
                this.removeShowClass();
                document.querySelector(".tabs__content-tab2").classList.add("show");
            }
            if (classList.includes("tabs__tab3")) {
                this.removeShowClass();
                document.querySelector(".tabs__content-tab3").classList.add("show");
            }
        });

        document.querySelector(".tabs__tab1").click();
    }

    removeShowClass() {
        Array.from(tabs.children).forEach(node => {
            node.classList.remove("show");
        });
    }

    removeSelectedClass() {
        Array.from(buttons.children).forEach(node => {
            node.classList.remove("selected");
        });
    }
}

const tab = new Tabs();
