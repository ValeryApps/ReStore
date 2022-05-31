import { Container, Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../components/AppPagination";
import CheckBoxButton from "../../components/CheckBoxButton";
import LoadingComponent from "../../components/LoadingComponent";
import OrderByButtonGroup from "../../components/OrderByButtonGroup";
import SearchField from "../../components/SearchField";
import { fetchFilterAsync, fetchProductsAsync, productSelector, setPageNumber, setProductParams } from "../../store/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../store/configStore";
import ProductList from "./ProductList";

const sortOptions = [
    { value: "name", label: "alphabetical" },
    { value: "priceDesc", label: "price - (Higher to Lower)" },
    { value: "price", label: "price - (Lower to Higher)" },
];

const Catalog = () => {
    const products = useAppSelector(productSelector.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog)

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilterAsync());
    }, [filtersLoaded, dispatch])

    if (!filtersLoaded) return <LoadingComponent message='Loading products...' />
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 1, p: 2, mr: 1 }} >
                        <SearchField />
                    </Paper>
                    <Paper sx={{ p: 2, mb: 1, mr: 1 }}>
                        <OrderByButtonGroup
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                            selectedValue={productParams.orderBy}
                        />
                    </Paper>
                    <Paper sx={{ p: 2, mb: 1, mr: 1 }}>
                        <CheckBoxButton
                            items={brands}
                            checked={productParams.brands}
                            onChange={(brands: string[]) => dispatch(setProductParams({ brands }))}
                        />
                    </Paper>
                    <Paper sx={{ p: 2, mb: 2, mr: 1 }}>
                        <CheckBoxButton
                            items={types}
                            checked={productParams.types}
                            onChange={(types: string[]) => dispatch(setProductParams({ types }))}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                    {metaData && <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />}

                </Grid>
            </Grid>
        </Container>
    )
}

export default Catalog