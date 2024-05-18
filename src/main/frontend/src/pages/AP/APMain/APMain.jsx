import styles from './APMain.module.scss';
import Layout from '../../../components/layouts/Layout';
import APBgImg from '../../../assets/APBg.svg';
import { useState } from 'react';
import PickRegionModal from '../AP1_pickRegion/PickRegionModal';
import { Outlet, Route, Routes } from 'react-router-dom';
import DatePickerModal from '../AP2_timePicker/DatePicker/DatePickerModal';
import AP2Main from '../AP2_timePicker/AP2Main';

const APMain = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <img className={styles.APBgImg} src={APBgImg} alt='ai-planner background'></img>
          <button className={styles.makeBtn} onClick={handleButtonClick}>
            플랜 생성하기 -&gt;
          </button>
        </div>
      </Layout>
      <PickRegionModal show={showModal} onHide={() => setShowModal(false)} />
      {/* <Outlet />
      <Routes>
        <Route path='areaName' element={<AP2Main />}></Route>
      </Routes> */}
    </>
  );
};
export default APMain;
