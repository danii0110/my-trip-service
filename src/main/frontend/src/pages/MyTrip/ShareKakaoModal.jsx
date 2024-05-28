import styles from './ShareKakaoModal.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const ShareKakaoModal = ({ show, onHide }) => {
  const [friends, setFriends] = useState([]);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    if (show) {
      fetchFriends();
      generateInviteLink();
    }
  }, [show]);

  const fetchFriends = async () => {
    try {
      //TODO: 수정
      // const response = await fetch('/api/friends'); // TODO: 수정
      // const data = await response.json();
      // setFriends(data);
      const mockData = [
        { nickname: 'user1' },
        { nickname: 'user2' },
        { nickname: 'user3' },
        { nickname: 'user4' },
        { nickname: 'user5' },
      ];
      setFriends(mockData);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const generateInviteLink = async () => {
    try {
      // TODO: 수정
      // const response = await fetch('/api/generateInviteLink', { method: 'POST' });
      // const data = await response.json();
      // setInviteLink(data.link);

      const mockLink = 'https://example.com/invite?planId=12345';
      setInviteLink(mockLink);
    } catch (error) {
      console.error('Error generating invite link:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        console.log(inviteLink);
        alert('초대링크가 복사되었습니다.');
      })
      .catch((error) => {
        console.error('Error copying link:', error);
      });
  };

  const handleDelete = async (nickname) => {
    try {
      //TODO: 수정
      // await fetch(`/api/deleteFriend?nickname=${nickname}`, { method: 'DELETE' }); //TODO: 수정
      setFriends(friends.filter((friend) => friend.nickname !== nickname));
    } catch (error) {
      console.error('Error deleting friend:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Body className={styles.customModalBody}>
          <div className={styles.title}>여행 이름</div>
          <div className={styles.subContainer}>
            <div className={styles.subTitle}>
              친구나 가족을 초대하여 여행 일정을 함께 계획할 수 있습니다. (최대 5명)
            </div>
            <div className={styles.btnsCont}>
              <button className={styles.inviteKakaoBtn}>카카오톡 초대</button>
              <button className={styles.copyLinkBtn} onClick={handleCopyLink}>
                초대링크 복사
              </button>
            </div>
          </div>
          <div className={styles.mainCont}>
            <div className={styles.mainTitle}>
              <div className={styles.mainTitleExplain}>공유된 친구</div>
              <div className={styles.shareNum}>{friends.length}</div>
            </div>
            <div className={friends.length > 3 ? styles.tableContainerScroll : styles.tableContainer}>
              <table className={styles.friendsTable}>
                <thead>
                  <tr>
                    <th>닉네임</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {friends.map((friend) => (
                    <tr key={friend.nickname}>
                      <td>{friend.nickname}</td>
                      <td>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(friend.nickname)}>
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.btnCont}>
            <button className={styles.okBtn}>확인</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ShareKakaoModal;
