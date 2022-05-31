import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"
import { useEffect, useState } from "react"
import agent from "../../api/agent"
import LoadingComponent from "../../components/LoadingComponent"
import { Order } from "../../models/order"
import { currencyFormat } from "../../util/util"

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[] | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        agent.orders.list().then(orders => {
            setOrders(orders)
        }).catch(err => console.log(err)
        ).finally(() => setLoading(false))
    }, []);
    if (loading) return <LoadingComponent message="Loading orders..." />
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Order Date</TableCell>
                        <TableCell align="center">Order Status</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="center">{currencyFormat(order.total)}</TableCell>
                            <TableCell align="center">{order.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="center">{order.orderStatus}</TableCell>
                            <TableCell align="center">
                                <Button>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrdersPage