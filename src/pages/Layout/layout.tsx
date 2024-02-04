import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useEffect } from 'react';
import { getLastTime } from '@/services/api/baseSlice';
import { useAppDispatch } from '@/features/store';
import { setLastTime } from '@/features/base/baseSlice';
import { authInfo } from '@/services/api/userSlice';

const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLastTime().then((res) => {
      dispatch(setLastTime(new Date(res.lastTime).getTime()));
    });
  }, []);

  useEffect(() => {
    const cookie = document.cookie;
    if (cookie.includes('verivista_token')) {
      authInfo(dispatch);
    }
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
