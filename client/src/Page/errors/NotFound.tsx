import { Button, Container, Divider, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Container component={Paper}  >
            <Typography alignSelf='center' variant='h3' color='error' gutterBottom>
                Oop! Not found!
            </Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog' >Back to the store</Button>
        </Container>
    )
}

export default NotFound
