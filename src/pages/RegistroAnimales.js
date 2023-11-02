import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, DatePicker, Select } from "antd";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;

const baseUrl = "http://localhost:3001/animales"; // Reemplaza con la URL de tu API

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function RegistroAnimales() {
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [animal, setAnimal] = useState({
        id: '',
        numeroIdentificacion: '',
        raza: '',
        edad: 0,
        peso: 0,
        historialSalud: '',
        fechaNacimiento: null,
    });

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnimal({
            ...animal,
            [name]: value
        });
    };

    const handleDateChange = (date, dateString) => {
        setAnimal({
            ...animal,
            fechaNacimiento: date
        });
    };

    const handleSelectChange = (value) => {
        setAnimal({
            ...animal,
            raza: value
        });
    };

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
            title: "Edad",
            dataIndex: "edad",
            key: "edad",
        },
        {
            title: "Peso",
            dataIndex: "peso",
            key: "peso",
        },
        {
            title: "Historial de Salud",
            dataIndex: "historialSalud",
            key: "historialSalud",
        },
        {
            title: "Fecha de Nacimiento",
            dataIndex: "fechaNacimiento",
            key: "fechaNacimiento",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <>
                    <Button type="primary" onClick={() => seleccionarAnimal(fila)}>Editar</Button>
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
        delete animal.id;
        await axios.post(baseUrl, animal)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const seleccionarAnimal = (animal) => {
        setAnimal(animal);
        abrirCerrarModalInsertar();
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div className="App">
            <br />
            <br />
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Registrar Nuevo Animal</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={data} />

            <Modal
                visible={modalInsertar}
                title="Registrar Animal"
                destroyOnClose={true}
                onCancel={abrirCerrarModalInsertar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPost}>Guardar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Número de Identificación">
                        <Input name="numeroIdentificacion" onChange={handleChange} />
                    </Item>

                    <Item label="Raza">
                        <Select name="raza" onChange={handleSelectChange}>
                            <Option value="Holstein">Holstein</Option>
                            <Option value="Angus">Angus</Option>
                            <Option value="Hereford">Hereford</Option>
                            {/* Agrega más opciones según las razas disponibles */}
                        </Select>
                    </Item>

                    <Item label="Edad">
                        <Input type="number" name="edad" onChange={handleChange} />
                    </Item>

                    <Item label="Peso">
                        <Input type="number" name="peso" onChange={handleChange} />
                    </Item>

                    <Item label="Historial de Salud">
                        <Input name="historialSalud" onChange={handleChange} />
                    </Item>

                    <Item label="Fecha de Nacimiento">
                        <DatePicker name="fechaNacimiento" onChange={handleDateChange} />
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}

export default RegistroAnimales;
