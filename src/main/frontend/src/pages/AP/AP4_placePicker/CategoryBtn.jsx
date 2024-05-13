import styles from './CategoryBtn.module.scss';

const CategoryBtn = ({ content, setSelectedCategory, selectedCategory }) => {
  const handleClick = () => {
    setSelectedCategory(content);
  };

  return (
    <button
      className={`${styles.container} ${content === selectedCategory ? styles.selected : ''}`}
      onClick={handleClick}
      type='button'
    >
      {content}
    </button>
  );
};
export default CategoryBtn;
