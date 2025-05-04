import React from 'react';
import { fetchAllCountriesByRegion } from '../services/CountryService';
import { Country } from '@app_interfaces/Country';

interface FilterProps {
  onFilter: (countries: Country[]) => void;
  onError: (error: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter, onError }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleRegionChange = async (region: string) => {
    try {
      if (region) {
        const countries = await fetchAllCountriesByRegion(region);
        onFilter(countries);
      }
    } catch (error) {
      onError('Failed to fetch countries for selected region');
    }
  };

  return (
    <div>
      <select onChange={(e) => handleRegionChange(e.target.value)}>
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;