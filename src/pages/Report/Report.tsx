import { useParams } from 'react-router-dom';
import styles from './Report.module.scss';
import { useEffect, useState } from 'react';
import { iReportCard } from '@/interfaces/Report';
import { getReportList } from '@/services/api/reportSlice';
import { dateFormat } from '@/utils/dateFormatter';
import { enqueueSnackbar } from 'notistack';

const Report = () => {
  const { email } = useParams();
  const [reportList, setReportList] = useState<iReportCard[]>([]);

  useEffect(() => {
    if (email) {
      getReportList(atob(email))
        .then((res) => {
          setReportList(res.reportList);
        })
        .catch((err) => {
          enqueueSnackbar(err.message ? err.message : '查询被挂记录失败~请联系管理员哦宝~', { variant: 'warning' });
        });
    }
  }, []);

  const noReport = () => {
    return (
      <div className={styles.noCard}>
        <p>
          此账号
          <span className={styles.email}>{atob(email as string)}</span>
          没有举报记录
        </p>
      </div>
    );
  };

  return (
    <div className={styles.report}>
      {reportList.length === 0
        ? noReport()
        : reportList.map((item, index) => (
            <div className={styles.card} key={index}>
              <div>举报日期：{dateFormat(item.date)}</div>
              <div>描述：{item.description}</div>
            </div>
          ))}
    </div>
  );
};

export default Report;
