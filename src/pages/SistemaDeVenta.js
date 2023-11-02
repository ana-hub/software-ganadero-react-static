import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Select, Space } from "antd";
import axios from "axios";

const { Item } = Form;
const { Option } = Select;

const baseUrl = "http://localhost:3001/ventas"; // Reemplaza con la URL de tu API

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};

function SistemaDeVenta() {
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [pedido, setPedido] = useState({
        id: '',
        producto: '',
        cantidad: 0,
        cliente: '',
        direccion: '',
        estado: 'Pendiente',
    });

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPedido({
            ...pedido,
            [name]: value
        });
    };

    const handleSelectChange = (value) => {
        setPedido({
            ...pedido,
            producto: value
        });
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Producto",
            dataIndex: "producto",
            key: "producto",
        },
        {
            title: "Cantidad",
            dataIndex: "cantidad",
            key: "cantidad",
        },
        {
            title: "Cliente",
            dataIndex: "cliente",
            key: "cliente",
        },
        {
            title: "Dirección",
            dataIndex: "direccion",
            key: "direccion",
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (fila) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => seleccionarPedido(fila)}>Editar</Button>
                    <Button type="primary" danger onClick={() => eliminarPedido(fila)}>Eliminar</Button>
                </Space>
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
        delete pedido.id;
        await axios.post(baseUrl, pedido)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionPut = async () => {
        await axios.put(baseUrl + "/" + pedido.id, pedido)
            .then(response => {
                const newData = data.map(item => {
                    if (item.id === pedido.id) {
                        return { ...item, ...pedido };
                    }
                    return item;
                });
                setData(newData);
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const peticionDelete = async () => {
        await axios.delete(baseUrl + "/" + pedido.id)
            .then(response => {
                setData(data.filter(item => item.id !== pedido.id));
                abrirCerrarModalInsertar();
            }).catch(error => {
                console.log(error);
            });
    };

    const seleccionarPedido = (pedido) => {
        setPedido(pedido);
        abrirCerrarModalInsertar();
    };

    const eliminarPedido = (pedido) => {
        setPedido(pedido);
        peticionDelete();
    };

    useEffect(() => {
        peticionGet();
    }, []);

    return (
        <div className="App">
            <br />
            <br />
            <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar}>Nuevo Pedido</Button>
            <br />
            <br />
            <Table columns={columns} dataSource={data} />

            <Modal
                visible={modalInsertar}
                title="Gestión de Pedido"
                destroyOnClose={true}
                onCancel={abrirCerrarModalInsertar}
                centered
                footer={[
                    <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
                    (pedido.id ? (
                        <Button type="primary" onClick={peticionPut}>Guardar Cambios</Button>
                    ) : (
                        <Button type="primary" onClick={peticionPost}>Crear Pedido</Button>
                    )),
                ]}
            >
                <Form {...layout}>
                    <Item label="Producto">
                        <Select name="producto" onChange={handleSelectChange} value={pedido.producto}>
                            <Option value="Carne">Carne</Option>
                            <Option value="Leche">Leche</Option>
                            <Option value="Queso">Queso</Option>
                        </Select>
                    </Item>

                    <Item label="Cantidad">
                        <Input name="cantidad" type="number" onChange={handleChange} value={pedido.cantidad} />
                    </Item>

                    <Item label="Cliente">
                        <Input name="cliente" onChange={handleChange} value={pedido.cliente} />
                    </Item>

                    <Item label="Dirección">
                        <Input name="direccion" onChange={handleChange} value={pedido.direccion} />
                    </Item>

                    <Item label="Estado">
                        <Input name="estado" value={pedido.estado} disabled />
                    </Item>
                </Form>
            </Modal>
        </div>
    );
}

export default SistemaDeVenta;
