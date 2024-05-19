import styles from "./EmptyDataScreen.module.scss"
import noSearch from "../../assets/noSearch.svg"

const EmptyDataScreen = ({ keyword }) => {
    return (
        <div className={styles.empty}>
            <img src={noSearch} alt="검색어 없음"/>
            <p>"{keyword}"에 대한 검색 결과가 없습니다.<br/>
                다른 검색어를 입력하시거나 철자와 띄어쓰기를 확인해보세요.</p>
        </div>
    );
};

export default EmptyDataScreen;