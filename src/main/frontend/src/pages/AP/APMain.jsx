import styles from './APMain.module.scss';
import Layout from '../../components/Layout/Layout';
import APBgImg from '../../assets/APBg.svg';
import { useState } from 'react';

const APMain = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <img className={styles.APBgImg} src={APBgImg} alt='ai-planner background'></img>
        <button className={styles.makeBtn} type='button'>
          플랜 생성하기 -&gt;
        </button>
      </div>
    </Layout>
  );
};
export default APMain;
