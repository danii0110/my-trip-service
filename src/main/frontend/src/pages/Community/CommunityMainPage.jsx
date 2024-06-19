import Layout from '../../components/layouts/Layout';
import PageInfo from "../../components/layouts/PageInfo";
import styles from "./CommunityMainPage.module.scss"
import {LuListFilter} from "react-icons/lu";
import {useEffect, useState} from "react";
import Pagination from "../../components/Element/Pagination";
import CommunityBox from "./CommunityBox";
import { fetchCommunityPosts } from "./communityApi";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CommunityMainPage = () => {
    const [areaCode, setAreaCode] = useState(null);
    const [areaList, setAreaList] = useState({});
    const [selectedOrder, setSelectedOrder] = useState('최신순');
    const [selectedFilter, setSelectedFilter] = useState({ month: '전체', region: '모든 지역' });
    const [currentPage, setCurrentPage] = useState(1);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showRegionDropdown, setShowRegionDropdown] = useState(false);
    const [communityPosts, setCommunityPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/community/post`);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(`.${styles.dropdown}`) &&
                !event.target.closest(`.${styles.regionDropdown}`)) {
                setShowDateDropdown(false);
                setShowRegionDropdown(false);
            }
        };

        fetchAreaName();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [currentPage, selectedOrder, selectedFilter]);

    const fetchPosts = async () => {
        try {
            const { data, total } = await fetchCommunityPosts(currentPage, selectedOrder, selectedFilter);
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

    const handleOrderChange = (order) => {
        setSelectedOrder(order);
    };

    const handleFilterChange = (type, value, areacode) => {
        setSelectedFilter((prev) => ({ ...prev, [type]: value, ...(type === 'region' && { subRegion: '' }) }));
        setAreaCode(areacode);
    };

    const months = ['전체', ...Array.from({ length: 12 }, (_, i) => `${i + 1}월`)];

    return (
        <Layout>
            <PageInfo>
                <div className={styles.info}>
                    <h2>커뮤니티</h2>
                    <h3>나의 여행 플랜을 다른 사람들과 나누어보세요.</h3>
                    <button onClick={handleClick}>게시글 생성하기 -></button>
                </div>
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
                                        <div key={month} onClick={() => { handleFilterChange('month', month); setShowDateDropdown(false); }}>{month}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.filterRegion}>
                            <button onClick={() => setShowRegionDropdown(!showRegionDropdown)}>
                                <LuListFilter size="20px"/>
                                지역: {selectedFilter.region} {selectedFilter.subRegion}
                            </button>
                        </div>
                    </div>
                </div>
                {showRegionDropdown && (
                    <div className={styles.regionDropdown}>
                        <div className={styles.regionList}>
                            {Object.keys(areaList).map((areacode) => {
                                const sigungucode = "0";
                                let locationName = areaList[areacode][sigungucode];
                                return (
                                    <div key={areacode} onClick={() => handleFilterChange('region', locationName, areacode)}>{locationName}</div>
                                )}
                            )}
                        </div>
                        {selectedFilter.region && selectedFilter.region !== '모든 지역' && (
                            <div className={styles.subRegionList}>
                                {Object.keys(areaList)
                                    .filter(areacode => areacode === areaCode)
                                    .map(areacode => (
                                        Object.entries(areaList[areacode]).map(([sigungucode, name]) => (
                                            <div key={sigungucode} onClick={() => handleFilterChange('subregion', name, null)}>
                                                {name}
                                            </div>
                                        ))
                                    ))}
                            </div>
                        )}
                    </div>
                )}
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