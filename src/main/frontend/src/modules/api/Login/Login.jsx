import {KAKAO_AUTH_URL} from "./OAuth";
import {useNavigate} from "react-router-dom";
import Layout from "../../../components/layouts/Layout";

const Login = () => {
    const navigate = useNavigate();

    const kakaoLoginHandler = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const handleHome = () => {
        navigate('/');
    }

    return (
        <Layout>
            <div>
                <button onClick={kakaoLoginHandler}>카카오 로그인</button>
                <button onClick={handleHome}>홈으로 돌아가기</button>
            </div>
        </Layout>
    )
}

export default Login;