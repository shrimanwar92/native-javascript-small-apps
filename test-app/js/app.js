var len = TABLE_DATA.length;
var table = document.getElementsByTagName('table');

function removeTable() {
	var table = document.getElementById("table");
	for(var i = table.rows.length - 1; i > 0; i--) {
		console.log(i);
    	table.deleteRow(i);
	}
}

function display(TABLE_DATA) {
	var tableca = table[0];
	if(len > 0){
	    for(var i=0;i<len;i++){
	        var tr = document.createElement('tr');
	        tr.setAttribute('class', 'myRow');

	  		var td1 = document.createElement('td');
	  		td1.textContent = TABLE_DATA[i].id;
	  		tr.appendChild(td1);

	  		var td2 = document.createElement('td');
	  		td2.textContent = TABLE_DATA[i].name;
	  		tr.appendChild(td2);

	  		var td3 = document.createElement('td');
	  		var img = document.createElement('img');
	  		img.setAttribute('src', TABLE_DATA[i].thumbnailUrl);
	  		td3.appendChild(img);
	  		tr.appendChild(td3);

	  		var td4 = document.createElement('td');
	  		td4.textContent = TABLE_DATA[i].price;
	  		tr.appendChild(td4);

	  		tableca.appendChild(tr);
	    }
    	document.body.appendChild(tableca);
	}
}

display(TABLE_DATA);

function shuffle() {
	TABLE_DATA.sort( () => Math.random() - 0.5);
	removeTable();
	display(TABLE_DATA);
}

function display2() {
	let mainDiv = document.createElement('div');
	mainDiv.setAttribute('class', 'row');

	TABLE_DATA.forEach(item => {
		let div1 = document.createElement('div');
		let spanLabel = document.createElement('span');
		spanLabel.textContent = "Id";
		let spanItem = document.createElement('span');
		spanItem.textContent = item.id;
		div1.appendChild(spanLabel);
		div1.appendChild(spanItem);
		mainDiv.appendChild(div1);

		document.body.appendChild(mainDiv);

	});
	/*let dl = document.createElement('dl');
	TABLE_DATA.forEach(item => {

		let dt1 = document.createElement('dt');
		let dd1 = document.createElement('dd');
		dt1.textContent = "Id";
		dd1.textContent = item.id;
		dl.appendChild(dt1);
		dl.appendChild(dd1);

		let dt2 = document.createElement('dt');
		let dd2 = document.createElement('dd');
		dt2.textContent = "Name";
		dd2.textContent = item.name;
		dl.appendChild(dt2);
		dl.appendChild(dd2);

		let dt3 = document.createElement('dt');
		let dd3 = document.createElement('dd');
		dt3.textContent = "Image";
		let img = document.createElement('img');
		img.setAttribute('src', item.thumbnailUrl);
		dd3.appendChild(img);
		dl.appendChild(dt3);
		dl.appendChild(dd3);

		let dt4 = document.createElement('dt');
		let dd4 = document.createElement('dd');
		dt4.textContent = "Price";
		dd4.textContent = item.price;
		dl.appendChild(dt4);
		dl.appendChild(dd4);


		document.body.appendChild(dl);

		console.log("=====================================================================");
	});*/
}


var handle = 0;
document.querySelector("#start").addEventListener("click", () => {
	handle = setInterval(shuffle, 1000);
});

document.querySelector("#stop").addEventListener("click", () => {
	clearInterval(handle);
	handle = 0;
});

document.querySelector("#list").addEventListener("click", () => {
	table[0].innerHTML = "";
	display2();
});

// sort based on price
document.querySelector("#sort").addEventListener('click', function() { 
	let d = TABLE_DATA;
	d.sort(function(a, b){
		if(a.price == b.price) {
			return a.id - b.id;
		}
  		return b.price - a.price;
	});
	removeTable();
	display(d);

}, false);