import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../TripPlan/TripPlan.module.scss"
import {useNavigate, useSearchParams} from "react-router-dom";
import SearchBox from "./SearchBox";
import tree from "../../assets/tree.svg"

const SearchList = () => {
    const [searchList, setSearchList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const navigate = useNavigate();
    const handleContent = (contentId) => {
        // 버튼을 클릭할 때 검색 페이지로 이동하고 검색어를 URL에 추가
        navigate(`/location?contentId=${contentId}`);
    }

    useEffect(() => {
        const fetchLocationList = async () => {
            try {
                const response = await axios.get("data", {
                    params: {
                        apiUri: "/searchKeyword1",
                        pageNo: "2",
                        numOfRows: "10",
                        arrange: "D",
                        keyword: keyword
                    }
                }); // 백엔드 서버의 엔드포인트로 요청을 보냅니다.
                setSearchList(response.data); // 응답 데이터를 상태에 설정합니다.
                setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 끝났음을 나타냅니다.
            } catch (error) {
                setError(error); // 에러가 발생하면 에러 상태를 설정합니다.
                setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 끝났음을 나타냅니다.
            }
        };

        fetchLocationList(); // useEffect가 호출될 때 fetchLocationOverview 함수를 실행합니다.
    }, [keyword]); // useEffect를 컴포넌트가 마운트될 때만 실행하기 위해 빈 배열을 전달합니다.

    if (loading) {
        return <div>Loading...</div>; // 로딩 중이면 로딩 표시를 합니다.
    }

    if (error) {
        return <div>Error: {error.message}</div>; // 에러가 발생하면 에러 메시지를 표시합니다.
    }

    return (
        <div className={styles.searchList}>
            <hr />
            <img src={tree} className={styles.tree}/>
            <p>여행정보</p>
            {searchList
                && searchList.response
                && searchList.response.body
                && searchList.response.body.items
                && searchList.response.body.items.item.map((item, index) => (
                    <SearchBox onClick={() => handleContent(item.contentid)}
                         key={item.contentid}
                         src={item.firstimage}
                         alt={item.title}
                         title={item.title}
                         text={item.contentid} />
                ))}
        </div>
    );
};

export default SearchList;
