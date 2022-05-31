import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import BasketSummary from '../../components/BasketSumary';
import BasketTable from '../../components/BasketTable';
import { useAppSelector } from '../../store/configStore';


export default function Review() {
  const { basket } = useAppSelector(state => state.basket);
  const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <BasketTable items={basket?.items!} isBasket={false} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />

        </Grid>
      </Grid>
    </>
  );
}