import defaultImage from '../../assets/defaultImage.png';

const Box = ({ src, alt, title, areacode, sigungucode, text, onClick, styles, width, margin }) => {
    return (
        <div className={styles.container} onClick={onClick} style={{width: width, margin: margin}}>
            <div className={styles.imageContainer}>
                {/* 이미지 */}
                <img src={src || defaultImage} alt={alt} />
            </div>
            <div className={styles.textContainer}>
                {/* 텍스트 */}
                <h3>{title}</h3>
                <p>{areacode} {sigungucode}</p>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Box;
