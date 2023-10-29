import React, { useEffect, useRef } from 'react';
import styles from '@/styles/companypage.module.css';

type Props = {};

const CompanyDescription = (props: Props) => {
  const comapanyDetails = {
    Industry: 'Software Infrastructure',
    Sector: 'Technology',
  };

  return (
    <div className={styles.description}>
      <h1 className={styles.descriptiontitle}>About Microsoft</h1>
      <p className={styles.descriptioncontent}>
        Uxjwzvqk yjzqkzjv zjvqkxuy jvqkxuyz kxuyzjvq uyjzqkxv zqkxuyzj vqkxuyzj
        uxjwzvqk yjzqkxuy zjvqkxuyz kxuyzjvq uyjzqkxv zqkxuyzjv qkxuyzjvq
        uyjzqkxv zqkxuyzjvqk xuyzjvqky jzqkxuyzjv qkxuyzjvq uyjzqkxv
        zqkxuyzjvqkx Uxjwzvqk yjzqkzjv zjvqkxuy jvqkxuyz kxuyzjvq uyjzqkxv
        zqkxuyzj vqkxuyzj uxjwzvqk yjzqkxuy zjvqkxuyz kxuyzjvq uyjzqkxv
        zqkxuyzjv qkxuyzjvq uyjzqkxv zqkxuyzjvqk xuyzjvqky jzqkxuyzjv qkxuyzjvq
        uyjzqkxv zqkxuyzjvqkx
      </p>

      <div className={styles.tabscontainer}>
        <div className={styles.tabs}>Industry: {comapanyDetails.Industry}</div>
        <div className={styles.tabs}>Sector: {comapanyDetails.Sector}</div>
      </div>

      <div className={styles.slidecontainer}>
        <div className={styles.slidercontent1}>
          <h1 className={styles.slidertitle}>52 Week Low</h1>
          <h1 className={styles.sliderdescription}>$143.02B</h1>
        </div>
        <input type="range" className={styles.range1} />
        <div className={styles.slidercontent2}>
          <h1 className={styles.slidertitle}>52 Week High</h1>
          <h1 className={styles.sliderdescription}>$143.02B</h1>
        </div>
      </div>

      <div className={styles.othercontainer}>
        {[0, 1, 2, 3, 4].map((item) => (
          <div className={styles.content} key={item}>
            <h5 className={styles.title}>Market Cap</h5>
            <p className={styles.desc}>$177.17</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDescription;
