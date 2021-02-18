import { CART_ALL, CART_ADD } from '../actions-types';
const INIT_STATE = {
  all: [],
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CART_ADD:
      const { cook: currentCook, quantity } = action.payload;
      const verifIsCart = state.all.filter((c) => c.cook.id === currentCook.id);
      let newCook = state.all;
      if (verifIsCart.length > 0) {
        newCook = state.all.filter((c) =>
          c.cook.id === currentCook.id ? (c.quantity = quantity) : c,
        );
      } else {
        newCook = {
          cook: currentCook,
          quantity,
        };
      }

      return {
        ...state,
        all: verifIsCart.length > 0 ? newCook : [newCook].concat(state.all),
      };
    case CART_ALL:
      return state;
    default:
      return { ...state };
  }
};
