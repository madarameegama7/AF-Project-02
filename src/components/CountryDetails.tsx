import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetails: React.FC<{ code: string }> = ({ code }) => {
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(response.data[0]);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} width="10" />
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Languages: {Object.values(country.languages || {}).join(', ')}</p>
    </div>
  );
};

export default CountryDetails;