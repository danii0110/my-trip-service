import { useState, useEffect } from 'react';
import styles from './PickRegionModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Region from './Region';
import LeftArrow from '../../../assets/leftArrow.svg';
import RightArrow from '../../../assets/rightArrow.svg';
import AreaBtn from './AreaBtn';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getImageName } from '../../../modules/utils/importImages';
import regionMap from '../../../modules/utils/regionMap'; // regionMap import

const ITEMS_PER_PAGE = 9;

const PickRegionModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedAreaBtn, setSelectedAreaBtn] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [areaList, setAreaList] = useState({});

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
      setRegions(Object.keys(areaSigunguMap).map((key) => ({ code: key, name: regionMap[key] })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreaName();
  }, []);

  const handleRegionClick = (index, region) => {
    setSelectedRegion(region.code);
    setSelectedAreaBtn(null);
    setAreas(areaList[region.code] ? Object.entries(areaList[region.code]).filter(([key]) => key !== '0') : []);
  };

  const goToAP2 = () => {
    if (selectedAreaBtn !== null) {
      const selectedAreaName = areas[selectedAreaBtn][1];
      onHide();
      navigate('/planning/areaName', { state: { selectedRegion, selectedArea: selectedAreaName } });
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
            {currentRegions.map((region, index) => (
              <Region
                key={region.code}
                name={region.name}
                selected={selectedRegion === region.code}
                imageSrc={getImageName(region.name)}
                onClick={() => handleRegionClick(index + startIndex, region)}
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
            {areas.map(([code, areaName], index) => (
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
