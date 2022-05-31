import { Typography, Grid, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import BasketSummary from "../../components/BasketSumary";
import BasketTable from "../../components/BasketTable";
import { useAppSelector } from "../../store/configStore";


const BasketPage = () => {
    const { basket } = useAppSelector(state => state.basket);
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    // const deliveryFee = subtotal > 10000 ? 0 : 500;

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>
    return (
        <Container>
            <BasketTable items={basket.items} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} />
                    <Button variant='contained' color='primary' size='large' fullWidth component={Link} to='/checkout'>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default BasketPage