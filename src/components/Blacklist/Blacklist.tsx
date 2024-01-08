import React, { useEffect, useState } from 'react';
import styles from './Blacklist.module.scss';
import { SearchRes } from './Blacklist.interface';
import { getLastTime } from '@/services/api/baseSlice';
import { getBlackApi } from '@/services/api/blackListSlice';
function Blacklist() {
  const emailString: string[] = ['E', 'm', 'a', 'i', 'l'];
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [searchRes, setSearchRes] = useState<SearchRes>();
  const [remainTime, setRemainTime] = useState<number>(0);
  const [formatRemain, setFormatRemain] = useState<string>('');
  const [lastTime, setLastTime] = useState<string>('');
  let remainTimeout: NodeJS.Timeout;
  // let lastTime: string = '';

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

  useEffect(() => {
    const minutes = Math.floor(remainTime / 60000);
    const seconds = Math.floor((remainTime % 60000) / 1000);
    setFormatRemain(minutes + ':' + (seconds < 10 ? 0 : '') + seconds);
  }, [remainTime]);

  useEffect(() => {
    getLastTime().then((res) => {
      setLastTime(res.lastTime);
    });
  }, []);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchEmail(event.target.value);
  }

  function handleSearchSubmit() {
    if (remainTime > 0 || searchEmail === '') return;
    setSearchRes(undefined);
    getBlackApi(searchEmail)
      .then((res) => {
        setSearchRes({
          black: res.black,
          email: res.email,
          reporter: res.reporter,
          description: res.description,
          date: res.date,
        });
        if (res.lastTime) setLastTime(res.lastTime);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showRes() {
    if (searchRes?.black !== undefined) {
      return (
        <div className={styles.playing}>
          <p>
            <span>结果：</span>
            {searchRes?.black ? (
              <span className={styles.red}>
                榜上有名
              </span>
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
                <span>描述：</span>
                <span title={searchRes.description}>{searchRes?.description?.substring(0, 32) + '...'}</span>
              </p>
              <p>
                <span>举报日期：</span>
                <span className={styles.smallRed}>{searchRes.date}</span>
              </p>
              {/* <p>
                <span>举报人：</span>
                <span>{searchRes.reporter}</span>
              </p> */}
            </div>
          ) : null}
        </div>
      );
    }
  }

  return (
    <div className={styles.blacklist}>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>

      <div className={styles.search}>
        <div className={styles.content}>
          <div className={styles.title}>查人</div>
          <div className={styles.subtitle}>为反爬，1分钟可查询一次</div>
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
            className={`${styles.btn} ${remainTime > 0 ? styles.passive : styles.active}`}
            onClick={handleSearchSubmit}
          >
            <span className={styles.text}>{remainTime > 0 ? formatRemain : 'Go'}</span>
          </div>
          <div className={styles.info}>{showRes()}</div>
        </div>
      </div>
    </div>
  );
}

export default Blacklist;
