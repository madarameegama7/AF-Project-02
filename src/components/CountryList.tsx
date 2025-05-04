import React, {useEffect,useState} from "react";
import { fetchAllCountries } from "@app_services/CountryService";
import { Country } from "@app_interfaces/Country";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error loading countries:', error);
      }
    };

    loadCountries();
  }, []);

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          <img src={country.flags.svg} alt={`${country.name.common} flag`} />
          <h3>{country.name.common}</h3>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital?.[0]}</p>
          <p>Languages: {country.languages?.[0]}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryList;