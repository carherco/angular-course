import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from 'app/model/hero';

@Component({
  selector: 'app-heroes-edit-presenter',
  templateUrl: './heroes-edit-presenter.component.html',
  styleUrls: ['./heroes-edit-presenter.component.css']
})
export class HeroesEditPresenterComponent implements OnInit {

  @Input() hero: Hero;
  @Output() onDeleted = new EventEmitter<Hero>();
  
  constructor() { }

  ngOnInit() { }

  delete() {
    this.onDeleted.emit(this.hero);
  }

}
