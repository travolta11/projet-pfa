import React from 'react';
import './index.css';

import { Button, Checkbox, Form,Avatar, Space, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => (


  <div className="login-container">
    
  <Form className="login-form"
  
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
   <div className="login-header">
        <Space align="center">
          <Avatar size={64} icon={<UserOutlined />} className="login-logo" />
          <h2 className="login-title">Login</h2>
        </Space>
      </div>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Veuillez insérer votre email!',
         

        },


      ]}
      

    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Mot de passe"
      name="password"
      rules={[
        {
          required: true,
          message: 'Veuillez insérer votre mot de passe!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
     <Checkbox >Enregistrer le mot de passe</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button className="btn1" type="primary" htmlType="submit" >
       Se connecter
      </Button>
      <style>
    
</style>


    </Form.Item>
  </Form>

</div>

);
export default Login;