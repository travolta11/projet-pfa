import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserData from '../../../useUserData';
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

const ModifierMonument = () => {
  const { id } = useParams();
  const [monument, setMonument] = useState(null);
  const { id: id_admin } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMonument = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/monument/${id}`);
        setMonument(response.data);
      } catch (error) {
        console.error('Error fetching monument data:', error);
      }
    };

    fetchMonument();
  }, [id]);

  const onFinish = async (values) => {
    try {
      const formData = { ...values, id_admin };
      await axios.put(`http://localhost:5000/monument/${id}`, formData);
      message.success('Monument updated successfully');
      navigate('/monument');

    } catch (error) {
      console.error('Error updating monument:', error);
      message.error('Error updating monument');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form submission failed:', errorInfo);
  };

  if (!monument) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="form-title">Modifier un monument</h1>
      <div className="form-container">
        <Form
          {...layout}
          initialValues={monument}
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

          {/* Add input field for image URLs */}
          <Form.Item
            label="URL des images"
            name="images"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir les URLs des images',
              },
            ]}
          >
            <Input.TextArea placeholder="Entrez les URLs des images séparées par des virgules" />
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
                message: 'Veuillez saisir votre avis',
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
            <Button type="primary" htmlType="submit">
              Modifier
            </Button>
            <Button type="default" onClick={() => navigate('/monument')} className="cancel-button">
              Annuler
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ModifierMonument;
