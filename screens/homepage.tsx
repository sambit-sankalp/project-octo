import React, { useEffect, useState } from 'react';

import Card from '@/components/homepage/homecard';
import styles from '@/styles/homepage.module.css';
import { homecardDataType, homeprops } from '@/types/homepage.type';

const Homepage = (homedata: homeprops) => {
  const [activeIndex, setactiveIndex] = useState(0);
  const [data, setData] = useState<homecardDataType[]>(homedata['top_gainers']);
  const [loadMore, setloadMore] = useState(0);
  const tabsName = ['Top Gainers', 'Top Losers'];
  const [paginatedData, setpaginatedData] = useState<homecardDataType[]>([]);

  useEffect(() => {
    const paginatedData = data.slice(0, 20 * (loadMore + 1));
    setpaginatedData(paginatedData);
  }, [data, loadMore, activeIndex]);

  const handleClick = (index: number) => {
    setactiveIndex(index);
    if (index === 0) {
      setData(homedata['top_gainers']);
      setloadMore(0);
    } else {
      setData(homedata['top_losers']);
      setloadMore(0);
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
        {paginatedData.length !== 0 &&
          paginatedData.map((data) => <Card key={data.ticker} data={data} />)}
      </div>
      <div
        className={styles.loadMoreButton}
        onClick={() => setloadMore(loadMore + 1)}
      >
        Load More
      </div>
    </div>
  );
};

export default Homepage;
