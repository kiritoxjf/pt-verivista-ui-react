import Blacklist from '@/components/Blacklist/Blacklist';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Blacklist />
    </div>
  );
};

export default Home;
