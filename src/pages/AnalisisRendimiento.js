import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const baseUrl = "http://localhost:3001/rendimiento_animales"; // URL de tu servidor JSON

function AnalisisRendimiento() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Obtener datos de rendimiento de los animales desde el servidor JSON
        axios.get(baseUrl).then((response) => {
            setData(response.data);
        });
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Número de Identificación",
            dataIndex: "numeroIdentificacion",
            key: "numeroIdentificacion",
        },
        {
            title: "Raza",
            dataIndex: "raza",
            key: "raza",
        },
        {
            title: "Producción de Leche/Carne",
            dataIndex: "produccion",
            key: "produccion",
        },
    ];

    return (
        <div className="App">
            <br />
            <h1>Análisis de Datos de Rendimiento</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default AnalisisRendimiento;
