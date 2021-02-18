import { USER_ADD_FAVORITE } from '../actions-types';

export const addFavoriteUser = (cook) => ({
  type: USER_ADD_FAVORITE,
  payload: cook,
});
