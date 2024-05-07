import styles from './Header.module.scss';
import logoImg from '../../assets/logo.svg';
import alarmImg from '../../assets/alarm.svg';
import profileImg from '../../assets/profile.svg';
import { Link } from 'react-router-dom';

const Header = () => {
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
            <Link to='/ai-planner'>AI플래너</Link>
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
        <img className={styles.alarmIcon} src={alarmImg} alt='alarm-icon' />
        <img className={styles.profileIcon} src={profileImg} alt='profile-icon' />
      </div>
    </header>
  );
};
export default Header;
