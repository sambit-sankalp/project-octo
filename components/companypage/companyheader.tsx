import React from 'react';
import styles from '@/styles/companypage.module.css';
import Image from 'next/image';

type headerProps = {
  name: string;
  price: string;
  changepercentage: string;
  symbol: string;
  assetType: string;
  exchange: string;
  currency: string;
};

const CompanyHeader = (headerData: headerProps) => {
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
          <h1 className={styles.headtitle}>
            {headerData.name} ({headerData.symbol})
          </h1>
          <p className={styles.headsubtitle}>
            {headerData.exchange}, {headerData.assetType}
          </p>
          <p className={styles.headsubtitle}>NSQ</p>
        </div>
      </div>
      <div className={styles.header2}>
        <h2 className={styles.textstyle}>${headerData.price}</h2>
        <h2
          className={
            headerData.changepercentage[0] === '-'
              ? styles.textstyle2Dec
              : styles.textstyle2
          }
        >
          {headerData.changepercentage[0] === '-'
            ? `${headerData.changepercentage} ↓ `
            : `+${headerData.changepercentage} ↑`}
        </h2>
      </div>
    </div>
  );
};

export default CompanyHeader;
