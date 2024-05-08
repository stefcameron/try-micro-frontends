import { CombinedState, Reducer, combineReducers } from '@reduxjs/toolkit';

import {
  FilmState,
  STATE_KEY as FILMS_KEY,
  reducer as filmReducer,
} from '../components/Films/filmRedux';

export interface AppState {
  [FILMS_KEY]: FilmState;
}

export type RootReducer = Reducer<CombinedState<AppState>>;

export const rootReducer = combineReducers({
  [FILMS_KEY]: filmReducer,
}) as RootReducer;
