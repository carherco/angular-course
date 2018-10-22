import { Injectable } from '@angular/core';
import { HEROES } from '../data/mock-heroes';
import { HeroStateService } from './hero-state.service';
import { LoadHeroes } from 'app/reducers/hero.actions';

@Injectable({
  providedIn: 'root'
})
export class HeroReduxService {

  constructor(private stateService: HeroStateService) { }

  get() {
    this.stateService.dispatch(new LoadHeroes(HEROES));
  }
}


