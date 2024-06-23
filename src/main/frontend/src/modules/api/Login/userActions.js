export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const kakaoLogin = (userInfo) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userInfo,
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
    return { type: 'NO_USER' };
  }
};
