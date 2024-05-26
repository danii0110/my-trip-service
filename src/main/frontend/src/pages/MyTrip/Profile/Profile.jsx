import styles from './Profile.module.scss';
import MyTripHeader from '../MyTripHeader';
import Layout from '../../../components/layouts/Layout';
import ProfileIcon from '../../../assets/profileIcon.svg';

const Profile = () => {
  return (
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
            <label>닉네임</label>
            <input type='text'></input>
          </div>
          <div className={styles.emailCont}>
            <label>이메일</label>
            <input disabled type='email'></input>
          </div>
        </div>
        <div className='styles.deleteId'>회원탈퇴</div>
        <div className={styles.btnCont}></div>
      </div>
    </Layout>
  );
};
export default Profile;
