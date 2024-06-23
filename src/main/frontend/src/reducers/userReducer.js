//로그인 상태 관리
import { LOGIN_SUCCESS, LOGOUT } from '../modules/api/Login/userActions';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  isLoggedIn: !!localStorage.getItem('user'),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
