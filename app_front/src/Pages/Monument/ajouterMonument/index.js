import React,{useState,useEffect} from 'react';
import { Form, Input, Button,Select } from 'antd';
import './index.css';
import useUserData from '../../../useUserData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const [createurs, setCreateurs] = useState([]);

  useEffect(() => {
    const fetchCreateurs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/createur');
        setCreateurs(response.data);
      } catch (error) {
        console.log('Error fetching createurs:', error);
      }
    };
    fetchCreateurs();
  }, []);

  const onFinish = async (values) => {
    try {
      const selectedCreateur = createurs.find((createur) => createur.id === values.createur);
      const formData = {
        ...values,
        id_admin,
        createur_id: values.createur,
        createur: selectedCreateur ? selectedCreateur.nom : '',
      };
      await axios.post('http://localhost:5000/monument', formData);
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
            label="Longitude"
            name="longitude"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir longitude',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Latitude"
            name="latitude"
            rules={[
              {
                required: true,
                message: 'Veuillez saisir latitude',
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
                message: 'Veuillez sélectionner un créateur',
              },
            ]}
          >
            <Select>
              <Select.Option value="">Sélectionnez un créateur</Select.Option>
              {createurs.map((createur) => (
                <Select.Option key={createur.id} value={createur.id}>
                  {createur.nom}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="submit-button">
              Ajouter
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

export default AjouterMonument;
