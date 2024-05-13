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
  // const [showDatePickerModal, setShowDatePickerModal] = useState(false);

  // 다음 버튼 클릭 시 DatePickerModal 페이지로 이동하는 함수
  const goToAP2 = () => {
    onHide();
    navigate('/ai-planner/areaName');
    // setShowDatePickerModal(true);
  };
  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>여행할 지역을 설정하세요.</div>
          <div className={styles.regionCont}>
            <img className={styles.arrowBtn} src={LeftArrow} alt='left-arrow' />
            <Region />
            <Region />
            <Region />
            <Region />
            <Region />
            <Region />
            <Region />
            <Region />
            <Region />
            <img className={styles.arrowBtn} src={RightArrow} alt='right-arrow' />
          </div>
          <div className={styles.regionSubCont}>
            <AreaBtn />
            <AreaBtn />
            <AreaBtn />
            <AreaBtn />
            <AreaBtn />
            <AreaBtn />
            <AreaBtn />
          </div>
          <Button id={styles.nextBtn} className={styles.nextBtn} onClick={goToAP2}>
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
      {/* <DatePickerModal show={showDatePickerModal} onHide={() => setShowDatePickerModal(false)} /> */}
    </div>
  );
};
export default PickRegionModal;
