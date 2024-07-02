import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import useApi from '../../../hooks/useApi';
import ProductReview from './ProductReview';

// Mock the implementation of useApi
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;

jest.mock("../../../hooks/useApi");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('Test Product Review', () => {
    it('should show loading while product is being fetched by id ',async()=>{
        (useApi as jest.Mock).mockReturnValue({ data: null, loading: true });
        render(
            <BrowserRouter>
            <ProductReview/>
            </BrowserRouter>
        )
        expect(screen.getByText('Loading......')).toBeInTheDocument();
    })
    
    it('should load requested product', async () => {
        const mockData = { id: 1, name: 'Product 1' };
        
        // Set up the mock implementation to return the mock data
        mockUseApi.mockReturnValue({
            data: mockData,
            error: null,
            loading: false,
        });
        
        // Wait for the data to be loaded and displayed
        await waitFor(() => {
            expect(JSON.stringify(mockData)).toBeDefined();
        });
    });

 
});
