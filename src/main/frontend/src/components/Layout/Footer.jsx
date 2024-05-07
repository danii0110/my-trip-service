import styles from './Footer.module.scss';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img className={styles.logoImg} src={logoImg} alt='MyTrip 로고' />
      <div className={styles.content}>
        <div className={styles.info}>주식회사 마이트립 | contact@mytrip.co.kr</div>
        <nav className={styles.navigation}>
          <Link to='/'>이용약관 | </Link>
          <Link to='/'>개인정보처리방침 | </Link>
          <Link to='/'>Q&A | </Link>
          <Link to='/'>기업소개 | </Link>
          <Link to='/'>1:1문의</Link>
        </nav>
        <div className={styles.info}>Copyright ⓒ TRAC. All Rights Reserved.</div>
      </div>
    </footer>
  );
};
export default Footer;
