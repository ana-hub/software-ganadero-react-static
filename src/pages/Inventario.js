import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import axios from "axios";

const { Item } = Form;
const baseUrl = "http://localhost:3001/inventario"; // Cambia la URL a la API de tu servidor

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function Inventario() {
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [item, setItem] = useState({
        id: '',
        nombre: '',
        tipo: '',
        cantidad: 0,
        unidadMedida: '',
        descripcion: '',
        fechaCompra: '',
        proveedor: ''
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
        setItem({
            ...item,
            [name]: value
        });
    };

    const seleccionarItem = (item, caso) => {
        setItem(item);
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
            title: "Tipo",
            dataIndex: "tipo",
            key: "tipo",
        },
        {
            title: "Cantidad",
            dataIndex: "cantidad",
            key: "cantidad",
        },
        {
            title: "Unidad de Medida",
            dataIndex: "unidadMedida",
            key: "unidadMedida",
        },
        {
            title: "Descripción",
            dataIndex: "descripcion",
            key: "descripcion",
        },
        {
            title: "Fecha de Compra",
            dataIndex: "fechaCompra",
            key: "fechaCompra",
        },
        {
            title: "Proveedor",
            dataIndex: "proveedor",
            key: "proveedor",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <>
                    <Button type="primary" onClick={() => seleccionarItem(fila, "Editar")}>Editar</Button> {"   "}
                    <Button type="primary" danger onClick={() => seleccionarItem(fila, "Eliminar")}>Eliminar</Button>
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
        delete item.id;
        await axios.post(baseUrl, item)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPut = async () => {
        await axios.put(baseUrl + "/" + item.id, item)
            .then(response => {
                var dataAuxiliar = data;
                dataAuxiliar.map(elemento => {
                    if (elemento.id === item.id) {
                        elemento.nombre = item.nombre;
                        elemento.tipo = item.tipo;
                        elemento.cantidad = item.cantidad;
                        elemento.unidadMedida = item.unidadMedida;
                        elemento.descripcion = item.descripcion;
                        elemento.fechaCompra = item.fechaCompra;
                        elemento.proveedor = item.proveedor;
                    }
                });
                setData(dataAuxiliar);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionDelete = async () => {
        await axios.delete(baseUrl + "/" + item.id)
            .then(response => {
                setData(data.filter(elemento => elemento.id !== item.id));
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
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Insertar Nuevo Elemento</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={data} />

            <Modal
                visible={modalInsertar}
                title="Insertar Elemento"
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

                    <Item label="Tipo">
                        <Input name="tipo" onChange={handleChange} />
                    </Item>

                    <Item label="Cantidad">
                        <Input name="cantidad" onChange={handleChange} />
                    </Item>

                    <Item label="Unidad de Medida">
                        <Input name="unidadMedida" onChange={handleChange} />
                    </Item>

                    <Item label="Descripción">
                        <Input name="descripcion" onChange={handleChange} />
                    </Item>

                    <Item label="Fecha de Compra">
                        <Input name="fechaCompra" onChange={handleChange} />
                    </Item>

                    <Item label="Proveedor">
                        <Input name="proveedor" onChange={handleChange} />
                    </Item>
                </Form>
            </Modal>

            <Modal
                visible={modalEditar}
                title="Editar Elemento"
                onCancel={abrirCerrarModalEditar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
                    <Button type="primary" onClick={peticionPut}>Editar</Button>,
                ]}
            >
                <Form {...layout}>
                    <Item label="Nombre">
                        <Input name="nombre" onChange={handleChange} value={item && item.nombre} />
                    </Item>

                    <Item label="Tipo">
                        <Input name="tipo" onChange={handleChange} value={item && item.tipo} />
                    </Item>

                    <Item label="Cantidad">
                        <Input name="cantidad" onChange={handleChange} value={item && item.cantidad} />
                    </Item>

                    <Item label="Unidad de Medida">
                        <Input name="unidadMedida" onChange={handleChange} value={item && item.unidadMedida} />
                    </Item>

                    <Item label="Descripción">
                        <Input name="descripcion" onChange={handleChange} value={item && item.descripcion} />
                    </Item>

                    <Item label="Fecha de Compra">
                        <Input name="fechaCompra" onChange={handleChange} value={item && item.fechaCompra} />
                    </Item>

                    <Item label="Proveedor">
                        <Input name="proveedor" onChange={handleChange} value={item && item.proveedor} />
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
                ¿Estás seguro que deseas eliminar el elemento <b>{item && item.nombre}</b>?
            </Modal>
        </div>
    );
}

export default Inventario;
