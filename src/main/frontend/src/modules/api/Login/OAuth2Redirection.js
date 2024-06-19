import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from './userActions';

const OAuth2Redirection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  //hasFetched는 요청이 중복으로 발생하는 것을 방지
  // const [hasFetched, setHasFetched] = useState(false);
  const hasFetched = useRef(false);

  //useEffect 훅은 컴포넌트가 마운트될 때 실행되어 OAuth2 인증 코드를 처리
  useEffect(() => {
    // if (hasFetched) return;
    // if (hasFetched.current) return;
    if (hasFetched.current) return;

    //현재 URL에서 인증 코드를 추출합니다.
    //코드가 없으면 에러를 출력합니다.
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      console.error('No code found in the URL');
      return;
    }

    //getToken 함수는 백엔드 엔드포인트 /api/login/oauth2/code/kakao에 인증 코드를 POST 요청으로 보내어 액세스 토큰을 받아옵니다.
    //받은 액세스 토큰이 없으면 에러를 발생시킵니다.
    //액세스 토큰을 사용해 사용자 정보를 가져오는 getUserInfo 함수를 호출합니다.
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
        // setHasFetched(true); // 요청을 보낸 후 플래그를 true로 설정
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

    //getUserInfo 함수는 액세스 토큰을 사용하여 백엔드 엔드포인트 /api/userinfo에서 사용자 정보를 가져옵니다.
    //사용자 정보를 Redux 스토어에 저장하고, 메인 페이지로 리디렉션합니다.
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
        navigate('/'); // 로그인 성공 후 메인 페이지로 이동
      } catch (error) {
        console.error('사용자 정보를 받아오는 중 오류가 발생했습니다.', error);
      }
    };

    getToken(); //TODO: 확인해보기
  }, [dispatch, navigate]);

  return <div>로그인 중...</div>;
};

export default OAuth2Redirection;
