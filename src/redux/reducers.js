import { combineReducers } from 'redux';
import CookReducer from './cook/reducer';
import CartReducer from './cart/reducer';
import UserReducer from './user/reducer';
const reducers = combineReducers({
  Cooks: CookReducer,
  Cart: CartReducer,
  User: UserReducer,
});

export default reducers;
