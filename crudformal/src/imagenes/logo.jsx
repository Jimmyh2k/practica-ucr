import React from "react";
import { SvgIcon, Icon } from '@mui/material';
import { ReactComponent as Logo } from './logo.svg';
import logo from './logo.png';

const LogoIcon = (props) => {

    const { width, height } = props;
    console.log(width, height);
    return (
        <img src={logo} alt="Logo" style={{
            width: `${width}px`,
            height: `${height}px`
        }} />
    );
}

export default LogoIcon;