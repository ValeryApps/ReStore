import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Product } from '../../models/Product'
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../store/configStore';
import { addItemToBasketAsync } from '../../store/basket/basketSlice';

interface Prop {
    product: Product
}

const ProductCard = ({ product }: Prop) => {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {product.name.charAt(0)}
                </Avatar>
            } title={
                <Typography sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                    {product.name}
                </Typography>

            }
            />
            <CardMedia
                component="img"
                sx={{ backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                alt={product.name.substring(0, 10)}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='secondary'>
                    $ {product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status.includes(`pending${product.id}`)} onClick={() => dispatch(addItemToBasketAsync({ productId: product.id }))} size="small" >Add To cart</LoadingButton>
                <Button component={Link} to={`/products/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard