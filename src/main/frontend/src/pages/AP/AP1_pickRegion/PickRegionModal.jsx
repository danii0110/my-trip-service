import { useState, useEffect } from 'react';
import styles from './PickRegionModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Region from './Region';
import LeftArrow from '../../../assets/leftArrow.svg';
import RightArrow from '../../../assets/rightArrow.svg';
import AreaBtn from './AreaBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 추가합니다.
import { getImageName } from '../../../modules/utils/importImages'; // getImageName 함수를 추가합니다.

const ITEMS_PER_PAGE = 9;

const PickRegionModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedAreaBtn, setSelectedAreaBtn] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [areaList, setAreaList] = useState({});

  // fetchAreaName 함수를 추가하여 백엔드에서 데이터를 가져옵니다.
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
      setRegions(Object.keys(areaSigunguMap).map((key) => areaSigunguMap[key]['0'])); // 지역명만 추출
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreaName(); // 컴포넌트가 처음 렌더링될 때 fetchAreaName을 호출합니다.
  }, []);

  const handleRegionClick = (index, regionName) => {
    setSelectedRegion(index);
    setSelectedAreaBtn(null);

    const selectedAreaCode = Object.keys(areaList).find((key) => areaList[key]['0'] === regionName);
    setAreas(areaList[selectedAreaCode] ? Object.values(areaList[selectedAreaCode]) : []);
  };

  const goToAP2 = () => {
    if (selectedAreaBtn !== null) {
      onHide();
      navigate('/planning/areaName');
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < regions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentRegions = regions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>여행할 지역을 설정하세요.</div>
          <div className={styles.regionCont}>
            <img
              className={`${styles.arrowBtn} ${currentPage === 0 ? styles.disabled : ''}`}
              src={LeftArrow}
              alt='left-arrow'
              onClick={handlePreviousPage}
            />
            {currentRegions.map((regionName, index) => (
              <Region
                key={index + startIndex}
                name={regionName}
                selected={selectedRegion === index + startIndex}
                imageSrc={getImageName(regionName)} // 이미지 경로를 추가합니다.
                onClick={() => handleRegionClick(index + startIndex, regionName)}
              />
            ))}
            <img
              className={`${styles.arrowBtn} ${
                (currentPage + 1) * ITEMS_PER_PAGE >= regions.length ? styles.disabled : ''
              }`}
              src={RightArrow}
              alt='right-arrow'
              onClick={handleNextPage}
            />
          </div>
          <div className={styles.regionSubCont}>
            {areas.map((areaName, index) => (
              <AreaBtn
                key={index}
                name={areaName}
                selected={selectedAreaBtn === index}
                onClick={() => setSelectedAreaBtn(index)}
              />
            ))}
          </div>
          <Button id={styles.nextBtn} className={styles.nextBtn} onClick={goToAP2} disabled={selectedAreaBtn === null}>
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PickRegionModal;
