import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Hero } from '../../model/hero';
import { HeroService } from '../../services/hero.service';
//import {switchMap} 'rxjs/operators';

@Component({
  selector: 'app-child-comp',
  templateUrl: './child-comp.component.html',
  styleUrls: ['./child-comp.component.css']
})
export class ChildCompComponent implements OnInit {

  @Input('variable_para_child')  hero: Hero;
  @Output() onChildDeleted = new EventEmitter<Hero>();
  
  constructor() { }

  ngOnInit() { }

  delete() {
    this.onChildDeleted.emit(this.hero);
  }

}
