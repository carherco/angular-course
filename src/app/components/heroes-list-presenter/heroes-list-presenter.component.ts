import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Hero } from 'app/model/hero';

@Component({
  selector: 'app-heroes-list-presenter',
  templateUrl: './heroes-list-presenter.component.html',
  styleUrls: ['./heroes-list-presenter.component.css']
})
export class HeroesListPresenterComponent implements OnInit {

  @Input() heroes: Hero[];
  @Input() selectedHero: Hero;
  @Output() onSelect= new EventEmitter<Hero>();
  @Output() onDelete= new EventEmitter<Hero>();

  constructor() { }

  ngOnInit() {
  }

  select(hero: Hero): void {
    this.onSelect.emit(hero);
  }

  delete(hero: Hero): void {
    this.onDelete.emit(hero);
  }

}
