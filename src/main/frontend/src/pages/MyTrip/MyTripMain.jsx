import styles from './MyTripMain.module.scss';
import Layout from '../../components/layouts/Layout';
import MyTripHeader from './MyTripHeader';
import MyTrip from './MyTrip';
import { useState } from 'react';
import Cart from './Cart';
const MyTripMain = () => {
  const [view, setView] = useState('mytrip');
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
            <button type='button' onClick={() => setView('mytrip')}>
              My Trip
            </button>
            {selected === 'myTrip' && <hr className={styles.selectedHr} />}
          </div>
          <div
            className={`${styles.headerSub} ${selected === 'cart' ? styles.selected : ''}`}
            onClick={() => setSelected('cart')}
          >
            <button type='button' onClick={() => setView('cart')}>
              나의 여행 도시 목록
            </button>
            {selected === 'cart' && <hr className={styles.selectedHr} />}
          </div>
        </div>
        {view === 'mytrip' && <MyTrip />}
        {view === 'cart' && <Cart />}
      </div>
    </Layout>
  );
};
export default MyTripMain;
