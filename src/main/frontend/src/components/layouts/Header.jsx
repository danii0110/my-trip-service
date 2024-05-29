import styles from './Header.module.scss';
import logoImg from '../../assets/logo.svg';
import alarmImg from '../../assets/alarm.svg';
import profileIcon from '../../assets/profileIcon.svg';
import kakaoLoginImg from '../../assets/kakao_login_medium.png';
import { Link } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../../modules/api/Login/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../modules/api/Login/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user'); // 로그아웃 시 로컬 스토리지에서도 삭제
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
            <Link to='/my-trip'>MyTrip</Link>
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
            <img className={styles.profileIcon} src={profileIcon} alt='profile-icon' />
            {/* <button onClick={handleLogout}>로그아웃</button> */}
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
