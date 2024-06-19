import React from 'react';
import styles from './CategoryBtn.module.scss';

const CategoryBtn = ({ content, selectedCategory, setSelectedCategory }) => {
  const isSelected = content === selectedCategory;

  const handleClick = () => {
    setSelectedCategory(content);
  };

  return (
    <button className={`${styles.categoryBtn} ${isSelected ? styles.selected : ''}`} onClick={handleClick}>
      {content}
    </button>
  );
};

export default CategoryBtn;
