import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

function Habitacion(props){
//console.log(props.habitacion.nombre); //Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const {idHabitacion, numero, camasIndividuales, camasDobles,recomendacionPrecioNacional, recomendacionPrecioExtranjero} = props.habitacion;

    //Eliminar Habitacion
    const eliminarHabitacion = (id) => {
        
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "¡Los cambios no se pueden revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/habitacion/${idHabitacion}`)
                .then(res => {
                    Swal.fire(  
                        'Eliminado', 
                        res.data.mensaje, 
                        'success'
                    );
                });
            }
          })
    }

    return(
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">Numero de Hab.: {numero}</p>
                        <p className="empresa">Camas Individuales : {camasIndividuales}</p>
                        <p className="empresa">Camas Dobles:{camasDobles}</p>
                        <p className="empresa">Precio Nacionales : {recomendacionPrecioNacional}</p>
                        <p className="empresa">Precio Extranjeros:{recomendacionPrecioExtranjero}</p>
                    </div>
                    <div className="acciones">
                        <a href="#" className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Habitacion
                        </a>

                        <button 
                            type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={ () => eliminarHabitacion(idHabitacion)}>
                                
                            <i className="fas fa-times"></i>
                            Eliminar Habitacion
                        </button>
                    </div>
                </li>
    )
}

export default Habitacion;