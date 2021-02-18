import { SEARCH_COOK, SEARCH_COOK_RESET, COOK_CURRENT } from '../actions-types';

export const searcCook = (value) => ({
  type: SEARCH_COOK,
  payload: value,
});

export const searcCookReset = () => ({
  type: SEARCH_COOK_RESET,
});

export const setCookCurrent = (item, last) => ({
  type: COOK_CURRENT,
  payload: { item, last },
});
