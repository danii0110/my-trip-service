import styles from './DayCont.module.scss';
import MainCont from './MainCont';

const DayCont = ({ day, date, plans }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.day}>{day}</div>
        <div className={styles.date}>{date}</div>
      </div>
      {plans.map((plan, index) => (
        <MainCont
          key={index}
          time={plan.time}
          tag={plan.tag}
          place={plan.place}
          moveTime={plan.moveTime}
          showMoveTime={index !== plans.length - 1}
        />
      ))}
    </div>
  );
};

export default DayCont;
