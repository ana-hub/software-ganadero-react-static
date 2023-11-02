import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, DatePicker, Select } from "antd";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;

const baseUrl = "http://localhost:3001/salud_animales"; // Reemplaza con la URL de tu API

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function GestionSaludAnimales() {
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [saludAnimal, setSaludAnimal] = useState({
        id: '',
        fecha: null,
        signosVitales: '',
        vacunaciones: '',
        tratamientosMedicos: '',
        enfermedades: '',
        informeDiagnostico: '',
    });

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSaludAnimal({
            ...saludAnimal,
            [name]: value
        });
    };

    const handleDateChange = (date, dateString) => {
        setSaludAnimal({
            ...saludAnimal,
            fecha: date
        });
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Fecha",
            dataIndex: "fecha",
            key: "fecha",
        },
        {
            title: "Signos Vitales",
            dataIndex: "signosVitales",
            key: "signosVitales",
        },
        {
            title: "Vacunaciones",
            dataIndex: "vacunaciones",
            key: "vacunaciones",
        },
        {
            title: "Tratamientos Médicos",
            dataIndex: "tratamientosMedicos",
            key: "tratamientosMedicos",
        },
        {
            title: "Enfermedades",
            dataIndex: "enfermedades",
            key: "enfermedades",
        },
        {
            title: "Informe de Diagnóstico",
            dataIndex: "informeDiagnostico",
            key: "informeDiagnostico",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <>
                    <Button type="primary" onClick={() => seleccionarSaludAnimal(fila)}>Editar</Button>
                </>
            ),
        },
    ];

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPost = async () => {
        delete saludAnimal.id;
        await axios.post(baseUrl, saludAnimal)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const seleccionarSaludAnimal = (saludAnimal) => {
        setSaludAnimal(saludAnimal);
        abrirCerrarModalInsertar();
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div className="App">
            <br />
            <br />
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Registrar Salud del Animal</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={data} />

            <Modal
                visible={modalInsertar}
                title="Registrar Salud del Animal"
                destroyOnClose={true}
                onCancel={abrirCerrarModalInsertar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPost}>Guardar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Fecha">
                        <DatePicker name="fecha" onChange={handleDateChange} />
                    </Item>

                    <Item label="Signos Vitales">
                        <Input name="signosVitales" onChange={handleChange} />
                    </Item>

                    <Item label="Vacunaciones">
                        <Input name="vacunaciones" onChange={handleChange} />
                    </Item>

                    <Item label="Tratamientos Médicos">
                        <Input name="tratamientosMedicos" onChange={handleChange} />
                    </Item>

                    <Item label="Enfermedades">
                        <Input name="enfermedades" onChange={handleChange} />
                    </Item>

                    <Item label="Informe de Diagnóstico">
                        <Input name="informeDiagnostico" onChange={handleChange} />
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}

export default GestionSaludAnimales;
