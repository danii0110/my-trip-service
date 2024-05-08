import styles from './PageModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Region from './Region';
import LeftArrow from '../../../assets/leftArrow.svg';
import RightArrow from '../../../assets/rightArrow.svg';
import AreaBtn from './AreaBtn';

const PageModal = ({ show, onHide }) => {
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
          <Button id={styles.nextBtn} className={styles.nextBtn} onClick={onHide}>
            다음 &gt;
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PageModal;
