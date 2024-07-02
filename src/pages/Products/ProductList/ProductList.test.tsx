import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import useApi from "../../../hooks/useApi";
import { urls } from "../../../utils/urls";
import ProductList from "./ProductList";

// Mock the useApi hook
jest.mock("../../../hooks/useApi");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockProducts = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description: "Description 1",
    category: "Category 1",
    meta: { createdAt: "2023-01-01T00:00:00Z" },
  },
  {
    id: 3,
    title: "Powder Canister",
    description: "Description 2",
    category: "Category 2",
    meta: { createdAt: "2023-01-02T00:00:00Z" },
  },
];

describe("ProductList Component", () => {
  it("renders loading state initially", async() => {
    (useApi as jest.Mock).mockReturnValue({ data: null, loading: true });
     render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Loading......')).toBeInTheDocument();
  });

  it("renders product list when data is available", async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      loading: false,
    });
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Product List")).toBeInTheDocument();
    });

    expect(screen.getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  it("handles row click and navigates to product detail page", async () => {
    (useApi as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      loading: false,
    });
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Essence Mascara Lash Princess")).toBeInTheDocument();
    });

    const firstRow = screen.getByText("Essence Mascara Lash Princess").closest("div[role='row']");
    if (firstRow) {
      fireEvent.click(firstRow);
    }

    expect(mockNavigate).toHaveBeenCalledWith(`/${urls.productById}1`);
  });
});
