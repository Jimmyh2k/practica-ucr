import React from "react";
import logo from './logo.png';

const LogoIcon = (props) => {

    const { width, height } = props;
    return (
        <img src={logo} alt="Logo" style={{
            width: `${width}px`,
            height: `${height}px`
        }} />
    );
}

export default LogoIcon;