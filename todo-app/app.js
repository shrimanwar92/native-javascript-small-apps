let todoGridContainer = document.querySelector(".todo-grid-container");
let ul = document.querySelector(".todo-grid-container-ul");

class Todo {

	constructor(todo) {
		this.todo = todo;
	}

	addtoDom() {
		let li = document.createElement('li');

		li.innerHTML = `
			<input type="checkbox" class="check">
			<span>${this.todo}</span>
			<a href="#" class="delete">Delete</a>
		`;
		ul.appendChild(li);
	}
}

new Todo("asdadsa111").addtoDom();
new Todo("asdadsa222").addtoDom();
new Todo("asdadsa333").addtoDom();

document.querySelector("#submit").addEventListener('click', function() {
	let input = document.querySelector('#input-text-box');
	let val = input.value;
	
	if(val == "") {
		return false;
	}

	let todo = new Todo(val);
	todo.addtoDom();
	input.value = "";
});

ul.addEventListener('click', function(e) {
	if(e.target.textContent == "Delete") {
		e.target.parentElement.remove();
	}

	if(e.target.type == "checkbox") {
		if(e.target.checked) {
			e.target.nextElementSibling.classList.add("selected");
			e.target.disabled = true;
		} else {
			e.target.nextElementSibling.classList.remove("selected");
		}
	} 
});

