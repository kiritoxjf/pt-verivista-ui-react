import Blacklist from '@/components/Blacklist/Blacklist';
import styles from './Home.module.scss';
import RealTimeView from '@/components/RealTimeView/RealTimeView';

const Home = () => {
  return (
    <div className={styles.home}>
      <RealTimeView />
      <Blacklist />
    </div>
  );
};

export default Home;
