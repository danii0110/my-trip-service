import styles from './DeleteIdModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const DeleteIdModal = ({ show, onHide }) => {
  // 회원 탈퇴 로직을 처리하는 함수
  const handleAccountDeletion = () => {
    // 회원 삭제 로직 추가
    // 예: API 호출로 회원 삭제 요청
    // axios.delete('/api/user/delete').then(response => {
    //   // 성공적으로 회원 삭제 후 처리
    // }).catch(error => {
    //   // 에러 처리
    // });

    onHide();
    alert('회원 삭제 완료');
  };

  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>회원탈퇴</div>
          <div className={styles.explain}>회원 탈퇴 시 계정 정보 및 보유중인 여행 플랜은 삭제되어 복구가 불가해요.</div>
          <div className={styles.explain}>정말로 탈퇴하시겠어요?</div>
          <div className={styles.btns}>
            <button className={styles.cancelBtn} onClick={onHide}>
              취소
            </button>
            <button className={styles.deleteIdBtn} onClick={handleAccountDeletion}>
              탈퇴
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default DeleteIdModal;
