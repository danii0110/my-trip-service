import Layout from '../../components/layouts/Layout';
import PageInfo from "../../components/layouts/PageInfo";
import styles from "./CommunityMainPage.module.scss"
import {LuListFilter} from "react-icons/lu";
import {useEffect, useState} from "react";
import Pagination from "../../components/Element/Pagination";
import CommunityBox from "./CommunityBox";
import { fetchCommunityPosts } from "./communityApi";
import {getUnusedPlansByUserId} from "./communityPlanApi"
import axios from "axios";
import CommunityModal from "./CommunityModal";
import Carousel from "./Carousel";
import {getImageName} from "../../modules/utils/importImages";
import defaultImage from "../../assets/defaultImage.png";
import {useNavigate} from "react-router-dom";

const CommunityMainPage = () => {
    const [areaCode, setAreaCode] = useState(null);
    const [areaList, setAreaList] = useState({});
    const [selectedOrder, setSelectedOrder] = useState('최신순');
    const [selectedFilter, setSelectedFilter] = useState({ month: '전체', region: '모든 지역' });
    const [currentPage, setCurrentPage] = useState(1);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showRegionDropdown, setShowRegionDropdown] = useState(false);
    const [communityPosts, setCommunityPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [unusedPlans, setUnusedPlans] = useState([]);
    const dummyUserId = 1;
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(`.${styles.dropdown}`) &&
                !event.target.closest(`.${styles.regionDropdown}`) &&
                !event.target.closest(`.${styles.postModal}`)) {
                setShowDateDropdown(false);
                setShowRegionDropdown(false);
                setShowPlanModal(false);
            }
        };

        window.scrollTo({ top: 0, behavior: 'instant' });
        fetchAreaName();
        fetchUnusedPlans();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchPosts();
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentPage, selectedOrder, selectedFilter]);

    const fetchPosts = async () => {
        try {
            const { data, total } = await fetchCommunityPosts(currentPage, 12, selectedOrder, selectedFilter);
            setCommunityPosts(data);
            setTotalPages(Math.ceil(total / 12)); // assuming 10 posts per page
        } catch (error) {
            console.error('Failed to fetch community posts', error);
        }
    };

    const fetchAreaName = async () => {
        try {
            const response = await axios.get("/area/areaCode");
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

    const fetchUnusedPlans = async () => {
        try {
            const data = await getUnusedPlansByUserId(dummyUserId);
            setUnusedPlans(data);
        } catch (error) {
            console.error('Failed to fetch unused plans', error);
        }
    };

    const handlePlanPost = (planId) => {
        console.log(`Plan ID: ${planId}`);
        navigate(`/community/post?planId=${planId}`);
    }

    const handleOrderChange = (order) => {
        setSelectedOrder(order);
    };

    const handleFilterChange = (type, value, areacode) => {
        if (type === 'region') {
            // 지역이 변경되면 subRegion을 초기화
            setSelectedFilter((prev) => ({ ...prev, region: value, subRegion: '' }));
            setAreaCode(areacode);
        } else if (type === 'subRegion') {
            // subRegion이 선택되면 subRegion을 업데이트
            setSelectedFilter((prev) => ({ ...prev, subRegion: value }));
            setShowRegionDropdown(false);
        } else {
            // 기타 필터 변경
            setSelectedFilter((prev) => ({ ...prev, [type]: value }));
            setShowDateDropdown(false);
        }
    };

    const months = ['전체', ...Array.from({ length: 12 }, (_, i) => `${i + 1}월`)];

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        const formattedYear = String(year).slice(-2); // 마지막 두 자리
        const formattedMonth = String(month).padStart(2, '0'); // 두 자리로 변환
        const formattedDay = String(day).padStart(2, '0'); // 두 자리로 변환

        return `${formattedYear}.${formattedMonth}.${formattedDay}`;
    };

    return (
        <Layout>
            <PageInfo>
                <div className={styles.info}>
                    <h2>커뮤니티</h2>
                    <h3>나의 여행 플랜을 다른 사람들과 나누어보세요.</h3>
                    <button onClick={() => setShowPlanModal(true)}>게시글 생성하기 -></button>
                </div>
                {
                    showPlanModal && (
                        <CommunityModal
                            onClose={() => setShowPlanModal(false)}
                            width="500px"
                            height="300px"
                            size="30px"
                        >
                            <div className={styles.postModal}>
                                <h3>지난 여행</h3>
                                <div className={styles.carouselContainer}>
                                    <Carousel size="30px">
                                        {unusedPlans.map(plan => (
                                            <div className={styles.planContainer} key={plan.planId}
                                                 onClick={() => handlePlanPost(plan.planId)}
                                            >
                                                <div className={styles.planImage}>
                                                    <img src={getImageName(plan.region.split(' ')[0]) || defaultImage}
                                                         alt={plan.title}/>
                                                </div>
                                                <div className={styles.planInfo}>
                                                    <h3>{plan.region}</h3>
                                                    <p>{plan.title}</p>
                                                    <p>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </CommunityModal>
                    )
                }
            </PageInfo>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <div className={styles.orderButtons}>
                        {['최신순', '인기순', '조회순', '댓글순'].map((order) => (
                            <button
                                key={order}
                                className={selectedOrder === order ? styles.selected : ''}
                                onClick={() => handleOrderChange(order)}
                            >
                                {order}
                            </button>
                        ))}
                    </div>
                    <div className={styles.filterButtons}>
                        <div className={styles.filterDate}>
                            <button onClick={() => setShowDateDropdown(!showDateDropdown)}>
                                <LuListFilter size="20px"/>
                                날짜: {selectedFilter.month}
                            </button>
                            {showDateDropdown && (
                                <div className={styles.dropdown}>
                                    {months.map((month) => (
                                        <div
                                            key={month}
                                            className={selectedFilter.month === month ? styles.dropSelected : ''}
                                            onClick={() => handleFilterChange('month', month)}
                                        >
                                            {month}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.filterRegion}>
                            <button onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
                                <LuListFilter size="20px"/>
                                지역: {selectedFilter.region} {selectedFilter.subRegion}
                            </button>
                            {showRegionDropdown && (
                                <div className={styles.regionDropdown}>
                                    <div className={styles.regionList}>
                                        <div
                                            className={selectedFilter.region === '모든 지역' ? styles.dropSelected : ''}
                                            onClick={() => {handleFilterChange('region', '모든 지역', null); setShowRegionDropdown(false);}}
                                        >
                                            모든 지역
                                        </div>
                                        {Object.keys(areaList).map((areacode) => {
                                                const sigungucode = "0";
                                                let locationName = areaList[areacode][sigungucode];
                                                return (
                                                    <div
                                                        key={areacode}
                                                        className={selectedFilter.region === locationName ? styles.dropSelected : ''}
                                                        onClick={() => handleFilterChange('region', locationName, areacode)}
                                                    >
                                                        {locationName}
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                    {selectedFilter.region && selectedFilter.region !== '모든 지역' && (
                                        <div className={styles.subRegionList}>
                                            {Object.keys(areaList)
                                                .filter(areacode => areacode === areaCode)
                                                .map(areacode => (
                                                    Object.entries(areaList[areacode]).map(([sigungucode, name]) => (
                                                        <div
                                                            key={sigungucode}
                                                            className={selectedFilter.subRegion === (sigungucode === '0' ? '' : name) ? styles.dropSelected : ''}
                                                            onClick={() => handleFilterChange('subRegion', sigungucode === '0' ? '' : name)}
                                                        >
                                                            {sigungucode === '0' ? '전체' : name}
                                                        </div>
                                                    ))
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.postList}>
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
                        />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
            </div>
        </Layout>
    );
}

export default CommunityMainPage;