import React from 'react';
import { Form, Input, Button, Upload } from 'antd';
import './index.css';
import useUserData from '../../../useUserData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined  } from '@ant-design/icons';

const { Dragger } = Upload;
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

const AjouterMonument = () => {
  const { id: id_admin } = useUserData();
  const navigate = useNavigate();

  const onFinish = async (values) => {
  try {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'images') {
        values[key].forEach(file => {
          formData.append('images', file.originFileObj);
        });
      } else {
        formData.append(key, values[key]);
      }
    });
    formData.append('id_admin', id_admin);

    await axios.post('http://localhost:5000/monument', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Form submitted:', values);
    navigate('/monument');
  } catch (error) {
    console.log('Form submission failed:', error);
  }
};


  const onFinishFailed = (errorInfo) => {
    console.log('Form submission failed:', errorInfo);
  };

  return (
    <>
      <h1 className="form-title">Ajouter un monument</h1>
      <div className="form-container">
        <Form
          {...layout}
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
              message: 'Veuillez saisir votre\'avis',
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

          {/* Add Upload component for images */}
          <Form.Item
            label="Images"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: 'Veuillez télécharger les images',
              },
            ]}
          >
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Cliquez ou glissez-déposez pour télécharger</p>
            </Upload.Dragger>
          </Form.Item>

          

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="submit-button">
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AjouterMonument;
