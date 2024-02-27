import { Grid } from '@mui/material';
import styles from './RealTimeView.module.scss';
import { useAppSelector } from '@/features/store';

const RealTimeView = () => {
  const online = useAppSelector((state) => (state.base.statistic.online))
  const report = useAppSelector((state) => (state.base.statistic.report))
  const sign = useAppSelector((state) => (state.base.statistic.sign))

  return (
    <div className={styles.real_view}>
      <Grid container>
        <Grid item xs={4}>
          <p className={styles.label}>在线</p>
          <p className={styles.value}>{online}</p>
        </Grid>
        <Grid item xs={4}>
          <p className={styles.label}>被挂</p>
          <p className={styles.value}>{report}</p>
        </Grid>
        <Grid item xs={4}>
          <p className={styles.label}>注册</p>
          <p className={styles.value}>{sign}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default RealTimeView;
