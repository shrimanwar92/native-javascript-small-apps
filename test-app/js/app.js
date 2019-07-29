let tbody = document.querySelector("#tbody");
let div = document.querySelector(".contents");

class TableRow {
	static addToUI(row) {
		let tr = document.createElement('tr');

		tr.innerHTML = `
			<td>${row.id}</td>
			<td>${row.name}</td>
			<td><img src="${row.thumbnailUrl}"></td>
			<td>${row.price}</td>
		`;
		tbody.appendChild(tr);
	}

	static convertToList(itm) {
		let ul = document.createElement('ul');

		ul.innerHTML = `
			<li><strong>ID: </strong>${itm.id}</li>
			<li><strong>Name: </strong>${itm.name}</li>
			<li><strong>Image: </strong><img src="${itm.thumbnailUrl}"></li>
			<li><strong>Price: </strong>${itm.price}</li>
		`;

		div.appendChild(ul);
	}
}

let displayTable = (rowData) => {
	rowData.forEach((row, index) => {
		TableRow.addToUI(row);
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

// display list
document.querySelector("#list").addEventListener("click", () => {
	let table = document.querySelector("table");
	table.innerHTML = "";

	TABLE_DATA.forEach(row => {
		TableRow.convertToList(row);
	});
});