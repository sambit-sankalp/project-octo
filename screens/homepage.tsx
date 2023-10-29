import React, { useState } from 'react';

import Card from '@/components/homepage/homecard';
import styles from '@/styles/homepage.module.css';
import {
  comapanyData,
  homecardDataType,
  homeprops,
} from '@/types/homepage.type';

const Homepage = (homedata: homeprops) => {
  const [activeIndex, setactiveIndex] = useState(0);
  const [data, setData] = useState<homecardDataType[]>(homedata['top_gainers']);
  const tabsName = ['Top Gainers', 'Top Losers'];

  const handleClick = (index: number) => {
    setactiveIndex(index);
    if (index === 0) {
      setData(homedata['top_gainers']);
    } else {
      setData(homedata['top_losers']);
    }
  };

  return (
    <div className={styles.homepagecontainer}>
      <div className={styles.tabsContainer}>
        {tabsName.map((item, index) => (
          <div
            key={item}
            onClick={() => handleClick(index)}
            className={`${styles.tabs} ${
              activeIndex === index ? styles.tabsActive : ''
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.cardparentcontainer}>
        {data.length !== 0 &&
          data.map((data) => <Card key={data.ticker} data={data} />)}
      </div>
    </div>
  );
};

export default Homepage;
