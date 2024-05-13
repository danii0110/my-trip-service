import styles from './AddBtn.module.scss';
import GrayAddIcon from '../../../assets/grayAddIcon.svg';
import WhiteCheckIcon from '../../../assets/whiteCheckIcon.svg';

const AddBtn = ({ checked, onChange }) => {
  return (
    <button className={`${styles.button} ${checked ? styles.checked : ''}`} onClick={onChange} type='button'>
      {checked ? (
        <img className={styles.whiteCheckIcon} src={WhiteCheckIcon} alt='white-check-icon' />
      ) : (
        <img className={styles.grayAddIcon} src={GrayAddIcon} alt='gray-add-icon' />
      )}
    </button>
  );
};
export default AddBtn;
