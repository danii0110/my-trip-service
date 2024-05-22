import styles from './MyTripHeader.module.scss';
import ConfigurationIcon from '../../assets/configurationIcon.svg';
import BookmarkIcon from '../../assets/bookmarkIcon.svg';

const MyTripHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>MyTrip</div>
      <div className={styles.profileCont}>
        <div>프로필 관리</div>
        <button className={styles.btn}>
          <img src={ConfigurationIcon} alt='configuration-icon' />
        </button>
      </div>
      <div className={styles.scrapCont}>
        <div>스크랩</div>
        <button className={styles.btn}>
          <img src={BookmarkIcon} alt='bookmark-icon' />
        </button>
      </div>
    </div>
  );
};
export default MyTripHeader;
