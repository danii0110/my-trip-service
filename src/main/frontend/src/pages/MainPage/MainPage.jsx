import Layout from '../../components/layouts/Layout';
import Search from "../../components/Element/Search";
import styles from "./MainPage.module.scss"
import ad1 from "../../mainImage/www.mytrip.com.png"
import ad2 from "../../mainImage/www.mytrip.com (1).png"
import ad3 from "../../mainImage/www.mytrip.com (3).png"
import ad4 from "../../mainImage/www.mytrip.com (5).png"
import React, {useEffect, useState} from "react";
import {fetchCommunityPosts} from "../Community/communityApi";
import CommunityBox from "../Community/CommunityBox";
import {getImageName} from "../../modules/utils/importImages";
import leftFill from "../../assets/leftFill.svg";
import rightFill from "../../assets/rightFill.svg";
import {useNavigate} from "react-router-dom";
import {PiUserCircle} from "react-icons/pi";
import axios from "axios";
import Box from "../../components/Element/Box";
import boxStyles from "../../components/Element/Box.module.scss";
import defaultImage from "../../assets/defaultImage.png";
import {KAKAO_AUTH_URL} from "../../modules/api/Login/OAuth";

function MainPage() {
    const [areaCode, setAreaCode] = useState(1);
    const [isLogIn, setIsLogIn] = useState(false);
    const [currentAd, setCurrentAd] = useState(0);
    const [areaList, setAreaList] = useState({});
    const [plan, setPlan] = useState(null);
    const [communityPosts, setCommunityPosts] = useState([]);
    const [locationList, setLocationList] = useState(null);
    const [eventList, setEventList] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const navigate = useNavigate();
    const userId = 1;

    const ads = [ad1, ad2, ad3, ad4];

    useEffect(() => {
        fetchPosts();
        fetchAreaName();
        fetchLocationList();
        fetchEventList();
        if (isLogIn) {
            fetchPlan(userId);
        }
    }, []);

    useEffect(()=> {
        fetchLocationList();
        fetchEventList();
    }, [areaCode]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAd((prevAd) => (prevAd + 1) % ads.length);
        }, 30000); // 30초마다 광고 변경
        return () => clearInterval(interval);
    }, [ads.length]);

    const handleDotClick = (index) => {
        setCurrentAd(index);
    };

    const handleContent = (areacode) => {
        setAreaCode(areacode);
    };

    const handleUserButtonClick = () => {
        navigate('/my-trip');
    }

    const handleTripButtonClick = (planId) => {
        navigate(`/my-trip`)
    }

    const handleNewTripButtonClick = () => {
        navigate('/planning');
    }

    const kakaoLoginHandler = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const handleBoxContent = (contentId, contentTypeId, areaCode, sigunguCode, mapX, mapY) => {
        // 버튼을 클릭할 때 검색 페이지로 이동하고 검색어를 URL에 추가
        navigate(`/location?contentId=${contentId}&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&mapX=${mapX}&mapY=${mapY}`);
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleNext = () => {
        if (currentSlide < 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const fetchPosts = async () => {
        try {
            const { data, total } = await fetchCommunityPosts(1, 2, "최신순", { month: '전체', region: '모든 지역' });
            setCommunityPosts(data);
        } catch (error) {
            console.error('Failed to fetch community posts', error);
        }
    };

    const fetchAreaName = async () => {
        try {
            const response = await axios.get('/area/areaCode');

            const areaSigunguMap = response.data.reduce((acc, curr) => {
                if (!acc[curr.areacode]) {
                    acc[curr.areacode] = {};
                }
                acc[curr.areacode][curr.sigungucode || '0'] = curr.name;
                return acc;
            }, {});
            setAreaList(areaSigunguMap);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPlan = async (userId) => {
        try {
            const response = await axios.get(`/api/plans/user/${userId}`);
            setPlan(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchLocationList = async () => {
        try {
            const response = await axios.get("/data/list", {
                params: {
                    apiUri: "/areaBasedList1",
                    pageNo: "1",
                    numOfRows: "4",
                    arrange: "R",
                    contentTypeId: "12",
                    areaCode: areaCode
                }
            });
            setLocationList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEventList = async () => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`

        try {
            const response = await axios.get("/data/list", {
                params: {
                    apiUri: "/searchFestival1",
                    pageNo: "1",
                    numOfRows: "4",
                    arrange: "D",
                    areaCode: areaCode,
                    eventStartDate: formattedDate
                }
            });
            setEventList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        const formattedYear = String(year).slice(-2); // 마지막 두 자리
        const formattedMonth = String(month).padStart(2, '0'); // 두 자리로 변환
        const formattedDay = String(day).padStart(2, '0'); // 두 자리로 변환

        return `${formattedYear}.${formattedMonth}.${formattedDay}`;
    };

    function CircleButton(props) {
        return (
            <div className={styles.circleButton}>
                <button
                    type='button'
                    key={props.name}
                    onClick={props.onClick}
                    className={props.isSelected ? styles.selected : ''}
                >
                    <img src={props.imageSrc} alt={props.name} />
                </button>
                <p>{props.name}</p>
            </div>
        );
    }

    const Carousel = () => {
        const renderLocationButtons = () => {
            const buttons = Object.keys(areaList)
                .map((areacode) => {
                    const locationName = areaList[areacode]["0"];
                    return (
                        <CircleButton
                            key={locationName}
                            name={locationName}
                            imageSrc={getImageName(locationName)}
                            onClick={() => handleContent(areacode, "0")}
                            isSelected={areaCode === areacode}
                        />
                    );
                })
                .filter((button) => button.props.name); // 이름이 있는 버튼만 반환

            const slides = [buttons.slice(0, 9), buttons.slice(8, 17)];
            return slides[currentSlide];
        };

        return (
            <div className={styles.carousel}>
                <div className={styles.regionButtons}>
                    {renderLocationButtons()}
                </div>
            </div>
        );
    };

    const areaName = areaList[areaCode] && areaList[areaCode]['0'] ? areaList[areaCode]['0'] : '서울';

    return (
        <Layout>
            <div className={styles.mainContainer}>
                <div className={styles.adSection}>
                    <img src={ads[currentAd]} alt="Advertisement"/>
                    <div className={styles.dots}>
                        {ads.map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.dot} ${currentAd === index ? styles.active : ''}`}
                                onClick={() => handleDotClick(index)}
                            ></span>
                        ))}
                    </div>
                </div>
                <div className={styles.searchSection}>
                    <Search/>
                </div>
                <div className={styles.mediumSection}>
                    <div className={styles.communityPostList}>
                        {communityPosts.map((post) => (
                            <CommunityBox
                                key={post.id}
                                id={post.id}
                                imageSrc={post.imageUrl}
                                userSrc={post.user.imageUrl}
                                userNickname={post.user}
                                areacode={post.areaCode}
                                sigungucode={post.sigunguCode}
                                year={post.year}
                                month={post.month}
                                title={post.title}
                                backgroundColor={"transparent"}
                                borderColor={"#8ea05d"}
                            />
                        ))}
                    </div>
                    <div className={styles.mediumRightSection}>
                        <div className={styles.userSection}>
                            <div className={styles.loginSection}>
                                {isLogIn ? (
                                    <>
                                        <div className={styles.user}>
                                            <PiUserCircle size="45px"/>
                                            <div className={styles.welcome}>
                                                <p>{`User`}님, </p>
                                                <p>환영합니다</p>
                                            </div>
                                        </div>
                                        <button
                                            className={styles.sectionButton}
                                            onClick={handleUserButtonClick}
                                        >
                                            마이페이지
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.user}>
                                            <PiUserCircle size="45px"/>
                                            <div className={styles.welcome}>
                                                <p>Welcome</p>
                                                <p>Guest :)</p>
                                            </div>
                                        </div>
                                        <button className={styles.sectionButton} onClick={kakaoLoginHandler}>로그인하기</button>
                                    </>
                                )}
                            </div>
                            <div className={styles.plan}>
                                {isLogIn && plan !== null ? (
                                    <div className={styles.planContainer}>
                                        <div className={styles.planDetail}>
                                            <div className={styles.planImage}>
                                                <img src={getImageName(plan.region.split(' ')[0]) || defaultImage}
                                                     alt={plan.title}/>
                                            </div>
                                            <div>
                                                <h3>{plan.region}</h3>
                                                <p>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</p>
                                            </div>
                                        </div>
                                        <button
                                            className={styles.sectionButton}
                                            onClick={() => handleTripButtonClick(plan.planId)}
                                        >
                                            일정 확인하기
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.noPlan}>
                                        <div>
                                            <p>예정된 여행이 존재하지 않습니다.</p>
                                            <p>나만의 여행을 만들어 볼까요?</p>
                                        </div>
                                        <button onClick={handleNewTripButtonClick}>+</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.weeklyTopPlace}>
                            <div className={styles.weeklyTopHeader}>
                            <p>Weekly Top Place</p>
                                <div className={styles.weeklyButtons}>
                                    <button type='button' className={styles.leftArrow} onClick={handlePrev}>
                                        <img src={leftFill} alt='leftArrow'/>
                                    </button>
                                    <button type='button' className={styles.rightArrow} onClick={handleNext}>
                                        <img src={rightFill} alt='rightArrow'/>
                                    </button>
                                </div>
                            </div>
                            <Carousel/>
                        </div>
                    </div>
                </div>
                <div className={styles.location}>
                    <div className={styles.locationHeader}>
                        <h3>{areaName} 추천 여행지</h3>
                    </div>
                    <div className={styles.locationList}>
                        {locationList
                            && locationList.response
                            && locationList.response.body
                            && locationList.response.body.items
                            && locationList.response.body.items.item.map((item) => {
                                const areacode = areaList[item.areacode]?.["0"] || "전국";
                                const sigungucode = areaList[item.areacode]?.[item.sigungucode] || "전국";

                                return (
                                    <Box
                                        onClick={() => handleBoxContent(item.contentid, item.contenttypeid, item.areacode, item.sigungucode, item.mapx, item.mapy)}
                                        key={item.contentid}
                                        src={item.firstimage}
                                        alt={item.title}
                                        title={item.title}
                                        areacode={areacode}
                                        sigungucode={sigungucode}
                                        styles={boxStyles}
                                        width="100%"
                                        margin="0"
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className={styles.location}>
                    <div className={styles.locationHeader}>
                        <h3>{areaName} 추천 행사</h3>
                    </div>
                    <div className={styles.locationList}>
                        {eventList
                            && eventList.response
                            && eventList.response.body
                            && eventList.response.body.items
                            && eventList.response.body.items.item.map((item) => {
                                const areacode = areaList[item.areacode]?.["0"] || "전국";
                                const sigungucode = areaList[item.areacode]?.[item.sigungucode] || "전국";

                                return (
                                    <Box
                                        onClick={() => handleBoxContent(item.contentid, item.contenttypeid, item.areacode, item.sigungucode, item.mapx, item.mapy)}
                                        key={item.contentid}
                                        src={item.firstimage}
                                        alt={item.title}
                                        title={item.title}
                                        areacode={areacode}
                                        sigungucode={sigungucode}
                                        styles={boxStyles}
                                        width="100%"
                                        margin="0"
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default MainPage;
