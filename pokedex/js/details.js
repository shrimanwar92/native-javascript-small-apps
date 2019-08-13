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

		this.addEventListener('click', (e) => {
			/*let detailsDiv = document.querySelector('.details');
			detailsDiv.removeChild();
			let detail = new PokemonDetail();
			detail.pokemon = e.target.textContent;
			detailsDiv.appendChild(detail);*/
		});
	}

	connectedCallback() {
	  	console.log('Component connected callback.');
	  	this.selectedPokemon = pokemonsArr.filter((pokemon, i) => {
	  		if(pokemon.name == this.pokemon) {
	  			pokemon.index = i;
	  			return pokemon;
	  		}
	  	})[0];
	  	
	  	if(pokemonsArr[this.selectedPokemon.index - 1]) {
	  		let leftNav = `<span class="pokemon-details__nav--left">${pokemonsArr[this.selectedPokemon.index - 1].name}</span>`;
	  		this.navs.push(leftNav);
	  	}

	  	if(pokemonsArr[this.selectedPokemon.index + 1]) {
	  		let rightNav = `<span class="pokemon-details__nav--right">${pokemonsArr[this.selectedPokemon.index + 1].name}</span>`;
	  		this.navs.push(rightNav);
	  	}

		this.createHtml();
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
				    <dd>${this.getAbilities(selectedPokemon).join(",")}</dd>
				</dl>
			</div>
		`;
	}

	getAbilities(selectedPokemon) {
		return selectedPokemon.abilities.filter(ability => ability.is_hidden == false).map(ability => ability.ability.name);
	}
}

customElements.define('x-pokemon-detail', PokemonDetail);