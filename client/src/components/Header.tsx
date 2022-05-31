import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Switch, Toolbar, Typography, List, ListItem, Badge, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import { Link, NavLink } from "react-router-dom"
import { useAppSelector } from "../store/configStore"
import UserSignedIn from "./UserSignedIn"


interface Prop {
    switchColor: () => void
}
const navStyles =
{
    color: 'inherit', textDecoration: 'none',
    "&:hover": {
        backgroundColor: '#90ffcc',
        color: '#000'
    },
    '&.active': {
        backgroundColor: 'secondary.main'
    }
}
const Header = ({ switchColor }: Prop) => {
    const { user } = useAppSelector(state => state.account)
    const { basket } = useAppSelector(state => state.basket);


    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    const midLinks = [
        { title: 'Catalog', path: '/catalog' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' },
    ]
    const AccountLinks = [
        { title: 'Register', path: '/Register' },
        { title: 'Login', path: '/Login' },

    ]
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex'>
                    <Typography variant="h6" component={NavLink} to='/' sx={navStyles}>
                        RE-STORE
                    </Typography>
                    <Switch onChange={switchColor} />
                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            key={path}
                            component={NavLink}
                            to={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex'>


                    <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {user ? (<UserSignedIn />) : (<List sx={{ display: 'flex' }}>
                        {AccountLinks.map(({ title, path }) => (
                            <ListItem
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>)}

                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header