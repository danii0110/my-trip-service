import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";

import Layout from "../../components/layouts/Layout";
import PageInfo from "../../components/layouts/PageInfo";
import Search from "../../components/Element/Search";
import styles from "./SearchPage.module.scss"
import searchBoxStyle from "./SearchBox.module.scss";
import EmptyDataScreen from "./EmptyDataScreen";
import tree from "../../assets/tree.svg";
import Pagination from "../../components/Element/Pagination";
import Box from "../../components/Element/Box";

const SearchPage = () => {
    const [selectedButton, setSelectedButton] = useState("전체");
    const [pageNumber, setPageNumber] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [areaNames, setAreaNames] = useState(null);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const contentType = searchParams.get("contentType");

    const [searchList, setSearchList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleButtonClick = (text, contentType) => {
        setSelectedButton(text);
        setPageNumber(1);
        setSearchParams({keyword: keyword, contentType: contentType});
    };

    const handleContent = (contentId, contentTypeId, areaCode, sigunguCode, mapX, mapY) => {
        // 버튼을 클릭할 때 여행지 페이지로 이동하고 검색어를 URL에 추가
        navigate(`/location?contentId=${contentId}&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&mapX=${mapX}&mapY=${mapY}`);
    };

    const handlePageNumber = (newPageNumber) => {
        setPageNumber(newPageNumber); // 다음 페이지 번호로 업데이트
    };

    useEffect(() => {
        const fetchSearchList = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    axios.get("data/list", {
                        params: {
                            apiUri: "/searchKeyword1",
                            pageNo: pageNumber,
                            numOfRows: "10",
                            arrange: "D",
                            contentTypeId: contentType,
                            keyword: keyword

                        }
                    }),
                    axios.get("area/areaCode")
                ]); // 백엔드 서버의 엔드포인트로 요청을 보냅니다.

                const areaSigunguMap = response2.data.reduce((acc, curr) => {
                    if (!acc[curr.areacode]) {
                        acc[curr.areacode] = {};
                    }
                    acc[curr.areacode][curr.sigungucode || '0'] = curr.name;
                    return acc;
                }, {});
                setAreaNames(areaSigunguMap);
                setSearchList(response1.data); // 응답 데이터를 상태에 설정합니다.
                setTotalItems(response1.data.response.body.totalCount || 0)
                setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 끝났음을 나타냅니다.
            } catch (error) {
                setError(error); // 에러가 발생하면 에러 상태를 설정합니다.
                setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 끝났음을 나타냅니다.
            }
        };

        fetchSearchList(); // useEffect가 호출될 때 fetchLocationOverview 함수를 실행합니다.
    }, [keyword, contentType, pageNumber]); // useEffect를 컴포넌트가 마운트될 때만 실행하기 위해 빈 배열을 전달합니다.

    function SearchFilter() {
        const searchButtonDict = {
            "전체": "",
            "여행지": "12",
            "음식점": "39",
            "숙박": "32",
            "문화시설": "14",
            "레포츠": "28",
            "쇼핑": "38"
        };

        const searchButtonList = Object.entries(searchButtonDict).map(([text, contentType]) => (
            <button
                key={text}
                name={text}
                data-content-type={contentType}
                onClick={() => handleButtonClick(text, contentType)}
                className={text === selectedButton ? styles.selectedButton : ""}>
                {text}
            </button>
        ));

        return (
            <div className={styles.searchBtn}>
                {searchButtonList}
            </div>
        );

    }

    const SearchList = () => {
        const totalPages = Math.ceil(totalItems / 10);

        if (loading) {
            return <div>Loading...</div>; // 로딩 중이면 로딩 표시를 합니다.
        }

        if (error) {
            return <div>Error: {error.message}</div>; // 에러가 발생하면 에러 메시지를 표시합니다.
        }

        if (!searchList || !searchList.response || !searchList.response.body || !searchList.response.body.items) {
            setTotalItems(0);
            return <EmptyDataScreen keyword={keyword}/>;
        }

        return (
            <div className={styles.searchList}>
                <div className={styles.searchHeader}>
                    <hr/>
                    <img src={tree} className={styles.tree} alt="tree"/>
                    <p>여행정보</p>
                </div>
                <div>
                    {searchList
                        && searchList.response
                        && searchList.response.body
                        && searchList.response.body.items
                        && searchList.response.body.items.item.map((item) => {
                            const areacode = areaNames[item.areacode]?.["0"] || "전국";
                            const sigungucode = areaNames[item.areacode]?.[item.sigungucode] || "전국";

                            return (
                                <Box onClick={() => handleContent(item.contentid, item.contenttypeid, item.areacode, item.sigungucode, item.mapx, item.mapy)}
                                     key={item.contentid}
                                     src={item.firstimage}
                                     alt={item.title}
                                     title={item.title}
                                     areacode={areacode}
                                     sigungucode={sigungucode}
                                     styles={searchBoxStyle}/>
                            );
                        })}
                </div>
                <div>
                    <Pagination
                        currentPage={pageNumber}
                        totalPages={totalPages}
                        onPageChange={handlePageNumber}
                    />
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <PageInfo height="150px">
                <Search width="850px" top="50%" setSelectedButton={setSelectedButton}/>
            </PageInfo>
            <SearchFilter/>
            <SearchList/>
        </Layout>
    );
};
export default SearchPage;