import React, { useState } from "react";
import styles from "../styles/MainDash.module.css";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [searchCountry, setSearchCountry] = useState("");

  const handleSearch = () => {
    onSearch(searchCountry);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search..."
        value={searchCountry}
        onChange={(e) => setSearchCountry(e.target.value)}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
