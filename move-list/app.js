let list1 = document.querySelector(".list1-ul");
let list2 = document.querySelector(".list2-ul");

class MoveComponent {
	static addToList1(item) {
		let li = document.createElement("li");
		li.innerHTML = item;
		list1.appendChild(li);
	}

	static moveToList1() {
		let selectedli = document.querySelector(".list2-ul li.selected");
		let li = document.createElement("li");
		li.innerHTML = selectedli.textContent;
		list1.appendChild(li);
		selectedli.remove();
	}

	static moveToList2() {
		let selectedli = document.querySelector(".list1-ul li.selected");
		let li = document.createElement("li");
		li.innerHTML = selectedli.textContent;
		list2.appendChild(li);
		selectedli.remove();
	}

	static moveAlltoList2() {
		let elems = document.querySelectorAll(".list1-ul li");
		elems.forEach(el => {
			el.classList.add('selected');
			MoveComponent.moveToList2();
		});
	}

	static moveAlltoList1() {
		let elems = document.querySelectorAll(".list2-ul li");
		elems.forEach(el => {
			el.classList.add('selected');
			MoveComponent.moveToList1();
		});
	}
}

document.querySelector("#submit").addEventListener('click', () => {
	let input = document.querySelector("#item").value;
	MoveComponent.addToList1(input);
	document.querySelector("#item").value = "";
});

document.querySelector(".list1-ul").addEventListener('click', (e) => {
	let elems = document.querySelectorAll(".list1-ul li.selected");
	removeAllSelectedClass();
	e.target.classList.add("selected");

	function removeAllSelectedClass() {
		for(let i=0; i<elems.length; i++) {
			elems[i].classList.remove('selected');
		}
	}
});

document.querySelector(".list2-ul").addEventListener('click', (e) => {
	let elems = document.querySelectorAll(".list2-ul li.selected");
	removeAllSelectedClass();
	e.target.classList.add("selected");

	function removeAllSelectedClass() {
		for(let i=0; i<elems.length; i++) {
			elems[i].classList.remove('selected');
		}
	}
});

document.querySelector(".buttons").addEventListener('click', (e) => {
	if(e.target.textContent == ">") {
		MoveComponent.moveToList2();
	}

	if(e.target.textContent == "<") {
		MoveComponent.moveToList1();
	}

	if(e.target.textContent == ">>") {
		MoveComponent.moveAlltoList2();
	}

	if(e.target.textContent == "<<") {
		MoveComponent.moveAlltoList1();
	}
});