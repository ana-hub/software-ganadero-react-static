import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Sider, Content, Footer } = Layout;

const CustomLayout = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div
                    className="demo-logo-vertical"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '32px',
                        margin: '16px',
                        background: 'rgba(255,255,255,.2)',
                        borderRadius: '6px',
                    }}
                >
                    <h3 style={{ color: 'white' }}>Ganado Feliz</h3>
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/registro-animales">Registro de Animales</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/control-inventario">Control de Inventario</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/plan-pastoreo">Plan de Pastoreo</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/gestion-salud">Gestión de Salud de los Animales</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/registro-actividad">Registro de Actividad</Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to="/analisis-rendimiento">Análisis de Datos de Rendimiento</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to="/sistema-venta">Sistema de Venta</Link>
                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to="/registro-trabajadores">Registro de Trabajadores</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ background: colorBgContainer, padding: 0 }}>
                    {/* Contenido del encabezado, como el logotipo o el nombre de la aplicación */}
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default CustomLayout;
