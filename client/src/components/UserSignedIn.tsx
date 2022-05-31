import { Button, Menu, Fade, MenuItem, Avatar } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../store/account/accountSlice';
import { clearBasket } from '../store/basket/basketSlice';
import { useAppDispatch, useAppSelector } from '../store/configStore';

const UserSignedIn = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}

            >
                <Avatar sx={{ background: 'secondary', typography: 'h5', color: 'white' }}>
                    {user?.email?.charAt(0)}
                </Avatar>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to='/orders'>Orders</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(logout())
                    dispatch(clearBasket())
                }}>Logout</MenuItem>
            </Menu>
        </>
    );
}

export default UserSignedIn