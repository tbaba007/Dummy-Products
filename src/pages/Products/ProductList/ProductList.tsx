import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import Loading from "../../../components/ui/Loading";
import useApi from "../../../hooks/useApi";
import { urls } from "../../../utils/urls";
import productListStyles from "./ProductList.module.scss";
import { productProps } from "./types";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "title", headerName: "Title", width: 250 },
  { field: "description", headerName: "Description", width: 250 },
  { field: "category", headerName: "Category", width: 250 },
  {
    field: "meta",
    headerName: "Date Created",
    width: 250,
    valueGetter: (params: { createdAt: string }) => params.createdAt,
  },
];
document.title = "Product List";

interface productListProps {
  products: productProps[];
}
const ProductList = () => {
  const navigate = useNavigate();
  const { data, loading } = useApi(`${urls.productList}`);
  const productListData = data!! as productListProps;
  

  const handleEvent: GridEventListener<"rowClick"> = (
    params // GridRowParams
  ) => {
    const { row } = params;
    return navigate(`/${urls.productById}${row.id}`);
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className={productListStyles.container}>
      <h4 className={productListStyles.container__geader}>Product List</h4>
      {productListData?.products && productListData?.products.length > 0 && (
        <DataGrid
          rows={productListData?.products}
          columns={columns}
          loading={loading}
          onRowClick={handleEvent}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      )}
    </div>
  );
};

export default ProductList;
