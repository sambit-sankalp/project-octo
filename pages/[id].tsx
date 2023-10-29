import React from 'react';
import styles from '@/styles/company.module.css';
import CompanyHeader from '@/components/companypage/companyheader';
import CompanyDescription from '@/components/companypage/companydescription';

type Props = {};

const CompanyPage = (props: Props) => {
  return (
    <main className={styles.container}>
      <div className={styles.subcontainer}>
        <CompanyHeader />
        <CompanyDescription />
      </div>
    </main>
  );
};

export default CompanyPage;
