import styles from './AddPlaceBox.module.scss';
import TrashIcon from '../../../../assets/trashIcon.svg';
import { Button } from 'react-bootstrap';

const AddPlaceBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.numberCont}>1</div>
      <div className={styles.boxCont}>
        <div className={styles.placeImg}></div>
        <div className={styles.detailsCont}>
          <div className={styles.placeName}>성산 일출봉</div>
          <div className={styles.subDetails}>
            <div className={styles.category}>명소</div>
            <div className={styles.address}>대한민국 서귀포시 성산 일출봉</div>
          </div>
        </div>
        <div className={styles.editBtns}>
          <Button id={styles.editBtn}>지정 시간</Button>
          <Button id={styles.editBtn}>소요 시간</Button>
        </div>
        <img className={styles.trashIcon} src={TrashIcon} alt='trash-icon' />
      </div>
    </div>
  );
};
export default AddPlaceBox;
