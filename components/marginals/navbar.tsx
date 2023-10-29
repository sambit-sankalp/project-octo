import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/navbar.module.css';

const Navbar = () => {
  const searchIconRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const searchTitleRef = useRef<HTMLDivElement>(null);

  const handleSearchIconClick = () => {
    searchBarRef.current?.focus();
    // Show Search title
    console.log('hii');
    searchTitleRef.current?.classList.add('show');
  };

  const handleOnBlurSearch = () => {
    searchBarRef.current!.value = '';
    // Hide Search Title
    searchTitleRef.current!.classList.remove('show');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <div className={styles.brand}>
          <h1>GrowwStonks</h1>
        </div>
        <div className={styles.searchContent}>
          <fieldset className={styles.fieldset}>
            <input
              type="text"
              id={styles.searchBar}
              placeholder="Search..."
              ref={searchBarRef}
              onBlur={handleOnBlurSearch}
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
      </nav>
    </header>
  );
};

export default Navbar;
