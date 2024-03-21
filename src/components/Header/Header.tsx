import { SvgIcon, SvgIconProps, IconButton, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { logout } from '@/features/user/userSlice';
import { signOut } from '@/services/api/userSlice';
import React, { useState } from 'react';
import { Logout, Report } from '@mui/icons-material';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.nav_btn} onClick={() => navigate('/')}>
          <HomeIcon className={styles.icon} color="primary" />
          <span>首页</span>
        </div>
        {avatarEl()}
      </div>
    </div>
  );
};

const avatarEl = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logged = useAppSelector((state) => state.user.logged);
  const user = useAppSelector((state) => state.user.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    navigate('/');
    signOut().then(() => {
      dispatch(logout());
    });
  };

  const handleReport = () => {
    navigate('/report/' + btoa(user.email));
  };

  return (
    <div className={styles.operation}>
      {logged ? (
        <Tooltip title={user.email}>
          <IconButton
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <div className={styles.avatar}></div>
          </IconButton>
        </Tooltip>
      ) : (
        <div
          className={styles.login_btn}
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          登录
        </div>
      )}
      <Menu
        className={styles.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem className={styles.menuItem} onClick={handleReport}>
          <ListItemIcon>
            <Report fontSize="small" />
          </ListItemIcon>
          我的被挂
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          退出
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
