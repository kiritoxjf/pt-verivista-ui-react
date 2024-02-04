import styles from './SignIn.module.scss';
import WaveCard from '../../../components/WaveCard/WaveCard';
import React, { useState } from 'react';
import { Button, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { iSignInForm } from '@/interfaces/Sign';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { authInfo, signIn } from '@/services/api/userSlice';
import { iError } from '@/interfaces/Common';
import { useAppDispatch } from '@/features/store';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signLoading, setSignLoading] = useState<boolean>(false);
  const [inForm, setInForm] = useState<iSignInForm>({
    email: '',
    password: '',
    showPwd: false,
  });

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwdReg = /^[A-Za-z](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

  // handleFormChange Form表单参数变化
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'email':
        setInForm({
          ...inForm,
          email: event.target.value,
        });
        break;
      case 'password':
        setInForm({
          ...inForm,
          password: event.target.value,
        });
        break;
    }
  };

  // toggleShowPwd 密码可见
  const toggleShowPwd = () => {
    setInForm({
      ...inForm,
      showPwd: !inForm.showPwd,
    });
  };

  // formTest 正则校验
  const formTest = (key: 'email' | 'password'): boolean => {
    switch (key) {
      case 'email':
        if (!emailReg.test(inForm.email)) {
          enqueueSnackbar('邮箱是不是写错了诶', { variant: 'error' });
          return false;
        }
        break;
      case 'password':
        if (!pwdReg.test(inForm.password)) {
          enqueueSnackbar('密码复杂度不够哦（8位以上，字母+数字）', { variant: 'error' });
          return false;
        }
        break;
    }
    return true;
  };
  // signSubmit 登陆
  const signSubmit = () => {
    if (!formTest('email')) return;
    if (!formTest('password')) return;
    setSignLoading(true);
    const json = {
      email: inForm.email,
      password: inForm.password,
    };
    signIn(json)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: 'success' });
        setSignLoading(false);
        navigate('/');
        authInfo(dispatch);
      })
      .catch((err: iError) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setSignLoading(false);
      });
  };

  return (
    <div className={styles.sign}>
      <WaveCard>
        <div className={styles.sign_in}>
          <div className={styles.title}>登陆</div>
          <Box className={styles.form} component="form" noValidate autoComplete="off">
            <TextField
              className={`${styles.input}`}
              fullWidth
              name="email"
              label="邮箱"
              autoComplete="email"
              onChange={handleFormChange}
              variant="standard"
            />
            <TextField
              className={`${styles.input}`}
              fullWidth
              type={inForm.showPwd ? 'text' : 'password'}
              name="password"
              label="密码"
              variant="standard"
              value={inForm.password}
              autoComplete="current-password"
              onChange={handleFormChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPwd}
                      onMouseDown={(event) => event.preventDefault()} // 防止焦点被移动
                      edge="end"
                      title="显示/隐藏密码"
                    >
                      {inForm.showPwd ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {signLoading ? (
            <LoadingButton loading variant="contained" loadingPosition="end" className={styles.btn}>
              登陆
            </LoadingButton>
          ) : (
            <div className={styles.btn}>
              <Button fullWidth variant="contained" onClick={signSubmit} title="确认登陆">
                登陆
              </Button>
            </div>
          )}

          <div className={styles.btn}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate('/sign-on');
              }}
            >
              注册
            </Button>
          </div>
        </div>
      </WaveCard>
    </div>
  );
};

export default SignIn;
