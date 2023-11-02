import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const onFinish = (values) => {

        console.log('Valores del formulario:', values);
        navigate("/home");
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ width: 300 }}
            >
                <h1 style={{ textAlign: 'center' }}>Iniciar Sesión</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor, ingrese su nombre de usuario' }]}
                >
                    <Input placeholder="Nombre de Usuario" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}
                >
                    <Input.Password placeholder="Contraseña" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Recordar</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Iniciar Sesión
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
