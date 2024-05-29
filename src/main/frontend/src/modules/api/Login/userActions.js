// 카카오 로그인 액션
//Redux 액션 생성자 함수를 정의
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

//kakaoLogin: 카카오 로그인 성공 시에 사용되는 액션 생성자 함수
export const kakaoLogin = (userInfo) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userInfo, //카카오 로그인에 성공한 사용자 정보가 전달
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const loadUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return kakaoLogin(user);
  } else {
    return { type: 'NO_USER' }; // 사용자가 없는 경우의 기본 액션
  }
};
