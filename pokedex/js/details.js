class PokemonDetail extends HTMLElement {
	set pokemon(val) {
		this.setAttribute('pokemon', val);
	}

	constructor() {
		super();
	}
}

customElements.define('x-pokemon-detail', PokemonDetail);