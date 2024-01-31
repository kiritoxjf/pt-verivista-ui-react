import styles from './WaveCard.module.scss';
import { ReactNode } from 'react';
interface ChildrenElement {
  children?: ReactNode;
  className?: CSSModuleClasses[string]
}

export default function WaveCard({ children = null, className="" }: ChildrenElement) {
  return (
    <div className={`${styles.wave_card} ${className}`}>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      {children}
    </div>
  );
}
