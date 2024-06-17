import styles from './AddPlaceBox.module.scss';
import TrashIcon from '../../../../assets/trashIcon.svg';
import { Button } from 'react-bootstrap';

const AddPlaceBox = ({ id, number, onDelete, placeName, category, address, duration = 120 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.numberCont}>{number}</div> {/* 수정된 부분 */}
      <div className={styles.boxCont}>
        <div className={styles.placeImg}></div>
        <div className={styles.detailsCont}>
          <div className={styles.placeName}>{placeName}</div>
          <div className={styles.subDetails}>
            <div className={styles.category}>{category}</div>
            <div className={styles.address}>{address}</div>
          </div>
        </div>
        <div className={styles.editBtns}>
          <Button id={styles.editBtn}>{`${Math.floor(duration / 60)}시간 ${duration % 60}분`}</Button>
        </div>
        <img className={styles.trashIcon} src={TrashIcon} alt='trash-icon' onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};

export default AddPlaceBox;
