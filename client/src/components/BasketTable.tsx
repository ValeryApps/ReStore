import { Remove, Add, Delete } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material"
import { BasketItem } from "../models/basket"
import { removeItemAsync, addItemToBasketAsync } from "../store/basket/basketSlice"
import { useAppDispatch, useAppSelector } from "../store/configStore"
interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}
const BasketTable = ({ items, isBasket = true }: Props) => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(state => state.basket);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">subTotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 4 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                            <TableCell align="right">
                                {isBasket &&
                                    <LoadingButton color="error" onClick={() => dispatch(removeItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))} loading={status === `pendingRemoveItem${item.productId}rem`}>
                                        <Remove />
                                    </LoadingButton>
                                }
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton color="primary" onClick={() => dispatch(addItemToBasketAsync({ productId: item.productId, }))} loading={status === `pending${item.productId}`}>
                                        <Add />
                                    </LoadingButton>
                                }

                            </TableCell>
                            <TableCell align="right">$ {(item.price * item.quantity)
                                .toFixed(2)}</TableCell>
                            {isBasket &&
                                <TableCell >
                                    <LoadingButton color='error' onClick={() => dispatch(removeItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))} loading={status === `pendingRemoveItem${item.productId}del`}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasketTable