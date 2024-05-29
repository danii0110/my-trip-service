import { Button } from 'react-bootstrap';
import styles from './PlanCont.module.scss';
import DayCont from './DayCont';
import { useState } from 'react';
import GoMyTripModal from './GoMyTripModal';
const PlanCont = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainCont}>
          <DayCont />
          <DayCont />
        </div>
        <button className={styles.makePlanBtn} type='button' onClick={handleButtonClick}>
          저장
        </button>
      </div>
      <GoMyTripModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};
export default PlanCont;
