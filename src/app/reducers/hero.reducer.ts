import { HeroState } from "./hero.store";
import { HeroAction } from "./hero.actions";

export const initialHeroState: HeroState = {
  items: []
};

export function reducer(state = initialHeroState, action: HeroAction): HeroState {
  let newstate = {...state};
  switch (action.type) {
    case '[HERO]_Load':
      newstate.items = action.payload;
    break;
    case '[HERO]_Add':
      newstate.items.push(action.payload);
    break;
    default:
      return state;
  }
  return newstate;
}