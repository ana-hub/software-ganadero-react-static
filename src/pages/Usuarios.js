import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import axios from "axios";

const { Item } = Form;
const baseUrl = "http://localhost:3001/usuarios";

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function Usuarios() {
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [usuario, setUsuario] = useState({
        id: '',
        nombre: '',
        documentoIdentidad: '',
        edad: '',
        numeroContacto: '',
        fechaVinculacion: '',
        salario: '',
        rol: ''
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
        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    const seleccionarUsuario = (usuario, caso) => {
        setUsuario(usuario);
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
            title: "Documento de Identidad",
            dataIndex: "documentoIdentidad",
            key: "documentoIdentidad",
        },
        {
            title: "Edad",
            dataIndex: "edad",
            key: "edad",
        },
        {
            title: "Número de Contacto",
            dataIndex: "numeroContacto",
            key: "numeroContacto",
        },
        {
            title: "Fecha de Vinculación",
            dataIndex: "fechaVinculacion",
            key: "fechaVinculacion",
        },
        {
            title: "Salario",
            dataIndex: "salario",
            key: "salario",
        },
        {
            title: "Rol",
            dataIndex: "rol",
            key: "rol",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <>
                    <Button type="primary" onClick={() => seleccionarUsuario(fila, "Editar")}>Editar</Button> {"   "}
                    <Button type="primary" danger onClick={() => seleccionarUsuario(fila, "Eliminar")}>Eliminar</Button>
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
        delete usuario.id;
        await axios.post(baseUrl, usuario)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPut = async () => {
        await axios.put(baseUrl + "/" + usuario.id, usuario)
            .then(response => {
                var dataAuxiliar = data;
                dataAuxiliar.map(elemento => {
                    if (elemento.id === usuario.id) {
                        elemento.nombre = usuario.nombre;
                        elemento.documentoIdentidad = usuario.documentoIdentidad;
                        elemento.edad = usuario.edad;
                        elemento.numeroContacto = usuario.numeroContacto;
                        elemento.fechaVinculacion = usuario.fechaVinculacion;
                        elemento.salario = usuario.salario;
                        elemento.rol = usuario.rol;
                    }
                });
                setData(dataAuxiliar);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionDelete = async () => {
        await axios.delete(baseUrl + "/" + usuario.id)
            .then(response => {
                setData(data.filter(elemento => elemento.id !== usuario.id));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div className="App">
            <br />
            <br />
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Insertar Nuevo Usuario</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={data} />

            <Modal
                visible={modalInsertar}
                title="Insertar Usuario"
                destroyOnClose={true}
                onCancel={abrirCerrarModalInsertar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPost}>Insertar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Nombre">
                        <Input name="nombre" onChange={handleChange} />
                    </Item>

                    <Item label="Documento de Identidad">
                        <Input name="documentoIdentidad" onChange={handleChange} />
                    </Item>

                    <Item label="Edad">
                        <Input name="edad" onChange={handleChange} />
                    </Item>

                    <Item label="Número de Contacto">
                        <Input name="numeroContacto" onChange={handleChange} />
                    </Item>

                    <Item label="Fecha de Vinculación">
                        <Input name="fechaVinculacion" onChange={handleChange} />
                    </Item>

                    <Item label="Salario">
                        <Input name="salario" onChange={handleChange} />
                    </Item>

                    <Item label="Rol">
                        <Input name="rol" onChange={handleChange} />
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalEditar}
                title="Editar Usuario"
                onCancel={abrirCerrarModalEditar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPut}>Editar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Nombre">
                        <Input name="nombre" onChange={handleChange} value={usuario && usuario.nombre} />
                    </Item>

                    <Item label="Documento de Identidad">
                        <Input name="documentoIdentidad" onChange={handleChange} value={usuario && usuario.documentoIdentidad} />
                    </Item>

                    <Item label="Edad">
                        <Input name="edad" onChange={handleChange} value={usuario && usuario.edad} />
                    </Item>

                    <Item label="Número de Contacto">
                        <Input name="numeroContacto" onChange={handleChange} value={usuario && usuario.numeroContacto} />
                    </Item>

                    <Item label="Fecha de Vinculación">
                        <Input name="fechaVinculacion" onChange={handleChange} value={usuario && usuario.fechaVinculacion} />
                    </Item>

                    <Item label="Salario">
                        <Input name="salario" onChange={handleChange} value={usuario && usuario.salario} />
                    </Item>

                    <Item label="Rol">
                        <Input name="rol" onChange={handleChange} value={usuario && usuario.rol} />
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalEliminar}
                onCancel={abrirCerrarModalEliminar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalEliminar}>No</Button>,
                    <Button type="primary" danger onClick={peticionDelete}>Sí</Button>,
                ]}
            >
                Estás seguro que deseas eliminar al usuario <b>{usuario && usuario.nombre}</b>?
            </Modal>
        </div>
    );
}

export default Usuarios;
