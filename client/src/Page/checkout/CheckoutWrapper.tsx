
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/configStore";

import CheckoutPage from "./CheckoutPage";

// const stripePromise = loadStripe("pk_test_51IzwHFErFg8RLNropkfWpnL37TzyR3eTpn0vY0EmatAeBwxlNPFJT2e2VtfIt2V8975y2W7kC1gcQ5tB5B332Y2x00yktsLIxN")

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    //useEffect(() => {
    //     agent.Payments.createPaymentIntent()
    //         .then(basket => dispatch(setBasket(basket)))
    //         .catch(error => console.log(error))
    //         .finally(() => setLoading(false));
    // }, [dispatch]);

    // if (loading) return <LoadingComponent message='Loading checkout...' />

    return (
        // <Elements stripe={stripePromise}>
        <CheckoutPage />
        //  </Elements>
    )
}