let chipContainerUL = document.querySelector(".chip-container ul");
let loadMore = document.querySelector(".load-more");
let offset = 0;
let limit = 12;
let imageUrl = "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/";

class PokedexComponent {
	constructor(name, image) {
		// this.id = id;
		this.name = name;
		this.image = image;
	}

	addToDom() {
		let li = document.createElement('li');
		li.innerHTML = `
			<span class="pokemon-name">${this.name}</span>
			<img height="125" width="125" src="${this.image}" />
		`;
		chipContainerUL.appendChild(li);
	}
}

const fetchPokemon = async(offst = offset) => {
	try {
		let resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offst}`);
		let pokemons = await resp.json();
		pokemons.results.forEach(pokemon => {
			let image = `${imageUrl}${pokemon.name}.png`;
			let pd = new PokedexComponent(pokemon.name, image);
			pd.addToDom();
		});
		offset += pokemons.results.length;
	} catch(e) {
		throw new new Error("Failed to fetch pokemons");
	}
};

loadMore.addEventListener('click', () => {
	fetchPokemon(offset);
});

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchPokemon();
});