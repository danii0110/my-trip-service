import styles from './CartModal.module.scss';
import WhiteXIcon from '../../../assets/whiteX.svg';

const CartModal = ({ content, onRemove }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.topCont}>
        <div className={styles.editDate}>{content.editDate} 수정</div>
        <img className={styles.whiteXIcon} src={WhiteXIcon} alt='whiteX-icon' onClick={onRemove} />
      </div>
      <div className={styles.mainCont}>
        <div className={styles.duration}>{content.duration}</div>
        <div className={styles.contentPlace}>{content.places[0]}</div>
        <div className={styles.placeNum}>담은 장소: {content.placeCount}</div>
      </div>
    </div>
  );
};

export default CartModal;
