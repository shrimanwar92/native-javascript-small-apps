let todoGridContainer = document.querySelector(".todo-grid-container");

document.querySelector("#submit").addEventListener('click', function() {
	let input = document.querySelector('#input-text-box');
	let val = input.value;
	
	if(val == "") {
		return false;
	}

	let el = document.createElement('x-todo');
	el.todo = val;
	el.classList = 'todo';
	el.setAttribute('completed', false);
	todoGridContainer.appendChild(el);
	input.value = "";
});

class Todo extends HTMLElement {
	//static get observedAttributes() { return ["completed"]; }

	constructor() {
		super();
		this.addEventListener('click', this.handleClick);
	}

	set todo(todo) {
		this.innerHTML = `
			<div>
				${todo}
			</div>
			<div class="delete-todo">
				<a href="#">Delete</a>
			</div>
		`;
	}

	handleClick(e) {
		if(e.target.text == 'Delete') {
			e.target.parentNode.parentNode.remove();
			return false;
		}
		e.target.classList.add('completed');
		e.target.setAttribute('completed', true);
	}

	attributeChangedCallback(name, oldValue, newValue) {
    	console.log('Custom square element attributes changed.');
  	}
}

customElements.define('x-todo', Todo);