import styles from './APMain.module.scss';
import Layout from '../../../components/layouts/Layout';
import APBgImg from '../../../assets/APBg.svg';
import { useState } from 'react';
import PickRegionModal from '../AP1_pickRegion/PickRegionModal';
import { Outlet } from 'react-router-dom';

const APMain = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <img className={styles.APBgImg} src={APBgImg} alt='ai-planner background'></img>
          <button className={styles.makeBtn} type='button' onClick={() => setShowModal(true)}>
            플랜 생성하기 -&gt;
          </button>
        </div>
      </Layout>
      {/* <PickRegionModal show={showModal} onHide={() => setShowModal(false)} /> */}
      <PickRegionModal show={showModal} onHide={() => setShowModal(false)} />
      <Outlet />
    </>
  );
};
export default APMain;
