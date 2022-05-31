import { Container, Paper } from '@mui/material'
// import { useLocation } from 'react-router-dom';



const ServerErrors = () => {
    // const history = useHistory();
    // const { state } = useLocation();
    // const { error } = state;
    return (
        <Container component={Paper}>
            {/* {error ? (<>
                <Typography variant='h3' color='error' gutterBottom>{error.title}</Typography>
                <Divider />
                <Typography >{error.detail || "Server Eror"}</Typography>
            </>) : (
                <Typography variant='h5' gutterBottom>Server Error</Typography>
            )}
            <Button onClick={() => history.push('/catalog')}>Go back to the Store</Button> */}
        </Container>
    )
}

export default ServerErrors
