import React, { useState, useEffect } from "react";
import styles from "../../styles/CovidSymptoms.module.css";
import Loading from "../loading";

const Card = ({ name, items }) => (
  <div className={styles.card}>
    <h3>{name}</h3>
    <p>{items.join(", ")}</p>
  </div>
);

const CovidSymptoms = () => {
  const [symptomsData, setSymptomsData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/covid/covid_data");
        const data = await response.json();
        setSymptomsData(data);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {symptomsData ? (
        <div className={`${styles.card_container} ${dataLoaded ? styles.gasp : ''}`}>
          {symptomsData
            .filter(
              (item) =>
                item.section === "symptoms" || item.section === "prevention"
            )
            .map((section) => (
              <div key={section.section}>
                <h2 className={styles.sectionHeading}>
                  {section.section === "symptoms" ? "Symptoms" : "Preventions"}
                </h2>
                <div className={styles.card_section}>
                  {section.subsections.map((subsection) => (
                    <Card
                      key={subsection.name}
                      name={subsection.name}
                      items={subsection.items}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CovidSymptoms;
