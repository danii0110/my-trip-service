import styles from './Profile.module.scss';
import MyTripHeader from '../MyTripHeader';
import Layout from '../../../components/layouts/Layout';
import ProfileIcon from '../../../assets/profileIcon.svg';
import DeleteIdModal from './DeleteIdModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../modules/api/Login/userActions';
import axios from 'axios';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('User loaded from localStorage:', storedUser);
        if (storedUser) {
          const response = await axios.get(`http://localhost:8080/api/users/${storedUser.id}`);
          const userData = response.data;
          setNickname(userData.nickname);
          setOriginalNickname(userData.nickname);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

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
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.patch(`http://localhost:8080/api/users/${storedUser.id}`, { nickname });

      if (response.status === 200) {
        alert('닉네임이 저장되었습니다.');
        setOriginalNickname(nickname);
      } else {
        alert('닉네임 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating nickname:', error);
      alert('닉네임 저장 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem('user')).access_token;
      await axios.post(
        'http://localhost:8080/api/logout',
        { access_token: accessToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
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
            <div className={styles.userId}>{originalNickname}</div>
          </div>
          <div className={styles.main}>
            <div className={styles.profileExplan}>프로필 설정</div>
            <div className={styles.nicknameCont}>
              <label htmlFor='nickname' className={styles.labelTag}>
                닉네임
              </label>
              <input
                disabled
                type='text'
                id='nickname'
                className={styles.labelInput}
                onChange={handleNicknameChange}
                value={nickname}
              ></input>
            </div>
            {/* <div className={styles.emailCont}>
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
            </div> */}
            {/* <button className={styles.deleteId} onClick={handleButtonClick}>
              회원탈퇴
            </button> */}
            <button className={styles.logoutId} onClick={handleLogout}>
              로그아웃
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
