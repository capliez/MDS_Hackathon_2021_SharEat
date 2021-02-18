import { USER_ADD_FAVORITE } from '../actions-types';
const INIT_STATE = {
  favoriteCook: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_ADD_FAVORITE:
      const currentCook = action.payload;
      const verifIsFavorite = state.favoriteCook.includes(currentCook);
      return {
        ...state,
        favoriteCook: verifIsFavorite
          ? state.favoriteCook.filter((c) => c.id !== currentCook.id)
          : [currentCook].concat(state.favoriteCook),
      };
    default:
      return { ...state };
  }
};
