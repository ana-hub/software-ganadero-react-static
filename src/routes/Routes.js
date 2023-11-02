import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomLayout from '../components/CustomLayout';
import Login from '../pages/Login';
import Usuarios from '../pages/Usuarios';
import Inventario from '../pages/Inventario';
import Home from "../pages/Home";
import RegistroAnimales from "../pages/RegistroAnimales";
import PlanPastoreo from "../pages/PlanPastoreo";
import GestionSaludAnimales from "../pages/GestionSaludAnimales";
import SistemaDeVenta from "../pages/SistemaDeVenta";
import RegistroTrabajadores from "../pages/RegistroTrabajadores";
import RegistroActividad from "../pages/RegistroActividad";
import AnalisisRendimiento from "../pages/AnalisisRendimiento"; // Agregué la importación faltante

const Router = () => {
    const router = createBrowserRouter(
        [
            { path: "/", element: <Login /> },
            { path: "/home", element: <CustomLayout> <Home /> </CustomLayout> },
            { path: "/control-inventario", element: <CustomLayout> <Inventario /> </CustomLayout> },
            { path: "/registro-actividad", element: <CustomLayout> <RegistroActividad /> </CustomLayout> },
            { path: "/registro-animales", element: <CustomLayout> <RegistroAnimales /> </CustomLayout> },
            { path: "/plan-pastoreo", element: <CustomLayout> <PlanPastoreo /> </CustomLayout> },
            { path: "/gestion-salud", element: <CustomLayout> <GestionSaludAnimales /> </CustomLayout> },
            { path: "/analisis-rendimiento", element: <CustomLayout> <AnalisisRendimiento /> </CustomLayout> },
            { path: "/sistema-venta", element: <CustomLayout> <SistemaDeVenta /> </CustomLayout> },
            { path: "/registro-trabajadores", element: <CustomLayout> <RegistroTrabajadores /> </CustomLayout> } // Agregué la ruta correspondiente al Registro de Trabajadores
        ]
    );
    return (
        <RouterProvider router={router} />
    );
};

export default Router;
