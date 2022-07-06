import React, { Fragment, useState } from "react";
import { Button, Typography, Box, Step, Stepper, StepButton, Paper } from '@mui/material';
import SeleccionarFechas from "./SeleccionarFechas";
import SeleccionarCliente from "./SeleccionarCliente";
import SeleccionarHabitacion from "./SeleccionarHabitacion";
import { DataProvider } from '../../context/DataContext';
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import AceptarNuevaReservacion from './AceptarNuevaReservacion'

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
            <DataProvider>
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
                                    <Box>
                                        <AceptarNuevaReservacion />
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button variant="contained" onClick={handleReset}>Reset</Button>
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
            </DataProvider>
        </Fragment>
    )
}

export default AgregarReservacion;