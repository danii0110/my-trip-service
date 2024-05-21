import { combineReducers } from 'redux';
import userReducer from './userReducer';

//루트 리듀서 생성
const rootReducer = combineReducers({
  user: userReducer,
});
export default rootReducer;
