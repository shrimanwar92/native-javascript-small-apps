const url = `https://rickandmortyapi.com/api/character/`;
const chipContainer = document.querySelector(".chip-container ul");

class ListComponent {
	constructor() {
		this.getData();
	}

	async getData() {
		try {
			let response = await fetch(url);
			let characters = await response.json();
			const ids = characters.results.map(character => character.id);
			let locationResp = await fetch(`https://rickandmortyapi.com/api/location/${ids}`);
			let locations = await locationResp.json();
			console.log(locations, ids);
			this.render(characters.results);
		} catch(err) {
			throw new Error('Unable to fetch data.');
		}
	}

	render(items) {
		items.forEach(item => {
			let li = document.createElement('li');
			li.innerHTML = `
				<img class="character-image" src="${item.image}" alt="Character image"/>
				<div class="character-details">
					<p class="character-name">${item.name}</p>
				</div>
				<div class="character-info">
					<div class="stats status">
						<label>STATUS</label>
						<p class="status">${item.status}</p>
					</div>
					<div class="stats species">
						<label>SPECIES</label>
						<p class="species">${item.species}</p>
					</div>
					<div class="stats gender">
						<label>GENDER</label>
						<p class="gender">${item.gender}</p>
					</div>
					<div class="stats origin">
						<label>ORIGIN</label>
						<p class="origin">${item.origin.name}</p>
					</div>
					<div class="stats last-location">
						<label>LAST LOCATION</label>
						<p class="last-location">${item.location.name}</p>
					</div>
				</div>
			`;
			chipContainer.appendChild(li);
		});
	}

	setPages() {

	}
}

v = new ListComponent();