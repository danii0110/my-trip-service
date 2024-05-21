import styles from './Header.module.scss';
import logoImg from '../../assets/logo.svg';
import alarmImg from '../../assets/alarm.svg';
import profileImg from '../../assets/profile.svg';
import kakaoLoginImg from '../../assets/kakao_login_medium.png';
import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../../modules/api/Login/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/api/Login/userActions'; //로그아웃 액션 임포트

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const kakaoLoginHandler = () => {
    //카카오 인증 URL(KAKAO_AUTH_URL)를 REDIRECT_URI로 전달(사용자가 인가 코드를 받아옴)
    window.location.replace(`${KAKAO_AUTH_URL}`);
    // window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogout = () => {
    dispatch(logout());
    // returning initialState explicitly
    return { user: null, isLoggedIn: false };
  };

  return (
    <header className={styles.header}>
      <Link to='/'>
        <img className={styles.logoImg} src={logoImg} alt='MyTrip 로고' />
      </Link>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link to='/trip-plan'>여행지</Link>
          </li>
          <li>
            <Link to='/planning'>AI플래너</Link>
          </li>
          <li>
            <Link to='/ai-chat'>AI Chat</Link>
          </li>
          <li>
            <Link to='/mytrip'>MyTrip</Link>
          </li>
          <li>
            <Link to='/community'>커뮤니티</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.icons}>
        {isLoggedIn ? (
          <>
            <img className={styles.alarmIcon} src={alarmImg} alt='alarm-icon' />
            <img className={styles.profileIcon} src={profileImg} alt='profile-icon' />
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <img
            className={styles.loginButton}
            src={kakaoLoginImg}
            alt='kakao-login-button'
            onClick={kakaoLoginHandler}
          />
        )}
      </div>
    </header>
  );
};
export default Header;
