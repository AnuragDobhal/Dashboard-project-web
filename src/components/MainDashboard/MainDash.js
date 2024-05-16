import React, { useState, useEffect } from "react";
import styles from "../../styles/MainDash.module.css";
import { FaGlobe, FaHeartbeat, FaSkull } from "react-icons/fa";
import Search from "../Search";
// import PieColor from "../SideTabPages/PieChartDash";
import PieChartDash from "../SideTabPages/PieChartDash";

const MainDash = () => {
  const [worldData, setWorldData] = useState({});
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/all");
        const data = await response.json();
        setWorldData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (searchCountry) => {
    try {
      const response = await fetch(
        `https://disease.sh/v3/covid-19/countries/${searchCountry}`
      );
      const data = await response.json();
      setCountryData(data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <section className={styles.mainSection}>
        <h2>Covid Cases World Wide</h2>
        <Search onSearch={handleSearch} />
        <div className={styles.grid}>
          <div className={styles.card}>
            <FaGlobe className={styles.icon_case} />
            <h3>Total Cases Worldwide</h3>
            <p className={styles.number_case}>{worldData.cases}</p>
          </div>
          <div className={styles.card}>
            <FaHeartbeat className={styles.icon_recover} />
            <h3>Total Recoveries Worldwide</h3>
            <p className={styles.number_recover}>{worldData.recovered}</p>
          </div>
          <div className={styles.card}>
            <FaSkull className={styles.icon_death} />
            <h3>Total Deaths Worldwide</h3>
            <p className={styles.number_death}>{worldData.deaths}</p>
          </div>
          {countryData.country && (
            <>
              <div className={styles.card}>
                <h3>{countryData.country}</h3>
                <p className={styles.number_case}>
                  Total Cases: {countryData.cases}
                </p>
              </div>
              <div className={styles.card}>
                <h3>{countryData.country}</h3>
                <p className={styles.number_recover}>
                  Total Recoveries: {countryData.recovered}
                </p>
              </div>
              <div className={styles.card}>
                <h3>{countryData.country}</h3>
                <p className={styles.number_death}>
                  Total Deaths: {countryData.deaths}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
      <PieChartDash />
    </div>
  );
};

export default MainDash;
