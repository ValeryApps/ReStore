import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../components/AppTextInput';
import AppCheckbox from '../../components/AppCheckbox';

export default function PaymentForm() {
  const { control } = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput name='nameOnCard' control={control} label='Card Name' />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput name='cardNumber' control={control} label='Card Number' />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput name='expDate' control={control} label='Expiry Date' />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput name='cvv' control={control} label='CVV' />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox disabled={false} name="saveCard" label="Remember credit card details for next time" control={control} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}