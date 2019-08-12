import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.less']
})

export class HeroesComponent implements OnInit {

	hero: Hero = {
		id: 1,
		name: 'windstrorm'
	};
	
	constructor() {}

	ngOnInit() {

	}
}

interface Hero {
	id: number;
	name: string;
};