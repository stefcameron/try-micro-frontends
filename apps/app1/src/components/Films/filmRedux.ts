import { Action } from '@reduxjs/toolkit';
import { EID } from '@try-micro-frontends/api';

//
// INITIAL STATE
//

export interface FilmState {
  /** Films on which to filter (i.e. to include in results). Empty if all films are viewable. */
  filters: Array<EID>;
}

/** Name of the key in the Redux store for this state. */
export const STATE_KEY = 'films';

export const initialState: FilmState = {
  filters: [],
};

//
// ACTIONS
//

export interface FilmAction extends Action<string> {
  payload?: { filmId: EID };
}

export const ADD_FILTER = 'film/addFilter';
export const REMOVE_FILTER = 'film/removeFilter';
export const REMOVE_ALL_FILTERS = 'film/removeAllFilters';

export const addFilter = (filmId: EID): FilmAction => ({
  type: ADD_FILTER,
  payload: { filmId },
});

export const removeFilter = (filmId: EID): FilmAction => ({
  type: REMOVE_FILTER,
  payload: { filmId },
});

export const removeAllFilters = (): FilmAction => ({
  type: REMOVE_ALL_FILTERS,
});

//
// SELECTORS
//

export const selectFilters = (state: {
  [STATE_KEY]: FilmState;
  [index: string]: unknown;
}) => state[STATE_KEY].filters;

//
// REDUCER
//

export const reducer = (
  state: FilmState = initialState,
  action: FilmAction
): FilmState => {
  switch (action.type) {
    case ADD_FILTER:
      if (
        action.payload?.filmId &&
        !state.filters.includes(action.payload?.filmId)
      ) {
        return {
          ...state,
          filters: state.filters.concat(action.payload?.filmId),
        };
      }
      return state;

    case REMOVE_FILTER:
      if (
        action.payload?.filmId &&
        state.filters.includes(action.payload?.filmId)
      ) {
        return {
          ...state,
          filters: state.filters.filter((id) => id !== action.payload?.filmId),
        };
      }
      return state;

    case REMOVE_ALL_FILTERS:
      if (state.filters.length > 0) {
        return {
          ...state,
          filters: [],
        };
      }
      return state;

    default:
      return state;
  }
};
