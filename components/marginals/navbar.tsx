import React, { use, useEffect, useRef, useState } from 'react';
import styles from '@/styles/navbar.module.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  const searchIconRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const searchTitleRef = useRef<HTMLDivElement>(null);
  const [searchResults, setsearchResults] = useState<
    {
      name: string;
      symbol: string;
    }[]
  >([]);

  const handleSearchIconClick = () => {
    searchBarRef.current?.focus();
    searchTitleRef.current?.classList.add('show');
  };

  const onChangeSearch = (keywords: string) => {
    if (!keywords) return setsearchResults([]);

    setTimeout(() => {
      fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=demo`,
        { next: { revalidate: 3600 } }
      )
        .then((response) => response.json())
        .then((json) => {
          if (json && json.bestMatches && json.bestMatches.length !== 0) {
            setsearchResults(
              json.bestMatches.map((item: any) => ({
                symbol: item['1. symbol'],
                name: item['2. name'],
              }))
            );
          }
        });
    }, 500);
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const handleOnBlurSearch = () => {
    searchBarRef.current!.value = '';
    searchTitleRef.current!.classList.remove('show');
    setsearchResults([]);
  };

  return (
    <header className={`${styles.header} ${inter.className}`}>
      <nav className={styles.container}>
        <Link href="/">
          <div className={styles.brand}>
            <h1>GrowwStonks</h1>
          </div>
        </Link>
        <div className={styles.searchandresultscontainer}>
          <div className={styles.searchContent}>
            <fieldset className={styles.fieldset}>
              <input
                type="text"
                id={styles.searchBar}
                placeholder="Search..."
                ref={searchBarRef}
                onBlur={handleOnBlurSearch}
                onChange={(e) => onChangeSearch(e.target.value)}
              />
              <div className={styles.iconsContainer}>
                <div
                  id={styles.searchIcon}
                  ref={searchIconRef}
                  onClick={handleSearchIconClick}
                ></div>
              </div>
            </fieldset>
            <div className={styles.searchTitle} ref={searchTitleRef}>
              <h2>Search Results</h2>
            </div>
          </div>
          {searchResults.length !== 0 && (
            <div className={styles.resultsContainer}>
              {searchResults.map((res, index) => (
                <div key={index} className={styles.resultsSubContainer}>
                  <h5 className={styles.resultTitle}>{res.name}</h5>
                  <h5 className={styles.resultSubTitle}>{res.symbol}</h5>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
