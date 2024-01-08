import { useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import { getIcp } from '@/services/api/baseSlice';

const Footer = () => {
  const [icp, setIcp] = useState<string>('');
  useEffect(() => {
    getIcp().then((res) => {
      setIcp(res.license);
    });
  }, []);
  return (
    <div className={styles.footer}>
      <hr />
      <div className="icp">ICP备案编号：{icp}</div>
    </div>
  );
};

export default Footer;
