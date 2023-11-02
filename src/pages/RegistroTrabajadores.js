import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;
const baseUrl = "http://localhost:3001/trabajadores"; // Cambia la URL a la API de tu servidor

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function RegistroTrabajadores() {
    const [dataTrabajadores, setDataTrabajadores] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [trabajador, setTrabajador] = useState({
        id: '',
        nombre: '',
        apellido: '',
        numeroIdentificacion: '',
        historialEmpleo: '',
        salario: 0,
        permisos: [],
        certificaciones: []
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
        setTrabajador({
            ...trabajador,
            [name]: value
        });
    };

    const handleChangeSelect = (value, name) => {
        setTrabajador({
            ...trabajador,
            [name]: value
        });
    };

    const seleccionarTrabajador = (trabajador, caso) => {
        setTrabajador(trabajador);
        (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
        },
        {
            title: "Apellido",
            dataIndex: "apellido",
            key: "apellido",
        },
        {
            title: "Número de Identificación",
            dataIndex: "numeroIdentificacion",
            key: "numeroIdentificacion",
        },
        {
            title: "Historial de Empleo",
            dataIndex: "historialEmpleo",
            key: "historialEmpleo",
        },
        {
            title: "Salario",
            dataIndex: "salario",
            key: "salario",
        },
        {
            title: "Permisos",
            dataIndex: "permisos",
            key: "permisos",
        },
        {
            title: "Certificaciones",
            dataIndex: "certificaciones",
            key: "certificaciones",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <>
                    <Button type="primary" onClick={() => seleccionarTrabajador(fila, "Editar")}>Editar</Button> {"   "}
                    <Button type="primary" danger onClick={() => seleccionarTrabajador(fila, "Eliminar")}>Eliminar</Button>
                </>
            ),
        },
    ];

    const peticionGetTrabajadores = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setDataTrabajadores(response.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPostTrabajador = async () => {
        delete trabajador.id;
        await axios.post(baseUrl, trabajador)
            .then(response => {
                setDataTrabajadores(dataTrabajadores.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPutTrabajador = async () => {
        await axios.put(baseUrl + "/" + trabajador.id, trabajador)
            .then(response => {
                var dataAuxiliar = dataTrabajadores;
                dataAuxiliar.map(elemento => {
                    if (elemento.id === trabajador.id) {
                        elemento.nombre = trabajador.nombre;
                        elemento.apellido = trabajador.apellido;
                        elemento.numeroIdentificacion = trabajador.numeroIdentificacion;
                        elemento.historialEmpleo = trabajador.historialEmpleo;
                        elemento.salario = trabajador.salario;
                        elemento.permisos = trabajador.permisos;
                        elemento.certificaciones = trabajador.certificaciones;
                    }
                });
                setDataTrabajadores(dataAuxiliar);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionDeleteTrabajador = async () => {
        await axios.delete(baseUrl + "/" + trabajador.id)
            .then(response => {
                setDataTrabajadores(dataTrabajadores.filter(elemento => elemento.id !== trabajador.id));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        peticionGetTrabajadores();
    }, []);

    return (
        <div className="App">
            <br />
            <br />
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Insertar Nuevo Trabajador</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={dataTrabajadores} />

            <Modal
                visible={modalInsertar}
                title="Insertar Trabajador"
                destroyOnClose={true}
                onCancel={abrirCerrarModalInsertar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPostTrabajador}>Insertar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Nombre">
                        <Input name="nombre" onChange={handleChange} />
                    </Item>

                    <Item label="Apellido">
                        <Input name="apellido" onChange={handleChange} />
                    </Item>

                    <Item label="Número de Identificación">
                        <Input name="numeroIdentificacion" onChange={handleChange} />
                    </Item>

                    <Item label="Historial de Empleo">
                        <Input name="historialEmpleo" onChange={handleChange} />
                    </Item>

                    <Item label="Salario">
                        <Input name="salario" onChange={handleChange} />
                    </Item>

                    <Item label="Permisos">
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Selecciona los permisos"
                            name="permisos"
                            onChange={(value) => handleChangeSelect(value, "permisos")}
                        >
                            <Option value="Permiso A">Permiso A</Option>
                            <Option value="Permiso B">Permiso B</Option>
                            <Option value="Permiso C">Permiso C</Option>
                        </Select>
                    </Item>

                    <Item label="Certificaciones">
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Selecciona las certificaciones"
                            name="certificaciones"
                            onChange={(value) => handleChangeSelect(value, "certificaciones")}
                        >
                            <Option value="Certificación X">Certificación X</Option>
                            <Option value="Certificación Y">Certificación Y</Option>
                            <Option value="Certificación Z">Certificación Z</Option>
                        </Select>
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalEditar}
                title="Editar Trabajador"
                onCancel={abrirCerrarModalEditar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPutTrabajador}>Editar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Nombre">
                        <Input name="nombre" onChange={handleChange} value={trabajador && trabajador.nombre} />
                    </Item>

                    <Item label="Apellido">
                        <Input name="apellido" onChange={handleChange} value={trabajador && trabajador.apellido} />
                    </Item>

                    <Item label="Número de Identificación">
                        <Input name="numeroIdentificacion" onChange={handleChange} value={trabajador && trabajador.numeroIdentificacion} />
                    </Item>

                    <Item label="Historial de Empleo">
                        <Input name="historialEmpleo" onChange={handleChange} value={trabajador && trabajador.historialEmpleo} />
                    </Item>

                    <Item label="Salario">
                        <Input name="salario" onChange={handleChange} value={trabajador && trabajador.salario} />
                    </Item>

                    <Item label="Permisos">
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Selecciona los permisos"
                            name="permisos"
                            value={trabajador && trabajador.permisos}
                            onChange={(value) => handleChangeSelect(value, "permisos")}
                        >
                            <Option value="Permiso A">Permiso A</Option>
                            <Option value="Permiso B">Permiso B</Option>
                            <Option value="Permiso C">Permiso C</Option>
                        </Select>
                    </Item>

                    <Item label="Certificaciones">
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Selecciona las certificaciones"
                            name="certificaciones"
                            value={trabajador && trabajador.certificaciones}
                            onChange={(value) => handleChangeSelect(value, "certificaciones")}
                        >
                            <Option value="Certificación X">Certificación X</Option>
                            <Option value="Certificación Y">Certificación Y</Option>
                            <Option value="Certificación Z">Certificación Z</Option>
                        </Select>
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalEliminar}
                onCancel={abrirCerrarModalEliminar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalEliminar}>No</Button>,
                    <Button type="primary" danger onClick={peticionDeleteTrabajador}>Sí</Button>,
                ]}
            >
                ¿Estás seguro que deseas eliminar al trabajador <b>{trabajador && trabajador.nombre} {trabajador && trabajador.apellido}</b>?
            </Modal>
        </div>
    );
}

export default RegistroTrabajadores;
