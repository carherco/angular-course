import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Hero } from 'app/model/hero';

@Component({
  selector: 'app-heroes-add-presenter',
  templateUrl: './heroes-add-presenter.component.html',
  styleUrls: ['./heroes-add-presenter.component.css']
})
export class HeroesAddPresenterComponent implements OnInit {

  @Input() hero: Hero;
  @Output() onAdd = new EventEmitter<Hero>();
  
  constructor() { }

  ngOnInit() { }

  add() {
    this.onAdd.emit(this.hero);
  }

}
