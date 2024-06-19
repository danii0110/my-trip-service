import styles from './AreaBtn.module.scss';

const AreaBtn = ({ name, selected, onClick }) => {
  return (
    <button className={`${styles.container} ${selected ? styles.selected : ''}`} onClick={onClick} type='button'>
      {name}
    </button>
  );
};
export default AreaBtn;
