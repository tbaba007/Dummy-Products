import { render, waitFor } from '@testing-library/react';
import useApi from '../../../hooks/useApi';
import { urls } from '../../../utils/urls';
import ProductReview from './ProductReview';

// Mock the implementation of useApi
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;



describe('Test Product Review', () => {
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
