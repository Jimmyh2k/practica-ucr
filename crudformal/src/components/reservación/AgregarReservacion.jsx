import React, { Fragment, useState } from "react";
import { Button, Typography, Box, Step, Stepper, StepButton, Paper } from '@mui/material';
import SeleccionarFechas from "./SeleccionarFechas";
import SeleccionarCliente from "./SeleccionarCliente";
import SeleccionarHabitacion from "./SeleccionarHabitacion";
import { FacturaProvider } from '../../context/FacturaContext';
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

function AgregarReservacion() {
    const steps = ['Fechas de hospedaje', 'Cliente', 'Habitación'];


    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    return (
        <Fragment>
            <FacturaProvider>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box sx={{ width: { xs: '95%', sm: '70%', md: '50%' }, pt: 10 }}>
                        <Stepper nonLinear activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {allStepsCompleted() ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>Paso {activeStep + 1}</Typography>
                                    <Box sx={{ width: '100%', height: '40rem' }}>
                                        {
                                            activeStep + 1 === 1 ? (
                                                <SeleccionarFechas />
                                            ) : (
                                                activeStep + 1 === 2 ? (
                                                    <SeleccionarCliente />
                                                ) : (
                                                    <SeleccionarHabitacion />
                                                )
                                            )
                                        }
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1, pb: 1 }}>
                                        <Button
                                            color="inherit"
                                            variant="contained" size="small"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Regresar
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button variant="contained" size="small" onClick={handleNext} sx={{ mr: 1 }}>
                                            Siguiente
                                        </Button>
                                        {activeStep !== steps.length &&
                                            (completed[activeStep] ? (
                                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                    Paso {activeStep + 1} ya completado
                                                </Typography>
                                            ) : (
                                                <Button variant="contained" size="small" onClick={handleComplete}>
                                                    {completedSteps() === totalSteps() - 1
                                                        ? 'Finalizar'
                                                        : 'Completar paso'}
                                                </Button>
                                            ))}
                                    </Box>
                                </React.Fragment>
                            )}
                        </div>
                    </Box>
                </Box>
            </FacturaProvider>
        </Fragment>

        // import React, {Fragment, useState} from "react";
        // import clienteAxios from "../../config/axios";
        // import {useNavigate} from 'react-router-dom'
        // import Swal from "sweetalert2";

        // function AgregarReservacion(){

        //     const navigate = useNavigate();

        //     //Se guarda primero el reservacion en el useState
        //     const[reservacion,guardarReservaciones] = useState({
        //         idReservacion:0,
        //         cantidadDePersonas:0,
        //         checkIn: new Date(),
        //         checkOut: new Date(),
        //         comentarios:'',
        //         idCliente:0,
        //         idHabitacion:0
        //     });

        //     //Leer los datos del formulario
        //     const actualizarState = e => {
        //             //Almacena lo que el usuario escribe en el state
        //             guardarReservaciones({
        //                 ...reservacion,
        //                 [e.target.name] : e.target.value
        //             })

        //     }

        //     //validar el formulario
        //     const ValidarReservacion = () => {
        //         //Destructuring
        //         const {idReservacion, cantidadDePersonas, checkIn, checkOut,comentarios, idCliente, idHabitacion} = reservacion;

        //         //Revisa que no haya campos vacíos
        //         let valido =  !comentarios.length;

        //          console.log(valido);

        //         //Si hay algo retorna false al disable, si no retorna true al disable
        //         return valido;
        //     }

        //     //Añade en la rest api una reservacion nueva
        //     const GuardarReservacion = e =>{
        //         e.preventDefault();

        //         clienteAxios.post('/reservacion', reservacion)
        //         .then(res => {
        //             console.log(res)
        //             Swal.fire(
        //                 'Se agregó la reservacion',
        //                 res.data.mensaje,
        //                 'success'
        //             )
        //         });
        //         navigate('/reservacion');
        //     }


        //     return(
        //         <Fragment>
        //             <h2>Agregar Reservacion</h2>

        //             <form onSubmit={GuardarReservacion}>
        //                 <legend>Llena todos los campos</legend>

        //                 <div className="campo">
        //                     <label>Cantidad de Personas:</label>
        //                     <input
        //                         type="number"
        //                         placeholder="Ingrese el nombre"
        //                         name="cantidadDePersonas"
        //                         onChange={actualizarState}
        //                     />
        //                 </div>

        //                 <div className="campo">
        //                     <label>checkIn:</label>
        //                     <input
        //                         type="date"
        //                         placeholder="Ingrese el checkIn"
        //                         name="checkIn"
        //                         onChange={actualizarState}
        //                     />
        //                 </div>
        //                 <div className="campo">
        //                     <label>checkOut:</label>
        //                     <input
        //                         type="date"
        //                         placeholder="Ingrese el checkOut"
        //                         name="checkOut"
        //                         onChange={actualizarState}
        //                     />
        //                 </div>
        //                 <div className="campo">
        //                     <label>comentarios:</label>
        //                     <input
        //                         type="text"
        //                         placeholder="Ingrese los comentarios"
        //                         name="comentarios"
        //                         onChange={actualizarState}
        //                     />
        //                 </div>
        //                 <div className="campo">
        //                     <label>idCliente:</label>
        //                     <input
        //                         type="number"
        //                         placeholder="Ingrese el client"
        //                         name="idCliente"
        //                         onChange={actualizarState}
        //                     />
        //                 </div>
        //                 <div className="campo">
        //                     <label>idHabitacion:</label>
        //                     <input
        //                         type="number"
        //                         placeholder="Ingrese la habi"
        //                         name="idHabitacion"
        //                         onChange={actualizarState}
        //                     />
        //                 </div>

        //                 <div className="enviar">
        //                         <input
        //                             type="submit"
        //                             className="btn btn-azul"
        //                             value="Agregar Reservacion"
        //                             disabled={ValidarReservacion()}
        //                         />
        //                 </div>

        //             </form>

        //         </Fragment>
    )
}

export default AgregarReservacion;