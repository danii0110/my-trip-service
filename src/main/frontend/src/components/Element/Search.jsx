import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../../pages/TripPlan/TripPlan.module.scss";

const Search = ({text, width, top}) => {
    const [search, setSearch] = useState("");
    const [contentType, setConentType] = useState("");
    const handleChange = (e) => setSearch(e.target.value);
    const navigate = useNavigate();

    const resetHandler = () => {
        setSearch("");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = () => {
        // 검색 버튼을 클릭할 때 검색 페이지로 이동하고 검색어를 URL에 추가
        navigate(`/search?keyword=${search}&contentType=${contentType}`);
    }

    return (
        <div className={styles.search}>
            <p>{text}</p>
            <form id="search" className={styles.searchbar} style={{ width: width, top:top }}>
                <input type="button" id="searchImage" className={styles.searchImg} onClick={handleSearch}/>
                <input type="text" id="searchLocation" placeholder="검색어를 입력해주세요."
                       value={search} onChange={handleChange} onKeyDown={handleKeyDown}/>
                <input type="button" id="searchCancel" className={styles.searchCancel} onClick={resetHandler}/>
            </form>
        </div>
    );
};

export default Search;