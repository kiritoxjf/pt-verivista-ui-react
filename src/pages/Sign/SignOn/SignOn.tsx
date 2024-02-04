import styles from './SignOn.module.scss';
import WaveCard from '../../../components/WaveCard/WaveCard';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { VisibilityOff, Visibility, Autorenew } from '@mui/icons-material';
import { iSignOnForm } from '@/interfaces/Sign';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { setLastTime } from '@/features/base/baseSlice';
import { useSnackbar } from 'notistack';
import { authInfo, sendSignCode, signOn } from '@/services/api/userSlice';
import { iError } from '@/interfaces/Common';

const SignOn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const lastTime = useAppSelector((state) => state.base.lastTime);
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [signLoading, setSignLoading] = useState<boolean>(false);
  const [remainTime, setRemainTime] = useState<number>(0);
  const [inForm, setInForm] = useState<iSignOnForm>({
    email: '',
    password: '',
    confirm: '',
    showPwd: false,
    code: '',
  });

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwdReg = /^[A-Za-z](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
  const codeReg = /^\d{6}$/;

  let remainTimeout: NodeJS.Timeout;

  useEffect(() => {
    clearInterval(remainTimeout);
    if (new Date().getTime() - new Date(lastTime).getTime() < 60000) {
      remainTimeout = setInterval(() => {
        const curr = new Date().getTime();
        const last = new Date(lastTime).getTime();
        const diff = last + 60000 - curr;
        if (diff <= 0) {
          clearInterval(remainTimeout);
        }
        setRemainTime(diff);
      }, 1000);
    } else {
      clearInterval(remainTimeout);
    }
  }, [lastTime]);

  // 邮箱验证码发送
  const toggleSend = () => {
    if (remainTime > 0 || sendLoading) {
      enqueueSnackbar('别点啦，还不能操作第二次哦！', { variant: 'warning' });
      return;
    }
    if (!formTest('email')) return;
    setSendLoading(true);
    const json = {
      email: inForm.email,
    };
    sendSignCode(json)
      .then(() => {
        enqueueSnackbar('验证码已发送哦宝~检查下你的邮箱呢~', {
          variant: 'success',
        });
        setSendLoading(false);
        dispatch(setLastTime(new Date().getTime()));
      })
      .catch((err) => {
        setSendLoading(false);
        enqueueSnackbar(err.message ? err.message : '验证码发送失败！请联系管理员哦宝~', { variant: 'warning' });
      });
  };

  // formTest 正则校验
  const formTest = (key: 'email' | 'password' | 'confirm' | 'code'): boolean => {
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
      case 'confirm':
        if (inForm.password !== inForm.confirm) {
          enqueueSnackbar('两次输入的密码咋不一样呢', { variant: 'error' });
          return false;
        }
        break;
      case 'code':
        if (!codeReg.test(inForm.code)) {
          enqueueSnackbar('不要搞事哦小老弟', { variant: 'error' });
          return false;
        }
        break;
    }
    return true;
  };

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
      case 'confirm':
        setInForm({
          ...inForm,
          confirm: event.target.value,
        });
        break;
      case 'code':
        setInForm({
          ...inForm,
          code: event.target.value,
        });
        break;
    }
  };

  // toggleShowPwd 密码可视
  const toggleShowPwd = () => {
    setInForm({
      ...inForm,
      showPwd: !inForm.showPwd,
    });
  };

  // signSubmit 注册
  const signSubmit = () => {
    if (!formTest('email')) return;
    if (!formTest('password')) return;
    if (!formTest('confirm')) return;
    if (!formTest('code')) return;
    const json = {
      email: inForm.email,
      password: inForm.password,
      code: inForm.code,
    };
    setSignLoading(true);
    signOn(json)
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
        <div className={styles.sign_on}>
          <div className={styles.title}>注册</div>
          <Box className={styles.form} component="form" noValidate autoComplete="off">
            <TextField
              className={`${styles.input}`}
              fullWidth
              label="邮箱"
              variant="standard"
              name="email"
              value={inForm.email}
              autoComplete="email"
              onChange={handleFormChange}
            />
            <TextField
              className={`${styles.input}`}
              fullWidth
              type={inForm.showPwd ? 'text' : 'password'}
              label="密码"
              variant="standard"
              name="password"
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
            <TextField
              className={`${styles.input}`}
              fullWidth
              type={inForm.showPwd ? 'text' : 'password'}
              label="确认密码"
              variant="standard"
              name="confirm"
              value={inForm.confirm}
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
            <TextField
              className={`${styles.input}`}
              fullWidth
              label="验证码"
              variant="standard"
              name="code"
              value={inForm.code}
              onChange={handleFormChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleSend}
                      edge="end"
                      style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}
                      title="发送验证码"
                    >
                      {remainTime > 0 ? (
                        Math.floor(remainTime / 1000) + 's'
                      ) : (
                        <Autorenew className={`${sendLoading ? styles.loading : ''}`} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {signLoading ? (
            <LoadingButton loading variant="contained" loadingPosition="end" className={styles.btn}>
              确认
            </LoadingButton>
          ) : (
            <div className={styles.btn}>
              <Button fullWidth variant="contained" onClick={signSubmit} title="确认注册">
                确认
              </Button>
            </div>
          )}

          <div className={styles.btn}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate('/sign-in');
              }}
              title="返回登录"
            >
              登陆
            </Button>
          </div>
        </div>
      </WaveCard>
    </div>
  );
};

export default SignOn;
