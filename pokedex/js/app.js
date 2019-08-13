let chipContainerUL = document.querySelector(".chip-container ul");
// let search = document.querySelector('.search');
let loadMore = document.querySelector(".load-more");
let offset = 0;
let limit = 12;

class PokemonCard {
	constructor(id, name, image, types) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.types = types;
	}

	addToDom() {
		let li = document.createElement('li');
		let div = document.createElement('div');
		div.className = 'types';

		li.innerHTML = `
			<span class="pokemon-name">#00${this.id} ${this.name}</span>
			<img height="125" width="125" src="${this.image}" />
			<div class="types">
				${PokemonCard.filterTypes(this.types)}
			</div>
			<input type="hidden" value="${this.name}">
		`;
		chipContainerUL.appendChild(li);
	}

	static filterTypes(types) {
		types.sort((a, b) => {
			return a.slot - b.slot;
		});

		return types.map(type => {	
			let color = PokemonCard.getTypeColor(type.type.name);
			let className = undefined;	

			if(type.slot == 1) {
				className = "left";
			} else {
				className = "right";
			}

			return `<span class="${className}" style="background-color:${color};">${type.type.name}</span>`;
		
		}).join("");
	}

	static getTypeColor(type) {
		switch(type) {
			case 'grass':
			case 'bug':
				return '#A0DA5E';
			case 'poison':
				return '#BE93E7';
			case 'fire':
				return "#E85B0E";
			case 'water':
			case 'normal':
				return '#4A90E2';
			case 'flying':
				return 'D8D8D8';
			default:
				return "yellow";
		}
	}

	static filter(text) {
		let lis = chipContainerUL.querySelectorAll('li');

		lis.forEach(node => {
			if(node.querySelector('.pokemon-name').textContent.indexOf(text) == -1) {
				node.style.display = 'none';
			} else {
				node.style.display = 'flex';
			}
		});
	}
}

const fetchPokemon = async(offst = offset) => {
	try {
		let resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offst}`);
		let pokemons = await resp.json();
		pokemons.results.forEach(async(pokemon) => {
			let pokemonId = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
			let item = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
			item = await item.json();
			
			pokemonsArr.push(item);

			let card = new PokemonCard(pokemonId, item.name, item.sprites.front_default, item.types);
			card.addToDom();
		});
		offset += pokemons.results.length;
	} catch(e) {
		throw new new Error("Failed to fetch pokemons");
	}
};


// event listeners
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchPokemon();
});

/*let filterByKeyword = debounce(PokemonCard.filter, 500);
search.addEventListener('keyup', () => {
	filterByKeyword(search.value);
});*/

loadMore.addEventListener('click', () => {
	fetchPokemon(offset);
});

chipContainerUL.addEventListener('click', (e) => {
	let detail = new PokemonDetail();
	detail.pokemon = e.target.parentNode.querySelector('input').getAttribute('value');

	document.querySelector('.chip-container').remove();
	document.querySelector('.load-more').remove();
	document.querySelector('.heading').remove();
	document.querySelector('.details').appendChild(detail);
});