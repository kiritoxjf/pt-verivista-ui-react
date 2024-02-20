import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useEffect } from 'react';
import { getDefense, record } from '@/services/api/baseSlice';
import { useAppDispatch } from '@/features/store';
import { setDefense, updateNowTime } from '@/features/base/baseSlice';
import { authInfo } from '@/services/api/userSlice';

const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 记录
    record().then(() => {
      // 获取上次敏感操作时间
      getDefense().then((res) => {
        dispatch(setDefense(res));
      });
    });
    // 验证Cookie获取用户信息
    const cookie = document.cookie;
    if (cookie.includes('verivista_token')) {
      authInfo(dispatch);
    }
    // 刷新当前时间定时器
    setInterval(() => {
      dispatch(updateNowTime());
    }, 1000);
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
