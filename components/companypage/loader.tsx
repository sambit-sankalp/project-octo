import React from 'react';
import styles from '@/styles/loader.module.css';

const Loader = () => {
  return (
    <div className={`${styles.loader} ${styles.center}`}>
      <span></span>
    </div>
  );
};

export default Loader;
