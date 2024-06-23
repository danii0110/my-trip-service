import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { kakaoLogin } from './userActions';

const OAuth2Redirection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      console.error('No code found in the URL');
      return;
    }

    const getToken = async () => {
      try {
        console.log('Requesting access token with code:', code);
        const response = await axios.post(
          'http://localhost:8080/api/login/oauth2/code/kakao',
          { code },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        hasFetched.current = true;

        console.log('Server response:', response.data);
        const data = response.data;
        const accessToken = data.access_token;
        if (!accessToken) {
          throw new Error('Access token not received');
        }
        console.log('Received access token:', accessToken);
        await getUserInfo(accessToken);
      } catch (error) {
        console.error('토큰을 받아오는 중 오류가 발생했습니다.', error);
      }
    };

    const getUserInfo = async (token) => {
      try {
        console.log('Requesting user info with token:', token);
        const userInfoResponse = await axios.get('http://localhost:8080/api/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userInfo = userInfoResponse.data;
        console.log('Received user info:', userInfo);
        dispatch(kakaoLogin(userInfo));

        // 사용자 정보를 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify(userInfo));

        navigate('/'); // 로그인 성공 후 메인 페이지로 이동
      } catch (error) {
        console.error('사용자 정보를 받아오는 중 오류가 발생했습니다.', error);
      }
    };

    getToken();
  }, [dispatch, navigate]);

  return <div>로그인 중...</div>;
};

export default OAuth2Redirection;
