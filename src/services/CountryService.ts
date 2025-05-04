import axios from 'axios';
import { Country } from '@app_interfaces/Country';

export const fetchAllCountries=async(): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/all`);
        return response.data;
    }catch(error){
        console.error('Error fetching all countries', error);
        throw error;
    }
};

export const fetchCountryByName = async(name:string): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${name}`);
        return response.data;
    }catch(error){
        console.error(`Error fetching country by name (${name}):`,error);
        throw error;

    }
};

export const fetchAllCountriesByRegion = async(region:string): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/region/${region}`);
        return response.data;

    }catch(error){
        console.error(`Error fetching countries by region (${region})`, error);
        throw error;
    }
};

export const fetchCountryByCode = async (code:string): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/alpha/${code}`);
        return response.data;

    }catch(error){
        console.error(`Error fetching countries from code (${code}):`, error);
        throw error;
    }
}




