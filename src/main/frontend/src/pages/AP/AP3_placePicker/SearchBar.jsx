import styles from './SearchBar.module.scss';
import SearchIcon from '../../../assets/searchIcon.svg';
const SearchBar = ({ onChange }) => {
  return (
    <div className={styles.search}>
      <input type='text' placeholder='장소명을 입력하세요.' className={styles.searchBar} onChange={onChange}></input>
      <img className={styles.searchIcon} src={SearchIcon} alt='search-icon' />
    </div>
  );
};
export default SearchBar;
