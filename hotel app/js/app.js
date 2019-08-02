let chipContainer = document.querySelector(".chip-container ul");

class ChipComponent {
	constructor(id, name, thumbnail, rating) {
		this.id = id;
		this.name = name;
		this.thumbnail = thumbnail;
		this.rating = rating;
	}

	appendToDom() {
		let li = document.createElement('li');
		li.innerHTML = `
			<img width="254" height="160" src="${this.thumbnail}" />
			<span class="hotel-name">${this.name}</span>
			<input type="hidden" value="${this.id}">
			<span class="rating">Rating: ${this.rating}</span>
		`;
		chipContainer.appendChild(li);
	}
}

TABLE_DATA.forEach((item) => {
	let chip = new ChipComponent(item.id, item.name, item.thumbnailUrl, item.rating);
	chip.appendToDom();
});

function filter(value) {
	let lis = chipContainer.querySelectorAll('li');
	console.log(lis);
	lis.forEach(node => {
		if(node.querySelector(".hotel-name").textContent.indexOf(value) == -1) {
			node.style.display = "none";
		} else {
			node.style.display = "flex";
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
	}
}

let callDebounce = debounce(filter, 500);
document.querySelector(".search").addEventListener('keyup', (e) => {
	let value = document.querySelector(".search").value;
	callDebounce(value);
});