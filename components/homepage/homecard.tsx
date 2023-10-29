import React from 'react';
import styles from '@/styles/homecard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { comapanyData, homecardDataType } from '@/types/homepage.type';

const Card = ({ data }: { data: homecardDataType }) => {
  return (
    <Link href={`/${data.ticker}`}>
      <div className={styles.cardcontainer}>
        <div className={styles.icon}>
          <Image
            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1698255298/2048px-Microsoft_logo.svg_i5dte2.png"
            alt="Microsoft"
            width={20}
            height={20}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.cardTitle}>
            {data.name}({data.ticker})
          </div>
          <div className={styles.subContentContainer}>
            <div className={styles.cardPrice}>${data.price}</div>
            <div
              className={
                data.change_percentage[0] === '-'
                  ? styles.cardPriceDecrement
                  : styles.cardPriceIncrement
              }
            >
              {data.change_percentage[0] === '-'
                ? `${data.change_percentage} ↓ `
                : `+${data.change_percentage} ↑`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
