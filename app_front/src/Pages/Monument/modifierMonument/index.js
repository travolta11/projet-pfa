import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.css';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const modifierMonument = () => {
  const onFinish = (values) => {
    console.log('Form submitted:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form submission failed:', errorInfo);
  };

  return (
    <>
    <h1 className="form-title">Modifier un monument</h1>
    <div className="form-container">
      
      <Form
       
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="my-form"
      >
        <Form.Item
          label="Titre"
          name="titre"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir le titre',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir la description',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Localisation"
          name="localisation"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir la localisation',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ville"
          name="ville"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir la ville',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Horaire"
          name="horaire"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir l\'horaire',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Frais"
          name="frais"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir les frais',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Avis"
          name="avis"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir l\'avis',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
            label="Créateur"
            name="createur"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir le créateur',
              },
            ]}
          >
            <Input />
          </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="submit-button">
           Modifier
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default modifierMonument;