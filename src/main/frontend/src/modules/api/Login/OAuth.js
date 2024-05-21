// const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const { REACT_APP_REST_API_KEY } = process.env;
const REDIRECT_URI = 'http://localhost:3000/callback/kakao';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`; //카카오 인증 서버로 사용자를 리다이렉트함
