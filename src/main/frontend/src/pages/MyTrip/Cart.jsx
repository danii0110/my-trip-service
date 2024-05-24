import styles from './Cart.module.scss';
import QuestionIcon from '../../assets/questionIcon.svg';
import Plan from './Plan';

const Cart = () => {
  const plans = Array.from({ length: 8 }, (_, index) => <Plan key={index} />);
  return (
    <div className={styles.container}>
      <div className={styles.subtitleCont}>
        <div className={styles.subtitle}>나의 여행 도시 목록</div>
        <button className={styles.questionIcon}>
          <img src={QuestionIcon} alt='question-icon' />
        </button>
      </div>
      <div className={styles.mainCont}>
        <div className={styles.main}>{plans}</div>
      </div>
    </div>
  );
};
export default Cart;
