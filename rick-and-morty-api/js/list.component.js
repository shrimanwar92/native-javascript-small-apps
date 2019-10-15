const CHARACTER_URL = `https://rickandmortyapi.com/api/character/`;
const LOCATION_URL = `https://rickandmortyapi.com/api/location/`;
const EPISODE_URL = `https://rickandmortyapi.com/api/episode/`;
const NUMBER_REGEX = /(\d+)/;

class ListComponent {
	
	paginationInfo = undefined;
	characters = [];

	constructor() {
		this.getCharacters();
	}

	async getCharacters(url = CHARACTER_URL) {
		try {
			// get all characters
			const response = await fetch(url);
			this.characters = await response.json();
			this.paginationInfo = this.characters.info;
		    
		    // filter locationIds
		    let locationIds = this.characters.results.map(item => this.getNumberFromUrl(item)).filter(n => n);

		    // get unique locations
			const locations = await this.getLocations([...new Set(locationIds)]);
			
			// map location to characters
			let results = this.characters.results.map(character => {
				const num = this.getNumberFromUrl(character);
				
				if(num) {
					character.location = locations.filter(location => location.id == num)[0];
				} else {
					character.location = {
						name: '-',
						dimension: '-',
						residents: []
					}
				}
				return character;
			});
			
			//console.log(results);
			this.render(results);
		} catch(err) {
			throw new Error(err);
		}
	}

	getNumberFromUrl(character) {
		if(character.location && character.location.url) {
    		return character.location.url.match(NUMBER_REGEX)[0];
    	}
	}

	async getLocations(locationIds) {
		try {
			const response = await fetch(`${LOCATION_URL}${locationIds}`);
			return await response.json();
		} catch(err) {
			throw new Error(err)
		}
	}

	async getEpisodes(episodeIds) {
		try {
			let response = await fetch(`${EPISODE_URL}${episodeIds}`);
			return await response.json();
		} catch(err) {
			throw new Error(err)
		}
	}

	render(items) {
		items.forEach(item => {
			let li = document.createElement('li');
			li.id = item.id;
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
					<div class="stats dimension">
						<label>DIMENSIONS</label>
						<p class="dimension">${item.location.dimension}</p>
					</div>
					<div class="stats residents">
						<label>RESIDENTS</label>
						<p class="residents">${item.location.residents.length || '-'}</p>
					</div>
					<div class="stats episodes">
						<label>EPISODES</label>
						<a class="show-episodes" id="${item.id}">Show episodes</a>
					</div>
				</div>
			`;

			li.querySelector('.show-episodes').addEventListener('click', (e) => {
				const characterId = e.target.getAttribute('id');
				const character = items.filter(character => character.id == characterId)[0];
				this.showEpisodes(character);
			});
			chipContainer.appendChild(li);
		});
	}

	async showEpisodes(character) {
		const episodeIds = character.episode.map(e => e.match(NUMBER_REGEX)[0]);
		const episodes = await this.getEpisodes(episodeIds);
		let names;
		
		if(Array.isArray(episodes)) {
			names = episodes.map(episode => episode.name);
			confirm(names.join("\n \n"));
		} else {
			names = episodes.name;
			confirm(names);
		}
	}
}