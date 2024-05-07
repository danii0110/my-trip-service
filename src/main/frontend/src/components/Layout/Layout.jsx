import styles from './Layout.module.scss';
import { Router } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
