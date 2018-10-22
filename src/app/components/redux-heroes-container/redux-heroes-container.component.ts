import { HeroStateService } from './../../services/hero-state.service';
import { Component, OnInit } from '@angular/core';
import { HEROES } from 'app/data/mock-heroes';
import { Hero } from 'app/model/hero';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoadHeroes } from 'app/reducers/hero.actions';

@Component({
  selector: 'app-redux-heroes-container',
  templateUrl: './redux-heroes-container.component.html',
  styleUrls: ['./redux-heroes-container.component.css']
})
export class ReduxHeroesContainerComponent implements OnInit {

  heroes$: Observable<any>;
  heroes: Hero[] = [];
  lastId = 20;
  newHero: Hero;
  selectedHero: Hero;

  constructor(private heroStateService: HeroStateService) {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  ngOnInit() {
    this.heroes$ = this.heroStateService.select$().pipe(
      map( state => state.items ),
    );
    this.heroes$.subscribe( x => this.heroes = x );
    this.heroStateService.dispatch(new LoadHeroes(HEROES));
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(newHero): void {
    //console.log(newHero);
    //this.heroes.push(newHero);
    //this.lastId = this.lastId +1;
    //this.resetNewHero();
  }

  resetNewHero() {
    this.newHero = {
      id: this.lastId + 1,
      name: ''
    };
  }

  delete(hero: Hero) {
    //this.heroes = this.heroes.filter(function(el) { return el.id != hero.id; }); 
  }

  onDelete(hero: Hero) {
    //console.log('List component wants to delete the item ' + hero.id);
    //this.heroes = this.heroes.filter(function(el) { return el.id != hero.id; }); 
  }
}
