import React, { useContext } from "react";
import { CRMContext } from '../../context/CRMContext';
import { Link } from 'react-router-dom'

import Header from './Header.jsx'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LogoIcon from '../../imagenes/logo';
import GroupsIcon from '@mui/icons-material/Groups';
import HotelIcon from '@mui/icons-material/Hotel';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import { ListItemIcon, ListItemText } from '@mui/material'

const pages = [
    { path: '/', name: 'Clientes', key: 'clientes', icon: <GroupsIcon fontSize="small" /> },
    { path: '/habitacion', name: 'Habitación', key: 'habitacion', icon: <HotelIcon fontSize="small" /> },
    { path: '/reservacion', name: 'Reservación', key: 'reservacion', icon: <NightShelterIcon fontSize="small" /> },
    { path: '/factura', name: 'Factura', key: 'factura', icon: <NightShelterIcon fontSize="small" /> }
]

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navegacion = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    const [auth, guardarAuth] = useContext(CRMContext);

    if (!auth.auth) return null;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <LogoIcon width='50' height='50' />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link} to={'/'}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Administración
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.key} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                                    <Typography textAlign="center"></Typography>
                                    <ListItemIcon>
                                        {page.icon}
                                    </ListItemIcon>
                                    <ListItemText>{page.name}</ListItemText>
                                </MenuItem>
                            ))}


                        </Menu>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <LogoIcon width='40' height='40' />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link} to={'/'}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Administración
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.key}
                                onClick={handleCloseNavMenu}
                                component={Link} to={page.path}
                                startIcon={page.icon}
                                size="small"
                                sx={{ my: 2, mx: 2, color: 'white' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Header />
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navegacion;