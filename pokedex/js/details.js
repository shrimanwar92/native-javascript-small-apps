class PokemonDetail extends HTMLElement {

	selectedPokemon = undefined;
	navs = [];

	set pokemon(val) {
		this.setAttribute('pokemon', val);
	}

	get pokemon() {
		return this.getAttribute('pokemon');
	}

	constructor() {
		super();
	}

	connectedCallback() {
	  	console.log('Component connected callback.');
	  	this.selectedPokemon = pokemonsArr.filter((pokemon, i) => {
	  		if(pokemon.name == this.pokemon) {
	  			pokemon.index = i;
	  			return pokemon;
	  		}
	  	})[0];

	  	console.log(this.selectedPokemon);
	  	
	  	if(pokemonsArr[this.selectedPokemon.index - 1]) {
	  		let leftNav = `<span class="pokemon-details__nav--left">${pokemonsArr[this.selectedPokemon.index - 1].name}</span>`;
	  		this.navs.push(leftNav);
	  	}

	  	if(pokemonsArr[this.selectedPokemon.index + 1]) {
	  		let rightNav = `<span class="pokemon-details__nav--right">${pokemonsArr[this.selectedPokemon.index + 1].name}</span>`;
	  		this.navs.push(rightNav);
	  	}

		this.createHtml();
		this.addClickListeners();
	}

	createHtml() {
		let selectedPokemon = this.selectedPokemon;
		
		this.innerHTML = `
			<div class="pokemon-details__nav">
				${this.navs.join(",")}				
			</div>
			<div class="pokemon-details__pokemon-name">
				<span>#00${selectedPokemon.id} ${selectedPokemon.name}</span>
			</div>
			<div class="pokemon-details__pokemon-specs">
				<img height="500" width="500" src="${selectedPokemon.sprites.front_default}">
				<div class="pokemon-details__types">
					${PokemonCard.filterTypes(selectedPokemon.types)}
				</div>
			</div>

			<div class="pokemon-details__abilities">
				<dl class="pokemon-details__abilities-list pokemon-details__abilities-list-left">
				    <dt>Height</dt>
				    <dd>${selectedPokemon.height}</dd>
				    <dt>Weight</dt>
				    <dd>${selectedPokemon.weight}</dd>
				    <dt>Gender</dt>
				    <dd>M/F</dd>
				</dl>

				<dl class="pokemon-details__abilities-list pokemon-details__abilities-list-right">
				    <dt>Category</dt>
				    <dd>${selectedPokemon.category || "-"}</dd>
				    <dt>Abilities</dt>
				    <dd>${this.getAbilities(selectedPokemon)}</dd>
				</dl>
			</div>

			<div class="pokemon-details__base-stats">
				<ul>
					<li class="pokemon-details__base-stats--name">Base stats</li>
					${selectedPokemon.stats.map(stat => `<li><span class="pokemon-details__base-stats--name">${stat.stat.name}</span><progress value="${stat.base_stat}" max="100"></progress></li>`).join("")}
				</ul>
			</div>

			<div class="pokemon-details__moves">
				<span class="pokemon-details__moves--heading">Moves</span>
				<ul>
					${this.getMoves(selectedPokemon)}
				</ul>
			</div>
		`;
	}

	getMoves(selectedPokemon) {
		let color;
		return selectedPokemon.moves.slice(0, 20).map((move, index) => {
			if(index % 4 == 0) {
				color = '#4A90E2';
			}
			if(index % 4 == 1) {
				color = '#D8D8D8';
			}
			if(index % 4 == 2) {
				color = '#BE93E7';
			}
			if(index % 4 == 3) {
				color = '#A0DA5E';
			}

			return `<li style="background-color:${color};">${move.move.name}</li>`;
		}).join("");
	}

	getAbilities(selectedPokemon) {
		return selectedPokemon.abilities.filter(ability => ability.is_hidden == false)
				.map(ability => ability.ability.name).join(",");
	}

	addClickListeners() {
		const nav = document.querySelector('.pokemon-details__nav');
		nav.addEventListener('click', (e) => {
			document.querySelectorAll('x-pokemon-detail').forEach(node => node.remove());
			let detail = new PokemonDetail();
			detail.pokemon = e.target.textContent;
			document.querySelector('.details').appendChild(detail);
		});
	}
}

customElements.define('x-pokemon-detail', PokemonDetail);