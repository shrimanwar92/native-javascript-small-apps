let tbody = document.querySelector("#tbody");

class TdClass extends HTMLElement {
	set myTd(td) {
		this.innerHTML = td;
	}

	constructor() {
		super();
	}
}
customElements.define("x-td", TdClass);

let displayTable = (rowData) => {
	rowData.forEach((row, index) => {
		let r = document.createElement('tr');
		
		for(let key in row) {
			let td = document.createElement("td");
			let xtd = document.createElement("x-td");

			if(key == "thumbnailUrl") {
				let img = document.createElement("img");
				img.src = row[key];
				xtd.appendChild(img);
			} else {
				xtd.myTd = row[key];
			}
			td.appendChild(xtd);
			r.appendChild(td);
		}
		tbody.appendChild(r);
	});
};
displayTable(TABLE_DATA);

// sort based on price
document.querySelector("#sort").addEventListener('click', function() { 
	let data = TABLE_DATA;
	data.sort(function(a, b){
		if(a.price == b.price) {
			return a.id - b.id;
		}
  		return b.price - a.price;
	});
	tbody.innerHTML = "";
	displayTable(data);

}, false);

//start
let handle;
document.querySelector("#start").addEventListener("click", () => {
	handle = setInterval(shuffle, 1000);

	function shuffle() {
		TABLE_DATA.sort(() => Math.random() - 0.5);
		tbody.innerHTML = "";
		displayTable(TABLE_DATA);
	}
});

// stop
document.querySelector("#stop").addEventListener("click", () => {
	clearInterval(handle);
	handle = undefined;
});

class List extends HTMLElement {
	set item(itm) {
		this.innerHTML = `
			<ul>
				<li><strong>ID: </strong>${itm.id}</li>
				<li><strong>Name: </strong>${itm.name}</li>
				<li><strong>Image: </strong><img src="${itm.thumbnailUrl}"></li>
				<li><strong>Price: </strong>${itm.price}</li>
			</ul>
		`;
	}

	constructor() {
		super();
	}
}

customElements.define("x-list", List);

// display list
document.querySelector("#list").addEventListener("click", () => {
	let table = document.querySelector("table");
	table.innerHTML = "";
	let div = document.querySelector(".contents");

	TABLE_DATA.forEach(row => {
		let l = document.createElement("x-list");
		l.item = row;
		div.appendChild(l);
	});
});