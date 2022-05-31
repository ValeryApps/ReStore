import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Table, TableBody, TableCell, TableRow, Typography, TableContainer, TextField, Container } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addItemToBasketAsync, removeItemAsync } from '../../store/basket/basketSlice';
import { fetchProductByIdAsync, productSelector } from '../../store/catalog/catalogSlice';
import { useAppDispatch, useAppSelector } from '../../store/configStore';

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    const { basket, status } = useAppSelector(state => state.basket);
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelector.selectById(state, id!))
    const { status: productState } = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);
    const handleInputChange = (event: any) => {

        if (event.target.value >= 0)
            setQuantity(parseInt(event.target.value))
    }

    const handleUpdateQuantity = () => {
        if (!item || quantity < item.quantity) {
            const updatedQuantity = item ? quantity - item?.quantity : quantity;
            dispatch(addItemToBasketAsync({ productId: product?.id!, quantity: updatedQuantity }))
        }
        else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeItemAsync({ productId: product?.id!, quantity: updatedQuantity }))
        }
    }

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity)
        }
        if (!product) dispatch(fetchProductByIdAsync(parseInt(id!)))
    }, [id, item, dispatch, product])
    if (productState.includes('pending')) return <Typography variant='h2'>Product loading...</Typography>
    if (!product) return <Typography variant='h2'>Not found</Typography>

    return (
        <Container>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='h3' >{product.name}</Typography >
                    <Divider />
                    <Typography variant='h3' color='primary.main'>${product.price.toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }} >Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Quantity In Stock</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleInputChange}
                                variant='outlined'
                                type='number'
                                fullWidth
                                label='Quantity in Cart'
                                value={quantity}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                disabled={item?.quantity === quantity || (!item && quantity === 0)}
                                loading={status.includes('pending')}
                                onClick={handleUpdateQuantity}
                                color='primary'
                                fullWidth
                                sx={{ height: 56 }}
                                size='large'
                                variant='contained'
                            >
                                {quantity > 0 ? "Update Basket" : "Add to Cart"}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetails