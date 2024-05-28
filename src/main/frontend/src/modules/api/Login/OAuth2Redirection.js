import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from './userActions';

//인가 코드로 액세스 토근 받기
const OAuth2Redirection = (props) => {
  const dispatch = useDispatch();

  //인가 코드
  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post(`https://kauth.kakao.com/oauth/token`, null, {
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_REST_API_KEY,
            redirect_uri: 'http://localhost:3000/callback/kakao',
            code,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const { access_token } = response.data;
        // 액세스 토큰을 이용하여 사용자 정보 요청 및 서버에 전달
        await getUserInfo(access_token);
      } catch (error) {
        console.error('토큰을 받아오는 중 오류가 발생했습니다.', error);
      }
    };

    const getUserInfo = async (token) => {
      try {
        const userInfoResponse = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userInfo = userInfoResponse.data;
        // 여기서 서버에 사용자 정보를 전달하는 API 호출
        await dispatch(kakaoLogin(userInfo));
      } catch (error) {
        console.error('사용자 정보를 받아오는 중 오류가 발생했습니다.', error);
      }
    };

    getToken();
  }, [code, dispatch]);
  return <div>로그인 중...</div>;
};
export default OAuth2Redirection;
