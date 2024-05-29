import styles from './Profile.module.scss';
import MyTripHeader from '../MyTripHeader';
import Layout from '../../../components/layouts/Layout';
import ProfileIcon from '../../../assets/profileIcon.svg';
import DeleteIdModal from './DeleteIdModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState('user70887675');
  const [originalNickname] = useState('user70887675'); // 백엔드에서 가져온 초기 닉네임
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  const handleSaveBtnClick = async () => {
    if (nickname === originalNickname) {
      alert('닉네임이 변경되지 않았습니다.');
      return;
    }

    try {
      const response = await fetch('/api/updateNickname', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });

      if (response.ok) {
        alert('닉네임이 저장되었습니다.');
      } else {
        alert('닉네임 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating nickname:', error);
      alert('닉네임 저장 중 오류가 발생했습니다.');
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  return (
    <>
      <Layout>
        <MyTripHeader />
        <div className={styles.container}>
          <div className={styles.header}>
            <img className={styles.profileIcon} src={ProfileIcon} alt='profile-icon' />
            <div className={styles.userId}>user70887675</div>
          </div>
          <div className={styles.main}>
            <div className={styles.profileExplan}>프로필 설정</div>
            <div className={styles.nicknameCont}>
              <label htmlFor='nickname' className={styles.labelTag}>
                닉네임
              </label>
              <input
                type='text'
                id='nickname'
                className={styles.labelInput}
                onChange={handleNicknameChange}
                placeholder='user70887675'
              ></input>
            </div>
            <div className={styles.emailCont}>
              <label htmlFor='email' className={styles.labelTag}>
                이메일
              </label>
              <input
                disabled
                type='email'
                id='email'
                className={styles.labelInput}
                placeholder='user7088@naver.com'
              ></input>
            </div>
            <button className={styles.deleteId} onClick={handleButtonClick}>
              회원탈퇴
            </button>
          </div>
          <div className={styles.btnCont}>
            <button className={styles.btn} onClick={handleBackBtnClick}>
              돌아가기
            </button>
            <button
              className={`${styles.btn} ${nickname !== originalNickname ? styles.save : ''}`}
              onClick={handleSaveBtnClick}
            >
              저장
            </button>
          </div>
        </div>
      </Layout>
      <DeleteIdModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};
export default Profile;
