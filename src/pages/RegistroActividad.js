import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, Select, DatePicker } from "antd";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;
const baseUrl = "http://localhost:3001/actividades"; // Cambia la URL a la API de tu servidor

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function RegistroActividad() {
    const [dataActividades, setDataActividades] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [actividad, setActividad] = useState({
        id: '',
        tipo: '',
        descripcion: '',
        fecha: ''
    });

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    };

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setActividad({
            ...actividad,
            [name]: value
        });
    };

    const handleChangeSelect = (value, name) => {
        setActividad({
            ...actividad,
            [name]: value
        });
    };

    const seleccionarActividad = (actividad, caso) => {
        setActividad(actividad);
        (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tipo",
            dataIndex: "tipo",
            key: "tipo",
        },
        {
            title: "Descripción",
            dataIndex: "descripcion",
            key: "descripcion",
        },
        {
            title: "Fecha",
            dataIndex: "fecha",
            key: "fecha",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <>
                    <Button type="primary" onClick={() => seleccionarActividad(fila, "Editar")}>Editar</Button> {"   "}
                    <Button type="primary" danger onClick={() => seleccionarActividad(fila, "Eliminar")}>Eliminar</Button>
                </>
            ),
        },
    ];

    const peticionGetActividades = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setDataActividades(response.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPostActividad = async () => {
        delete actividad.id;
        await axios.post(baseUrl, actividad)
            .then(response => {
                setDataActividades(dataActividades.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPutActividad = async () => {
        await axios.put(baseUrl + "/" + actividad.id, actividad)
            .then(response => {
                var dataAuxiliar = dataActividades;
                dataAuxiliar.map(elemento => {
                    if (elemento.id === actividad.id) {
                        elemento.tipo = actividad.tipo;
                        elemento.descripcion = actividad.descripcion;
                        elemento.fecha = actividad.fecha;
                    }
                });
                setDataActividades(dataAuxiliar);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionDeleteActividad = async () => {
        await axios.delete(baseUrl + "/" + actividad.id)
            .then(response => {
                setDataActividades(dataActividades.filter(elemento => elemento.id !== actividad.id));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        peticionGetActividades();
    }, []);

    return (
        <div className="App">
            <br />
            <br />
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Agregar Nueva Actividad</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={dataActividades} />

            <Modal
                visible={modalInsertar}
                title="Agregar Actividad"
                destroyOnClose={true}
                onCancel={abrirCerrarModalInsertar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPostActividad}>Agregar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Tipo">
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Selecciona el tipo de actividad"
                            name="tipo"
                            onChange={(value) => handleChangeSelect(value, "tipo")}
                        >
                            <Option value="Alimentación de animales">Alimentación de animales</Option>
                            <Option value="Pastoreo">Pastoreo</Option>
                            <Option value="Mantenimiento de infraestructura">Mantenimiento de infraestructura</Option>
                            <Option value="Otra actividad">Otra actividad</Option>
                        </Select>
                    </Item>

                    <Item label="Descripción">
                        <Input name="descripcion" onChange={handleChange} />
                    </Item>

                    <Item label="Fecha">
                        <DatePicker
                            style={{ width: "100%" }}
                            name="fecha"
                            onChange={(date, dateString) => handleChangeSelect(dateString, "fecha")}
                        />
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalEditar}
                title="Editar Actividad"
                onCancel={abrirCerrarModalEditar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPutActividad}>Editar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Tipo">
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Selecciona el tipo de actividad"
                            name="tipo"
                            value={actividad && actividad.tipo}
                            onChange={(value) => handleChangeSelect(value, "tipo")}
                        >
                            <Option value="Alimentación de animales">Alimentación de animales</Option>
                            <Option value="Pastoreo">Pastoreo</Option>
                            <Option value="Mantenimiento de infraestructura">Mantenimiento de infraestructura</Option>
                            <Option value="Otra actividad">Otra actividad</Option>
                        </Select>
                    </Item>

                    <Item label="Descripción">
                        <Input name="descripcion" onChange={handleChange} value={actividad && actividad.descripcion} />
                    </Item>

                    <Item label="Fecha">
                        <DatePicker
                            style={{ width: "100%" }}
                            name="fecha"
                            onChange={(date, dateString) => handleChangeSelect(dateString, "fecha")}
                            value={actividad && actividad.fecha ? actividad.fecha : null}
                        />
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalEliminar}
                onCancel={abrirCerrarModalEliminar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalEliminar}>No</Button>,
                    <Button type="primary" danger onClick={peticionDeleteActividad}>Sí</Button>,
                ]}
            >
                ¿Estás seguro que deseas eliminar esta actividad?
            </Modal>
        </div>
    );
}

export default RegistroActividad;

