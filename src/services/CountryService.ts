import axios from 'axios';
import { Country } from '@app_interfaces/Country';
import {API_URL} from '../api/ApiURL';
export const fetchAllCountries=async(): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`${API_URL}/all`);
        return response.data;
    }catch(error){
        console.error('Error fetching all countries', error);
        throw error;
    }
};

export const fetchCountryByName = async(name:string): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`${API_URL}/name/${name}`);
        return response.data;
    }catch(error){
        console.error(`Error fetching country by name (${name}):`,error);
        throw error;

    }
};

export const fetchAllCountriesByRegion = async(region:string): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`${API_URL}/region/${region}`);
        return response.data;

    }catch(error){
        console.error(`Error fetching countries by region (${region})`, error);
        throw error;
    }
};

export const fetchCountryByCode = async (code:string): Promise<Country[]>=>{
    try{
        const response = await axios.get<Country[]>(`${API_URL}/alpha/${code}`);
        return response.data;

    }catch(error){
        console.error(`Error fetching countries from code (${code}):`, error);
        throw error;
    }
}




