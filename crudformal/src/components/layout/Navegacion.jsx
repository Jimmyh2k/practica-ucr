import React from "react";

import {Link} from 'react-router-dom'

const Navegacion = ()=>{
    return(
        
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={"/"} className="clientes">Clientes</Link>
                <Link to="/habitacion" className="productos">Habitación</Link>
                <Link to="/reservacion" className="pedidos">Reservación</Link>
            </nav>
        </aside>

    )
}
export default Navegacion;