import styles from './MyTripHeader.module.scss';
import ConfigurationIcon from '../../assets/configurationIcon.svg';
import BookmarkIcon from '../../assets/bookmarkIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const MyTripHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToProfile = () => {
    if (location.pathname !== '/my-trip/profile') {
      navigate('/my-trip/profile');
    }
  };
  const navigateToScrap = () => {
    if (location.pathname !== '/my-trip/scrap') {
      navigate('/my-trip/scrap');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>MyTrip</div>
      <div className={styles.profileCont} onClick={navigateToProfile}>
        <div className={styles.subTitle}>프로필 관리</div>
        <button className={styles.btn}>
          <img src={ConfigurationIcon} alt='configuration-icon' />
        </button>
      </div>
      <div className={styles.scrapCont} onClick={navigateToScrap}>
        <div className={styles.subTitle}>스크랩</div>
        <button className={styles.btn}>
          <img src={BookmarkIcon} alt='bookmark-icon' />
        </button>
      </div>
    </div>
  );
};
export default MyTripHeader;
