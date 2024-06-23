// 카카오 로그인 액션
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const kakaoLogin = (userInfo) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      ...userInfo,
      userId: userInfo.id, // `id`를 `userId`로 변경
    },
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
    console.log('User loaded from localStorage:', user); // 추가된 콘솔 로그
    return kakaoLogin(user);
  } else {
    return { type: 'NO_USER' };
  }
};
