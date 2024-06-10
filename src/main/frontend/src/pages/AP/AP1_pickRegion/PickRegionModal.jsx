import { useState, useEffect } from 'react';
import styles from './PickRegionModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Region from './Region';
import LeftArrow from '../../../assets/leftArrow.svg';
import RightArrow from '../../../assets/rightArrow.svg';
import AreaBtn from './AreaBtn';
import { useNavigate } from 'react-router-dom';

const mockRegions = [
  '서울',
  '광주',
  '인천',
  '대전',
  '대구',
  '부산',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];
const mockAreas = {
  서울: ['성북구', '중구', '강남구'],
  광주: ['동구', '서구', '남구'],
  인천: ['중구', '동구', '남동구'],
  대전: ['동구', '중구', '서구'],
  대구: ['중구', '동구', '서구'],
  부산: ['중구', '서구', '동구'],
  울산: ['중구', '남구', '동구'],
  세종: ['고운동', '아름동', '도담동'],
  경기: ['수원시', '성남시', '의정부시'],
  강원: ['춘천시', '원주시', '강릉시'],
  충북: ['청주시', '충주시', '제천시'],
  충남: ['천안시', '공주시', '보령시'],
  전북: ['전주시', '군산시', '익산시'],
  전남: ['목포시', '여수시', '순천시'],
  경북: ['포항시', '경주시', '김천시'],
  경남: ['창원시', '진주시', '통영시'],
  제주: ['제주시', '서귀포시'],
};

const ITEMS_PER_PAGE = 9;

const PickRegionModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedAreaBtn, setSelectedAreaBtn] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Use mock data for regions
    setRegions(mockRegions);
  }, []);

  const handleRegionClick = (index, regionName) => {
    setSelectedRegion(index);
    setSelectedAreaBtn(null);

    // Use mock data for areas based on selected region
    setAreas(mockAreas[regionName] || []);
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
