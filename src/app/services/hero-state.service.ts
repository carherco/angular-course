import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HeroAction, HeroActions } from 'app/reducers/hero.actions';
import { reducer, initialHeroState } from 'app/reducers/hero.reducer';
import { HeroState } from '../reducers/hero.store';

@Injectable({
  providedIn: 'root'
})
export class HeroStateService {
  
    private state: HeroState = initialHeroState;
    private state$ = new Subject<any>();
    
    constructor() {}

    public dispatch = (action: HeroAction) => {
      this.state = reducer(this.state, action);
      this.state$.next(this.getSnapshot());
    };

    public getSnapshot = () => {
      return { ...this.state };
    };

    public select$ = () => this.state$.asObservable();
}

