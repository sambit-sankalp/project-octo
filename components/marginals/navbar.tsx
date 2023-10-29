import React, { useEffect, useRef, useState } from 'react';
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
      type: string;
    }[]
  >([]);
  const [filteredSearchResults, setfilteredSearchResults] = useState<
    {
      name: string;
      symbol: string;
      type: string;
    }[]
  >([]);

  const [searchOptionsActive, setSearchOptionsActive] = useState('All');

  const handleSearchIconClick = () => {
    // searchTitleRef.current?.classList.add('show');
  };

  const searchOptions = ['All', 'Stocks', 'ETFs'];

  useEffect(() => {
    console.log(searchOptionsActive);
    if (searchOptionsActive === 'Stocks') {
      setfilteredSearchResults(
        searchResults.filter((item) => !(item.type === 'ETF'))
      );
    } else if (searchOptionsActive === 'ETFs') {
      setfilteredSearchResults(
        searchResults.filter((item) => item.type === 'ETF')
      );
    } else {
      setfilteredSearchResults(searchResults);
    }
  }, [searchOptionsActive, searchResults]);

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
                type: item['3. type'],
              }))
            );
          }
        });
    }, 500);
  };

  const handleOnBlurSearch = () => {
    // searchBarRef.current!.value = '';
  };

  const onClickCrossHandler = () => {
    searchBarRef.current!.value = '';
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
                onChange={(e) =>
                  onChangeSearch((e.target as HTMLInputElement).value)
                }
                onKeyDown={(e) =>
                  onChangeSearch((e.target as HTMLInputElement).value)
                }
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
          {filteredSearchResults.length !== 0 && (
            <div className={styles.resultsContainer}>
              <div className={styles.searchHeaderContainer}>
                <div className={styles.tagsContainer}>
                  {searchOptions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSearchOptionsActive(item)}
                      className={`${styles.tag} ${
                        item === searchOptionsActive ? styles.activeTag : ''
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div
                  className={styles.cross}
                  onClick={onClickCrossHandler}
                ></div>
              </div>
              {filteredSearchResults.map((res, index) => (
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
