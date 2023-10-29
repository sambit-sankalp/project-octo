import React from 'react';
import styles from '@/styles/companypage.module.css';

type descriptionType = {
  name: string;
  description: string;
  industry: string;
  sector: string;
  weekHigh52: string;
  weekLow52: string;
  marketCap: string;
  peratio: string;
  beta: string;
  dividendYield: string;
  profitMargin: string;
};

function convertToTrillionDollars(num: number): string {
  const trillion = 1000000000000;
  const result = num / trillion;
  return `$${result.toFixed(2)}T`;
}

const CompanyDescription = (companyDescription: descriptionType) => {
  const otherKeyPairs = [
    {
      key: 'Market Cap',
      value: convertToTrillionDollars(parseInt(companyDescription.marketCap)),
    },
    { key: 'P/E Ratio', value: companyDescription.peratio },
    { key: 'Beta', value: companyDescription.beta },
    { key: 'Dividend Yield', value: companyDescription.dividendYield },
    { key: 'Profit Margin', value: companyDescription.profitMargin },
  ];

  return (
    <div className={styles.description}>
      <h1 className={styles.descriptiontitle}>
        About {companyDescription.name}
      </h1>
      <p className={styles.descriptioncontent}>
        {companyDescription.description}
      </p>

      <div className={styles.tabscontainer}>
        <div className={styles.tabs}>
          Industry: {companyDescription.industry}
        </div>
        <div className={styles.tabs}>Sector: {companyDescription.sector}</div>
      </div>

      <div className={styles.slidecontainer}>
        <div className={styles.slidercontent1}>
          <h1 className={styles.slidertitle}>52 Week Low</h1>
          <h1 className={styles.sliderdescription}>
            ${companyDescription.weekLow52}
          </h1>
        </div>
        <input type="range" className={styles.range1} />
        <div className={styles.slidercontent2}>
          <h1 className={styles.slidertitle}>52 Week High</h1>
          <h1 className={styles.sliderdescription}>
            ${companyDescription.weekHigh52}
          </h1>
        </div>
      </div>

      <div className={styles.othercontainer}>
        {otherKeyPairs.map((item) => (
          <div className={styles.content} key={item.key}>
            <h5 className={styles.title}>{item.key}</h5>
            <p className={styles.desc}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDescription;
