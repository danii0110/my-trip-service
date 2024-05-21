import styles from './SearchBox.module.scss'
import defaultImage from '../../assets/defaultImage.png';

const SearchBox = ({ src, alt, title, text, onClick }) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.imageContainer}>
                {/* 이미지 */}
                <img src={src || defaultImage} alt={alt} />
            </div>
            <div className={styles.textContainer}>
                {/* 텍스트 */}
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default SearchBox;