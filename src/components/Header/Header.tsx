import { SvgIcon, SvgIconProps } from '@mui/material';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { login, logout } from '@/features/user/userSlice';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.user.logged);

  const handleSignClick = () => {
    if (logged) {
      goRouter('/');
      dispatch(logout());
    } else {
      goRouter('/sign-in');
      dispatch(login('kirito'));
    }
  };

  const goRouter = (url: string) => {
    navigate(url);
  };
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.nav_btn} onClick={() => goRouter('/')}>
          <HomeIcon className={styles.icon} color="primary" />
          <span>首页</span>
        </div>
        <div className={`${styles.avatar} ${logged ? styles.logged : ''}`} onClick={handleSignClick}></div>
      </div>
    </div>
  );
};

export default Header;
