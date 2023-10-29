import React from 'react';
import styles from '@/styles/companypage.module.css';
import Image from 'next/image';

type Props = {};

const CompanyHeader = (props: Props) => {
  return (
    <div className={styles.headercontainer}>
      <div className={styles.header1}>
        <div className={styles.header1logo}>
          <Image
            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1698255298/2048px-Microsoft_logo.svg_i5dte2.png"
            alt="Microsoft"
            width={20}
            height={20}
          />
        </div>
        <div className={styles.headcontent}>
          <h1 className={styles.headtitle}>Microsoft Corporation (MSFT)</h1>
          <p className={styles.headsubtitle}>AAPL, Common Stock</p>
          <p className={styles.headsubtitle}>NSQ</p>
        </div>
      </div>
      <div className={styles.header2}>
        <h2 className={styles.textstyle}>$177.17</h2>
        <h2 className={styles.textstyle2}>+0.45% &#8593;</h2>
      </div>
    </div>
  );
};

export default CompanyHeader;
