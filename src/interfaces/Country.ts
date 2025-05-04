export interface Country{
    cca3: string;
    name:{
        common: string;
        official: string;
    };
    population: number;
    region: string;
    capital?: string[];
    flags:{
        svg: string;
        png: string;
    };
    languages?: {
        [key: string]: string
    };

}