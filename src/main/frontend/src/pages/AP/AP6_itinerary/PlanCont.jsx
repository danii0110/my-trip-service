import { Button } from 'react-bootstrap';
import styles from './PlanCont.module.scss';
import DayCont from './DayCont';
const PlanCont = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainCont}>
          <DayCont />
          <DayCont />
        </div>
        <button className={styles.makePlanBtn} type='button'>
          저장
        </button>
      </div>
    </>
  );
};
export default PlanCont;
