//로그인 상태 관리
import { LOGIN_SUCCESS, LOGOUT } from '../modules/api/Login/userActions';

const initialState = {
  user: null,
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state, // 현재 상태를 복사하여 새로운 객체 생성
        user: action.payload, // 사용자 정보 업데이트
        isLoggedIn: true,
      };
    case LOGOUT:
      return { ...initialState }; // Returning a new object explicitly
    default:
      return state;
  }
};

export default userReducer;
