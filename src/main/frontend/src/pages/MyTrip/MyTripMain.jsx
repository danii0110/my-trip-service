import styles from './MyTripMain.module.scss';
import Layout from '../../components/layouts/Layout';
import MyTripHeader from './MyTripHeader';
import MyTrip from './MyTrip';
import { useState } from 'react';
const MyTripMain = () => {
  const [selected, setSelected] = useState('myTrip');
  return (
    <Layout>
      <MyTripHeader />
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            className={`${styles.headerSub} ${selected === 'myTrip' ? styles.selected : ''}`}
            onClick={() => setSelected('myTrip')}
          >
            <button type='button'>My Trip</button>
            {selected === 'myTrip' && <hr className={styles.selectedHr} />}
          </div>
          <div
            className={`${styles.headerSub} ${selected === 'cart' ? styles.selected : ''}`}
            onClick={() => setSelected('cart')}
          >
            <button type='button'>장바구니</button>
            {selected === 'cart' && <hr className={styles.selectedHr} />}
          </div>
        </div>
        <MyTrip />
      </div>
    </Layout>
  );
};
export default MyTripMain;
