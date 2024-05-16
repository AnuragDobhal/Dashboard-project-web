import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Typography } from '@mui/material';
import Search from '../Search';

function CovidGraph() {
  const [data, setData] = useState([]);
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/all');
        const covidData = response.data;
        const newData = [
          { name: 'Total Cases', value: covidData.cases },
          { name: 'Total Recoveries', value: covidData.recovered },
          { name: 'Total Deaths', value: covidData.deaths }
        ];
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countryData.country) {
      const newData = [
        { name: 'Total Cases', value: countryData.cases },
        { name: 'Total Recoveries', value: countryData.recovered },
        { name: 'Total Deaths', value: countryData.deaths }
      ];
      setData(newData);
    }
  }, [countryData]);

  const handleSearch = async (searchCountry) => { 
    try {
      const response = await fetch(
        `https://disease.sh/v3/covid-19/countries/${searchCountry}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }
      const data = await response.json();
      setCountryData(data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <Typography variant="h4" gutterBottom className='graph'>
        Graphical Representation
      </Typography>
      <Search onSearch={handleSearch} />
      <ResponsiveContainer style={{marginTop:50}} >
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#f52d0a" name="Total Cases" />
          <Line type="monotone" dataKey="value" stroke="#0088FE" name="Total Recoveries" />
          <Line type="monotone" dataKey="value" stroke="#00C49F" name="Total Deaths" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CovidGraph;
