// export enum HeroActionTypes {
//   LoadHeroes = '[HERO]_Load',
//   AddHero = '[HERO]_Add',
// }

export interface HeroAction {
  readonly type: string;
  readonly payload?: any;
}

export class LoadHeroes implements HeroAction {
  readonly type = '[HERO]_Load';
  constructor(public readonly payload) {}
}

export class AddHero implements HeroAction {
  readonly type = '[HERO]_Add';
  constructor(public readonly payload) {}
}

export type HeroActions = LoadHeroes | AddHero;


