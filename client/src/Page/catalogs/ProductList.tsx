import { Grid } from '@mui/material'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import { Product } from '../../models/Product'
import { useAppSelector } from '../../store/configStore'
import ProductCard from './ProductCard'

interface Prop {
    products: Product[]
}

const ProductList = ({ products }: Prop) => {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 2, sm: 2, md: 12 }}>
            {products?.map(product => (
                <Grid item xs={2} md={4} sm={1} key={product.id} >
                    {!productsLoaded ? (<ProductCardSkeleton />) : (<ProductCard product={product} />)}

                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList