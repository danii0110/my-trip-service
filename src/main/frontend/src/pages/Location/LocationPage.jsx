import styles from './LocationPage.module.scss';
import Layout from "../../components/layouts/Layout";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import DetailInfo from "./LocationDetailInfo";
import LocationDetailImage from "./LocationDetailImage";
import Box from "../../components/Element/Box";
import boxStyle from "./LocationBox.module.scss"

const LocationPage = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const contentId = searchParams.get("contentId");
    const contentTypeId = searchParams.get("contentTypeId");
    const areaCode = searchParams.get("areaCode");
    const sigunguCode = searchParams.get("sigunguCode");
    const mapX = searchParams.get("mapX");
    const mapY = searchParams.get("mapY");

    const [common, setCommon] = useState(null);
    const [intro, setIntro] = useState(null);
    const [image, setImage] = useState(null);
    const [areaList, setAreaList] = useState(null);
    const [location, setLocaiton] = useState(null);

    const handleContent = (contentId, contentTypeId, areaCode, sigunguCode, mapX, mapY) => {
        // 버튼을 클릭할 때 검색 페이지로 이동하고 검색어를 URL에 추가
        navigate(`/location?contentId=${contentId}&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&mapX=${mapX}&mapY=${mapY}`);
    };

    const handleButton = () => {
        navigate("/planning");
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    };

    const fetchLocation = async () => {
        try {
            const [response1,
                response2,
                response3,
                response4,
                response5] = await Promise.all([
                axios.get("data/list", {
                    params: {
                        apiUri: "/detailCommon1",
                        pageNo: "1",
                        numOfRows: "10",
                        contentId: contentId,
                        defaultYN: "Y",
                        firstImageYN :"Y",
                        areacodeYN: "Y",
                        addrinfoYN: "Y",
                        mapinfoYN: "Y",
                        overviewYN: "Y"
                    }
                }),
                axios.get("area/areaCode", {
                    params: {
                        areaCode: areaCode
                    }
                }),
                axios.get("data/dataDetail", {
                    params: {
                        apiUri: "/detailIntro1",
                        pageNo: "1",
                        numOfRows: "10",
                        contentId: contentId,
                        contentTypeId: contentTypeId
                    }
                }),
                axios.get("data/list", {
                    params: {
                        apiUri: "/detailImage1",
                        pageNo: "1",
                        numOfRows: "100",
                        contentId: contentId,
                        imageYN: "Y",
                        subImageYN: "Y"
                    }
                }),
                (mapX && mapY) ? axios.get("data/list", {
                    params: {
                        apiUri: "/locationBasedList1",
                        pageNo: "2",
                        numOfRows: "4",
                        arrange: "S",
                        contentTypeId: "12",
                        mapX: mapX,
                        mapY: mapY,
                        radius: "100000"
                    }
                }) : axios.get("data/list", {
                    params: {
                        apiUri: "/areaBasedList1",
                        pageNo: "1",
                        numOfRows: "4",
                        arrange: "D",
                        contentTypeId: "12",
                        areaCode: areaCode,
                        sigunguCode: sigunguCode
                    }
                })
            ]); // 백엔드 서버의 엔드포인트로 요청을 보냅니다.

            const areaSigungu = response2.data.reduce((acc, curr) => {
                if (!acc[curr.areacode]) {
                    acc[curr.areacode] = {};
                }
                acc[curr.areacode][curr.sigungucode || '0'] = curr.name;
                return acc;
            }, {});
            setAreaList(areaSigungu);

            setCommon(response1.data); // 응답 데이터를 상태에 설정합니다.
            setIntro(response3.data);
            setImage(response4.data);
            setLocaiton(response5.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
       fetchLocation();
       window.scrollTo({
           top: 0,
           behavior: "instant"
       })
    }, [contentId]);

    const item = common?.response?.body?.items?.item[0];
    const detail = intro?.response?.body?.items?.item[0];

    return (
        <Layout>
            <div className={styles.content}>
                {item && (
                    <div className={styles.title}>
                        <h1>{item.title}</h1>
                        <h3>{areaList[areaCode]?.["0"] || "전국"} {areaList[areaCode]?.[sigunguCode] || "전국"}</h3>
                    </div>
                )}
                {item && (
                    <div className={styles.image}>
                        <LocationDetailImage image={image} common={item}/>
                    </div>
                )}
                {item && (
                    <div className={styles.summary}>
                    <h2>상세 정보</h2>
                    <p>{item.overview.replace(/<br\s*\/?>/g, '\n')}</p>
                    <hr/>
                </div>
                )}
                <div className={styles.description}>
                    <h2>상세 설명</h2>
                    <div className={styles.map}>

                    </div>
                    {detail && item && <DetailInfo detail={detail} item={item} />}
                    <div className={styles.tag}></div>
                    <hr/>
                </div>
                <div className={styles.recommend}>
                    <h2>여행지 추천</h2>
                    <div className={styles.recommendContainer}>
                        <div className={styles.location}>
                            {location
                                && location.response
                                && location.response.body
                                && location.response.body.items
                                && location.response.body.items.item.map((item) => {
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
                                             styles={boxStyle}/>
                                    );
                                })}
                        </div>
                        <div className={styles.course}>
                            <p>여행을 계획 중이신가요?</p>
                            <h3>나만의 코스를<br/> 생성해보세요</h3>
                            <button onClick={handleButton}>나만의 여행 생성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default LocationPage;