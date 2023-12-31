import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/home.module.css';
import Homepage from '@/screens/homepage';
import {
  comapanyData,
  homecardDataType,
  homeprops,
} from '@/types/homepage.type';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ top_gainers, top_losers }: homeprops) {
  return (
    <>
      <Head>
        <title>GrowwStonks</title>
        <meta name="description" content="The Stocks App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Homepage top_gainers={top_gainers} top_losers={top_losers} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo',
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();

  const top_gainers = data['top_gainers'];
  const top_gainers_results = top_gainers.map(async (item: comapanyData) => {
    const single_result = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`,
      { next: { revalidate: 3600 } }
    ).then((res) => res.json());

    return { ...item, name: single_result['Name'] };
  });

  const final_top_gainers: homecardDataType[] = await Promise.all(
    top_gainers_results
  );

  const top_losers = data['top_losers'];
  const top_losers_results = top_losers.map(async (item: comapanyData) => {
    const single_result = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`,
      { next: { revalidate: 3600 } }
    ).then((res) => res.json());

    return { ...item, name: single_result['Name'] };
  });

  const final_top_losers: homecardDataType[] = await Promise.all(
    top_losers_results
  );

  return {
    props: {
      top_gainers: final_top_gainers,
      top_losers: final_top_losers,
    },
  };
}
