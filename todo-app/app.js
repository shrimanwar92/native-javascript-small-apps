let todoGridContainer = document.querySelector(".todo-grid-container");

document.querySelector("#submit").addEventListener('click', function() {
	let input = document.querySelector('#input-text-box');
	let val = input.value;
	
	if(val == "") {
		return false;
	}

	let todo = document.createElement('x-todo');
	todo.className = 'todo';
	todo.setAttribute('completed', false);

	// create div
	let div = document.createElement('div');
	div.textContent = val;
	todo.appendChild(div);

	// create delete button
	let del = document.createElement('a');
	del.textContent = 'Delete';
	del.setAttribute('href', '#');
	todo.appendChild(del);

	todoGridContainer.appendChild(todo);
	input.value = "";
});

class Todo extends HTMLElement {
	static get observedAttributes() { return ["completed"]; }

	constructor() {
		super();

		this.addEventListener('click', this.handleClick);
	}

	handleClick(e) {
		if(e.target.text == 'Delete') {
			e.target.parentNode.remove();
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