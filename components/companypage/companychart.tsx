import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styles from '@/styles/companypage.module.css';
import Loader from './loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

type CompanyChartType = {
  symbol: string;
};

const CompanyChart = ({ symbol }: CompanyChartType) => {
  const [data, setData] = useState<any>([]);
  const [time, setTime] = useState('Daily');

  const allTypes = ['Daily', 'Weekly', 'Monthly'];

  useEffect(() => {
    console.log(time);
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${time.toUpperCase()}&symbol=IBM&apikey=demo`,
      { next: { revalidate: 3600 } }
    )
      .then((response) => response.json())
      .then((json) => {
        const companyChartData = Object.keys(json[Object.keys(json)[1]]).map(
          (ts) => {
            const dataPoint = json[Object.keys(json)[1]][ts];
            return {
              Date: ts,
              Close: parseFloat(dataPoint['4. close']),
            };
          }
        );
        setData(companyChartData);
      })
      .catch((error) => {
        console.log('Error Occurred', error);
      });
  }, [time]);

  return (
    <div className={styles.chartsize}>
      {!(data && data.length > 0) ? (
        <div className={styles.chartLoaderContainer}>
          <Loader />
        </div>
      ) : (
        <Line
          data={{
            labels: data.map((item: any) => item.Date),
            datasets: [
              {
                data: data.map((item: any) => item.Close),
                backgroundColor: 'green',
              },
            ],
          }}
        />
      )}
      <div className={styles.cartTypeContainer}>
        <div className={styles.cartTypeSubContainer}>
          {allTypes.map((item) => (
            <div
              key={item}
              onClick={() => setTime(item)}
              className={`${styles.cartType} ${
                time === item ? styles.cartTypeActive : ''
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyChart;
