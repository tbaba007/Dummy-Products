import { render, waitFor } from '@testing-library/react';
import useApi from '../../../hooks/useApi';
import { urls } from '../../../utils/urls';

// Mock the implementation of useApi
jest.mock('../../../hooks/useApi');
const mockUseApi = useApi as jest.Mock;

const TestComponent = () => {
    const { data, error, loading } = useApi(`${urls.productList}`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return <div>{JSON.stringify(data)}</div>;
};

describe('Test ProductList Api', () => {
    it('should load all products', async () => {
        const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        
        // Set up the mock implementation to return the mock data
        mockUseApi.mockReturnValue({
            data: mockData,
            error: null,
            loading: false,
        });

        const { getByText } = render(<TestComponent />);
        
        // Wait for the data to be loaded and displayed
        await waitFor(() => {
            expect(getByText(JSON.stringify(mockData))).toBeInTheDocument();
        });
    });

    it('should show loading state', async () => {
        // Set up the mock implementation to return loading state
        mockUseApi.mockReturnValue({
            data: null,
            error: null,
            loading: true,
        });

        const { getByText } = render(<TestComponent />);
        
        // Verify the loading state
        expect(getByText('Loading...')).toBeInTheDocument();
    });
});
