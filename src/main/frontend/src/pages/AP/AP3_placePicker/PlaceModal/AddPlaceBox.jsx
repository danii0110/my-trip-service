import { useState } from 'react';
import styles from './AddPlaceBox.module.scss';
import TrashIcon from '../../../../assets/trashIcon.svg';
import { Button } from 'react-bootstrap';

const AddPlaceBox = ({ id, number, onDelete, placeName, category, address, duration, onDurationChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDuration, setNewDuration] = useState(duration);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setNewDuration(value);
  };

  const handleSaveClick = () => {
    onDurationChange(id, newDuration);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewDuration(duration);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.numberCont}>{number}</div>
      <div className={styles.boxCont}>
        {!isEditing && (
          <>
            <div className={styles.placeImg}></div>
            <div className={styles.detailsCont}>
              <div className={styles.placeName}>{placeName}</div>
              <div className={styles.subDetails}>
                <div className={styles.category}>{category}</div>
                <div className={styles.address}>{address}</div>
              </div>
            </div>
          </>
        )}
        <div className={styles.editBtns}>
          {isEditing ? (
            <div className={styles.editContainer}>
              <span className={styles.editLabel}>머무는 시간 설정:</span>
              <input
                type='number'
                value={newDuration}
                onChange={handleDurationChange}
                className={styles.durationInput}
              />
              <Button id={styles.saveBtn} onClick={handleSaveClick}>
                확인
              </Button>
              <Button id={styles.cancelBtn} onClick={handleCancelClick}>
                취소
              </Button>
            </div>
          ) : (
            <Button id={styles.editBtn} onClick={handleEditClick}>{`${Math.floor(duration / 60)}시간 ${
              duration % 60
            }분`}</Button>
          )}
        </div>
        <img className={styles.trashIcon} src={TrashIcon} alt='trash-icon' onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};

export default AddPlaceBox;
