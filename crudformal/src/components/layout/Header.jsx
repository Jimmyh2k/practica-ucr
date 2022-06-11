import React, { useContext } from 'react';

import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Avatar, Box, IconButton, Menu, Typography, MenuItem } from '@mui/material';
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
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))} */}
                <MenuItem key={1} onClick={VerUsuarios}>
                    <Typography textAlign="center">
                        <i className="far fa-times-circle"></i>
                        Ver Usuarios
                    </Typography>
                </MenuItem>
                <MenuItem key={2} onClick={cerrarSesion}>
                    <Typography textAlign="center">
                        <i className="far fa-times-circle"></i>
                        Cerrar Sesión
                    </Typography>
                </MenuItem>
            </Menu>
        </Box >
        // <header className="barra">
        //     <div className="contenedor">
        //         <div className="contenido-barra">
        //             <h1>Administrador de Clientes</h1>


        //             {auth.auth ? (
        //                 <button
        //                     type="button"
        //                     className="btn btn-rojo"
        //                     onClick={cerrarSesion}
        //                 >
        //                     <i className="far fa-times-circle"></i>
        //                     Cerrar Sesión
        //                 </button>
        //             ) : null}
        //             {auth.auth ? (
        //                 <button
        //                     type="button"
        //                     className="btn btn-rojo"
        //                     onClick={VerUsuarios}
        //                 >
        //                     <i className="far fa-times-circle"></i>
        //                     Ver Usuarios
        //                 </button>
        //             ) : null}


        //         </div>

        //     </div>
        // </header>
    )

}

export default Header;