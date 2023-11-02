import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, DatePicker, Select } from "antd";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;

const baseUrl = "http://localhost:3001/pastoreo"; // Reemplaza con la URL de tu API

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function PlanPastoreo() {
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [pastoreo, setPastoreo] = useState({
        id: '',
        fecha: null,
        areaPastoreo: '',
        alimentacion: '',
        calidadPasto: '',
        nivelesAgua: '',
    });

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPastoreo({
            ...pastoreo,
            [name]: value
        });
    };

    const handleDateChange = (date, dateString) => {
        setPastoreo({
            ...pastoreo,
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
            title: "Área de Pastoreo",
            dataIndex: "areaPastoreo",
            key: "areaPastoreo",
        },
        {
            title: "Alimentación",
            dataIndex: "alimentacion",
            key: "alimentacion",
        },
        {
            title: "Calidad del Pasto",
            dataIndex: "calidadPasto",
            key: "calidadPasto",
        },
        {
            title: "Niveles de Agua",
            dataIndex: "nivelesAgua",
            key: "nivelesAgua",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <>
                    <Button type="primary" onClick={() => seleccionarPastoreo(fila)}>Editar</Button>
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
        delete pastoreo.id;
        await axios.post(baseUrl, pastoreo)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const seleccionarPastoreo = (pastoreo) => {
        setPastoreo(pastoreo);
        abrirCerrarModalInsertar();
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div className="App">
            <br />
            <br />
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Planificar Pastoreo</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={data} />

            <Modal
                visible={modalInsertar}
                title="Planificar Pastoreo"
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

                    <Item label="Área de Pastoreo">
                        <Input name="areaPastoreo" onChange={handleChange} />
                    </Item>

                    <Item label="Alimentación">
                        <Input name="alimentacion" onChange={handleChange} />
                    </Item>

                    <Item label="Calidad del Pasto">
                        <Input name="calidadPasto" onChange={handleChange} />
                    </Item>

                    <Item label="Niveles de Agua">
                        <Input name="nivelesAgua" onChange={handleChange} />
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PlanPastoreo;
