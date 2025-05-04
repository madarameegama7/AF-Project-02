import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'; // Import vi
import '@testing-library/jest-dom'; // Import jest-dom for toBeInTheDocument
import SearchBar from '../../components/SearchBar';

describe('SearchBar component', () => {
  it('renders input and button', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search for a country/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search for a country/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Japan' } });
    expect(input.value).toBe('Japan');
  });

  it('calls onSearch with correct query when button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search for a country/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Japan' } });
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Japan');
  });
});
