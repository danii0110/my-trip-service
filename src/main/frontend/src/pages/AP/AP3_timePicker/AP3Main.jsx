import styles from './AP3Main.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AP3Left from './AP3Left';

const AP3Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftCont}>
        <AP3Left />
      </div>
      <div className={styles.rightCont}>Map</div>
    </div>
  );
};
export default AP3Main;
