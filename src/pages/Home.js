import React from 'react';
import { Button, Row, Col, Typography, Card } from 'antd';

const { Title, Text } = Typography;

function Home() {
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Bienvenido a Ganado Feliz" style={{ height: '100%' }}>
                        <Title level={2}>Sistema de Gestión Ganadera</Title>
                        <Text>

                            La finca "El Ganado Feliz" está comprometida en mejorar su gestión ganadera con
                            nuestro sistema de información.
                        </Text>
                        <Text>
                            Nuestro sistema le permite llevar un control automatizado de sus procesos
                            organizacionales y expandir su acción de mercado.
                        </Text>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Características del Sistema">
                        <ul>
                            <li>Registro de animales</li>
                            <li>Control de inventario</li>
                            <li>Plan de pastoreo</li>
                            <li>Gestión de salud de los animales</li>
                            <li>Registro de actividad</li>
                            <li>Análisis de datos de rendimiento</li>
                            <li>Sistema de venta</li>
                            <li>Registro de trabajadores</li>
                        </ul>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
