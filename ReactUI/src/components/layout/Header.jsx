import React, { useContext } from 'react';

import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Avatar, Box, IconButton, Menu, Typography, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = (props) => {

    const navigate = useNavigate();
    const [auth, guardarAuth] = useContext(CRMContext);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const cerrarSesion = () => {
        // auth.auth = false y el token se remueve
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        // redireccionar
        navigate('/iniciar-sesion');
    }

    const VerUsuarios = () => {
        handleCloseUserMenu();
        navigate('/usuario');
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon sx={{ color: 'white' }} fontSize="large" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key={1} onClick={VerUsuarios}>
                    <ListItemIcon>
                        <PeopleAltIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Ver Usuarios</ListItemText>
                </MenuItem>
                <MenuItem key={2} onClick={cerrarSesion}>
                    <ListItemIcon>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cerrar Sesión</ListItemText>
                </MenuItem>
            </Menu>
        </Box >
    )

}

export default Header;