import { Component, OnInit } from '@angular/core';
import { HEROES } from 'app/data/mock-heroes';
import { Hero } from 'app/model/hero';

@Component({
  selector: 'app-heroes-container',
  templateUrl: './heroes-container.component.html',
  styleUrls: ['./heroes-container.component.css']
})
export class HeroesContainerComponent implements OnInit {
  heroes = HEROES;
  lastId = 20;
  newHero: Hero;
  selectedHero: Hero;

  constructor() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(newHero): void {
    console.log(newHero);
    this.heroes.push(newHero);
    this.lastId = this.lastId +1;
    this.resetNewHero();
  }

  resetNewHero() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(function(el) { return el.id != hero.id; }); 
  }

  onDelete(hero: Hero) {
    console.log('List component wants to delete the item ' + hero.id);
    this.heroes = this.heroes.filter(function(el) { return el.id != hero.id; }); 
  }
}
