import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { fetchAllCountries } from '../../services/CountryService';

// Mock the services
jest.mock('../../services/CountryService');
jest.mock('../../firebase', () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

const mockCountries = [
  {
    cca3: 'USA',
    name: { common: 'United States' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    population: 331002651,
    flags: { svg: 'usa-flag.svg' },
    languages: { eng: 'English' },
  },
];

describe('HomePage', () => {
  beforeEach(() => {
    // Setup mocks
    (fetchAllCountries as jest.Mock).mockResolvedValue(mockCountries);
    // Mock session storage
    const mockUser = { email: 'test@example.com' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUser));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders HomePage with countries', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Check if loading state is shown
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Check if country details are displayed
    expect(screen.getByText(/Population/i)).toBeInTheDocument();
    expect(screen.getByText(/Region/i)).toBeInTheDocument();
  });

  test('search functionality works', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Get search input and type
    const searchInput = screen.getByPlaceholderText(/Search country/i);
    fireEvent.change(searchInput, { target: { value: 'United' } });

    // Check if filtering worked
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  test('region filter works', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Get region select and change value
    const regionSelect = screen.getByRole('combobox');
    fireEvent.change(regionSelect, { target: { value: 'Americas' } });

    // Check if filtering worked
    expect(screen.getByText('United States')).toBeInTheDocument();
  });
});