import { useState } from 'react';
import styles from './PickRegionModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Region from './Region';
import LeftArrow from '../../../assets/leftArrow.svg';
import RightArrow from '../../../assets/rightArrow.svg';
import AreaBtn from './AreaBtn';
import { useNavigate } from 'react-router-dom';

const PickRegionModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedAreaBtn, setSelectedAreaBtn] = useState(null);

  const goToAP2 = () => {
    onHide();
    navigate('/planning/areaName');
  };

  const regions = Array(9).fill('지역명'); // 예시 데이터로 9개의 지역명

  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>여행할 지역을 설정하세요.</div>
          <div className={styles.regionCont}>
            <img className={styles.arrowBtn} src={LeftArrow} alt='left-arrow' />
            {regions.map((regionName, index) => (
              <Region
                key={index}
                name={regionName}
                selected={selectedRegion === index}
                onClick={() => setSelectedRegion(index)}
              />
            ))}
            <img className={styles.arrowBtn} src={RightArrow} alt='right-arrow' />
          </div>
          <div className={styles.regionSubCont}>
            {regions.map((areaName, index) => (
              <AreaBtn
                key={index}
                name={areaName}
                selected={selectedAreaBtn === index}
                onClick={() => setSelectedAreaBtn(index)}
              />
            ))}
          </div>
          <Button id={styles.nextBtn} className={styles.nextBtn} onClick={goToAP2}>
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PickRegionModal;
