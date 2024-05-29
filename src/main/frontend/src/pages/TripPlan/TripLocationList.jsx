import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Box from "../../components/Element/Box";
import boxStyles from "../../components/Element/Box.module.scss"
import styles from "./TripLocationList.module.scss"
import Pagination from "../../components/Element/Pagination";

const TripLocationList = ({areaList, areacode, sigungucode}) => {
    const [locationList, setLocationList] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleContent = (contentId, contentTypeId, areaCode, sigunguCode, mapX, mapY) => {
        // 버튼을 클릭할 때 검색 페이지로 이동하고 검색어를 URL에 추가
        navigate(`/location?contentId=${contentId}&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&mapX=${mapX}&mapY=${mapY}`);
    };

    const handlePageNumber = (newPageNumber) => {
        setPageNumber(newPageNumber); // 다음 페이지 번호로 업데이트
    };

    const totalPages = Math.ceil(totalItems / 12);

    useEffect(() => {
        const fetchLocationList = async () => {
            try {
                const response = await axios.get("/data/list", {
                    params: {
                        apiUri: "/areaBasedList1",
                        pageNo: pageNumber,
                        numOfRows: "12",
                        arrange: "D",
                        contentTypeId: "12",
                        areaCode: areacode,
                        sigunguCode: sigungucode
                    }
                });
                setLocationList(response.data); // 응답 데이터를 상태에 설정합니다.
                setTotalItems(response.data.response.body.totalCount || 0)
                setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 끝났음을 나타냅니다.
            } catch (error) {
                setError(error); // 에러가 발생하면 에러 상태를 설정합니다.
                setLoading(false); // 로딩 상태를 false로 설정하여 로딩이 끝났음을 나타냅니다.
            }
        };

        fetchLocationList(); // useEffect가 호출될 때 fetchLocationOverview 함수를 실행합니다.
    }, [pageNumber, areacode, sigungucode]); // useEffect를 컴포넌트가 마운트될 때만 실행하기 위해 빈 배열을 전달합니다.

    if (loading) {
        return <div>Loading...</div>; // 로딩 중이면 로딩 표시를 합니다.
    }

    if (error) {
        return <div>Error: {error.message}</div>; // 에러가 발생하면 에러 메시지를 표시합니다.
    }

    return (
        <div className={styles.location}>
            <div className={styles.list}>
            {locationList
                && locationList.response
                && locationList.response.body
                && locationList.response.body.items
                && locationList.response.body.items.item.map((item) => {
                    const areacode = areaList[item.areacode]?.["0"] || "전국";
                    const sigungucode = areaList[item.areacode]?.[item.sigungucode] || "전국";

                    return (
                        <Box onClick={() => handleContent(item.contentid, item.contenttypeid, item.areacode, item.sigungucode, item.mapx, item.mapy)}
                             key={item.contentid}
                             src={item.firstimage}
                             alt={item.title}
                             title={item.title}
                             areacode={areacode}
                             sigungucode={sigungucode}
                             styles={boxStyles}/>
                        );
                })}
            </div>
            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={handlePageNumber}
            />
        </div>
    );
};

export default TripLocationList;
