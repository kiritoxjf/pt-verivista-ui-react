import React, { useEffect, useState } from 'react';
import styles from './Blacklist.module.scss';
import { IReportForm, ISearchRes } from './Blacklist.interface';
import { getBlackApi, reportApi } from '@/services/api/blackListSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { setDefense } from '@/features/base/baseSlice';
import WaveCard from '../WaveCard/WaveCard';
import { TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { iError } from '@/interfaces/Common';
import RefreshOutlined from '@mui/icons-material/RefreshOutlined';

function Blacklist() {
  const dispatch = useAppDispatch();
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailString: string[] = ['邮', '箱'];
  const logged = useAppSelector((state) => state.user.logged);
  const defense = useAppSelector((state) => state.base.defense);
  const nowTime = useAppSelector((state) => state.base.nowTime);
  const [state, setState] = useState<'search' | 'report'>('search');
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [searchRes, setSearchRes] = useState<ISearchRes>();
  const [reportForm, setReportForm] = useState<IReportForm>({
    email: '',
    description: '',
  });
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // handleSearchChange 查人输入框变化
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchEmail(event.target.value);
    setSearchRes(undefined);
  }

  // handleReportChange 挂人输入框变化
  function handleReportChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case 'email':
        setReportForm({
          ...reportForm,
          email: event.target.value,
        });
        break;
      case 'description':
        console.log(event.target.name);
        console.log(event.target.value);
        setReportForm({
          ...reportForm,
          description: event.target.value,
        });
        break;
    }
  }
  // handleSearchSubmit 查人提交
  function handleSearchSubmit() {
    if (submitLoading) return;
    if (!emailReg.test(searchEmail)) {
      enqueueSnackbar('邮箱格式有误', { variant: 'warning' });
      return;
    }
    setSearchRes(undefined);
    setSubmitLoading(true);
    getBlackApi(searchEmail)
      .then((res) => {
        setSearchRes({
          black: res.black,
          total: res.total,
          email: res.email,
          description: res.description,
          date: res.date,
        });
        dispatch(
          setDefense({
            ...defense,
            search: new Date().getTime(),
          }),
        );
        setSubmitLoading(false);
      })
      .catch((err: iError) => {
        setSubmitLoading(false);
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  }

  // handleReportSubmit 挂人提交
  function handleReportSubmit() {
    if (submitLoading) return;
    if (!emailReg.test(reportForm.email)) {
      enqueueSnackbar('邮箱格式有误', { variant: 'warning' });
      return;
    }
    if (!/.{11,}/.test(reportForm.description)) {
      enqueueSnackbar('描述需要大于10个字哦~', { variant: 'warning' });
      enqueueSnackbar('如果可说的话，带上站点和用户名更有参考性哦~', { variant: 'warning' });
      return;
    }
    const json: IReportForm = {
      email: reportForm.email,
      description: reportForm.description,
    };
    setSubmitLoading(true);
    reportApi(json)
      .then(() => {
        enqueueSnackbar('挂人完成啦！', { variant: 'success' });
        dispatch(
          setDefense({
            ...defense,
            report: new Date().getTime(),
          }),
        );
        formClear();
        setState('search');
        setSubmitLoading(false);
      })
      .catch((err: iError) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setSubmitLoading(false);
      });
  }

  // formClear 表单清空
  function formClear() {
    setSearchEmail('');
    setSearchRes(undefined);
    setReportForm({
      email: '',
      description: '',
    });
  }

  // showRes 展示查人结果
  function showRes() {
    if (searchRes?.black !== undefined) {
      return (
        <div className={styles.playing}>
          <p>
            <span>结果：</span>
            {searchRes?.black ? (
              <span className={styles.red}>榜上有名</span>
            ) : (
              <span className={styles.green}>查无此人</span>
            )}
          </p>
          {searchRes?.black ? (
            <div>
              <p>
                <span>邮箱：</span>
                <span>{searchRes?.email}</span>
              </p>
              <p>
                <span>被挂次数：</span>
                <span>{searchRes?.total}</span>
              </p>
              <p>最近一次</p>
              <p>
                <span>描述：</span>
                <span title={searchRes.description}>{searchRes?.description?.substring(0, 32) + '...'}</span>
              </p>
              <p>
                <span>举报日期：</span>
                <span className={styles.smallRed}>{searchRes.date}</span>
              </p>
            </div>
          ) : null}
        </div>
      );
    }
  }

  useEffect(() => {
    formClear();
  }, [state]);

  return (
    <WaveCard className={styles.blacklist}>
      {logged ? (
        <div
          className={styles.switch}
          onClick={() => {
            setState(state === 'search' ? 'report' : 'search');
          }}
        >
          {state === 'search' ? '挂' : '查'}
        </div>
      ) : (
        <div />
      )}
      {state === 'search' ? (
        <div className={styles.search}>
          <div className={styles.content}>
            <div className={styles.title}>查人</div>
            <div className={styles.subtitle}>为反爬，20秒可查询一次</div>
            <div className={styles.email}>
              <input type="value" value={searchEmail} onChange={handleSearchChange} required />
              <label>
                {emailString.map((value, index) => (
                  <span style={{ transitionDelay: `${50 * index}ms` }} key={value}>
                    {value}
                  </span>
                ))}
              </label>
            </div>
            <div
              className={`${styles.btn} ${nowTime - defense.search < 60000 ? styles.passive : styles.active}`}
              onClick={handleSearchSubmit}
            >
              <span className={styles.text}>
                {nowTime - defense.search < 20000 ? 20 + Math.floor((defense.search - nowTime) / 1000) + 's' : '提交'}
              </span>
              {submitLoading ? <RefreshOutlined /> : null}
            </div>
            <div className={styles.info}>{showRes()}</div>
          </div>
        </div>
      ) : (
        <div className={styles.report}>
          <div className={styles.content}>
            <div className={styles.title}>挂人</div>
            <div className={styles.subtitle}>为反攻击，1小时可挂一人</div>
            <div className={styles.email}>
              <input type="value" name="email" value={reportForm.email} onChange={handleReportChange} required />
              <label>
                {emailString.map((value, index) => (
                  <span style={{ transitionDelay: `${50 * index}ms` }} key={value}>
                    {value}
                  </span>
                ))}
              </label>
            </div>
            <div className={styles.description}>
              <TextField
                label="描述"
                name="description"
                multiline
                rows={6}
                value={reportForm.description}
                onChange={handleReportChange}
              />
            </div>
            <div
              className={`${styles.btn} ${nowTime - defense.report < 60000 ? styles.passive : styles.active}`}
              onClick={handleReportSubmit}
            >
              <span className={styles.text}>
                {nowTime - defense.report < 3600000
                  ? 3600 + Math.floor((defense.report - nowTime) / 1000) + 's'
                  : '提交'}
              </span>
              {submitLoading ? <RefreshOutlined /> : null}
            </div>
          </div>
        </div>
      )}
    </WaveCard>
  );
}

export default Blacklist;
