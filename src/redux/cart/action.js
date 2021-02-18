import { CART_ADD, CART_ALL } from '../actions-types';

export const cartAdd = (cook, quantity) => ({
  type: CART_ADD,
  payload: { cook, quantity },
});
