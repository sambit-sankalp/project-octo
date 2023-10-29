import React from 'react';
import styles from '@/styles/company.module.css';
import CompanyHeader from '@/components/companypage/companyheader';
import CompanyDescription from '@/components/companypage/companydescription';
import { companyDetailsType } from '@/types/companypage.type';

import { Inter } from 'next/font/google';
import CompanyChart from '@/components/companypage/companychart';
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] });

const CompanyPage = ({ data }: { data: companyDetailsType }) => {
  return (
    <>
      <Head>
        <title>GrowwStonks | {data.symbol}</title>
        <meta name="description" content="The Stocks App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.container} ${inter.className}`}>
        <div className={styles.subcontainer}>
          <CompanyHeader
            name={data.name}
            symbol={data.symbol}
            price={data.price}
            changepercentage={data.changepercentage}
            assetType={data.assetType}
            exchange={data.exchange}
            currency={data.currency}
          />
          <CompanyChart symbol={data.symbol} />
          <CompanyDescription
            name={data.name}
            description={data.description}
            industry={data.industry}
            sector={data.sector}
            weekHigh52={data.weekHigh52}
            weekLow52={data.weekLow52}
            marketCap={data.marketCap}
            peratio={data.peratio}
            beta={data.beta}
            dividendYield={data.dividendYield}
            profitMargin={data.profitMargin}
          />
        </div>
      </main>
    </>
  );
};

export default CompanyPage;

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const res = await fetch(
    'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo',
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();

  const topgainerlosers = await fetch(
    'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo',
    { next: { revalidate: 3600 } }
  );
  const topgainerlosersData = await topgainerlosers.json();

  const changeData = [
    ...topgainerlosersData['top_gainers'],
    ...topgainerlosersData['top_losers'],
  ].filter((item: any) => item['ticker'] === query['id']);

  const reqData: companyDetailsType = {
    name: data['Name'],
    description: data['Description'],
    symbol: data['Symbol'],
    assetType: data['AssetType'],
    exchange: data['Exchange'],
    currency: data['Currency'],
    country: data['Country'],
    sector: data['Sector'],
    industry: data['Industry'],
    weekHigh52: data['52WeekHigh'],
    weekLow52: data['52WeekLow'],
    marketCap: data['MarketCapitalization'],
    peratio: data['PERatio'],
    beta: data['Beta'],
    dividendYield: data['DividendYield'],
    profitMargin: data['ProfitMargin'],
    price: changeData[0]['price'] as string,
    changepercentage: changeData[0]['change_percentage'] as string,
  };

  return {
    props: {
      data: reqData,
    },
  };
}
