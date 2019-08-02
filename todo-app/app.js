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

function filter(value) {
	let li = ul.querySelectorAll('li');

	li.forEach(node => {
		
		if(node.querySelector('span').textContent.indexOf(value) == -1) {
			node.style.display = 'none';
		} else {
			node.style.display = 'flex';
		}
	});
}

function debounce(fn, delay) {
	let timer = undefined;

	return (...args) => {
		if(timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn(...args);
			timer = undefined;
		}, delay);
	};
}

var callDebounce = debounce(filter, 1000);

document.querySelector(".search").addEventListener('keyup', () => {
	let value = document.querySelector(".search-input").value;
	callDebounce(value);
});

