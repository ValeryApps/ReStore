import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configStore";
import { decrement, increment } from "../store/counterSlice";


const Counter = () => {
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter);
    return (
        <>
            <Typography variant="h3">
                Title: {title}
            </Typography>
            <Typography variant="h3">
                Data: {data}
            </Typography>
            <ButtonGroup>
                <Button color='primary' variant="contained" onClick={() => dispatch(increment(5))}>
                    Increase
                </Button>
                <Button color='error' variant="contained" onClick={() => dispatch(decrement(2))}>
                    Decrease
                </Button>
            </ButtonGroup>
        </>

    )
}

export default Counter