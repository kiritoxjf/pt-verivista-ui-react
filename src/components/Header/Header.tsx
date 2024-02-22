import { SvgIcon, SvgIconProps } from '@mui/material';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { logout } from '@/features/user/userSlice';
import { signOut } from '@/services/api/userSlice';

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
  const user = useAppSelector((state) => state.user.user);

  const handleSignClick = () => {
    if (logged) {
      navigate('/');
      signOut().then(() => {
        dispatch(logout());
      });
    } else {
      navigate('/sign-in');
    }
  };
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.nav_btn} onClick={() => navigate('/')}>
          <HomeIcon className={styles.icon} color="primary" />
          <span>首页</span>
        </div>
        <div
          className={`${styles.avatar} ${logged ? styles.logged : ''}`}
          onClick={handleSignClick}
          title={user.email}
        ></div>
      </div>
    </div>
  );
};

export default Header;
