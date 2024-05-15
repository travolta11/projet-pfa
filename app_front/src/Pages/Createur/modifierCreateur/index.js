import React, { useState, useEffect } from "react";
import { Typography, Form, Input, DatePicker, Button } from "antd";
import useUserData from '../../../useUserData';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;

const ModifierCreateur = () => {
  const { id } = useParams();
  const [createur, setCreateur] = useState(null);
  const [form] = Form.useForm();
  const { id: admin_id } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreateur = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/createur/${id}`);
        const createurData = response.data;
        // Format the date for the DatePicker
        if (createurData.date_n) {
          createurData.date_n = moment(createurData.date_n);
        }
        setCreateur(createurData);
        form.setFieldsValue(createurData);
      } catch (error) {
        console.error('Error fetching createur data:', error);
      }
    };

    fetchCreateur();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const formData = { ...values, admin_id };
      await axios.put(`http://localhost:5000/createur/${id}`, formData);
      console.log('Form submitted:', values);
      navigate('/createur');
    } catch (error) {
      console.log('Form submission failed:', error);
    }
  };

  return (
    <>
      <Title>Modifier un créateur</Title>
      <Form
        form={form}
        name="createur_form"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="nom"
          label="Nom"
          rules={[
            { required: true, message: "Veuillez saisir le nom du créateur" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="biographie"
          label="Biographie"
          rules={[
            {
              required: true,
              message: "Veuillez saisir la biographie du créateur",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="date_n"
          label="Date de naissance"
          rules={[
            {
              required: true,
              message: "Veuillez saisir la date de naissance du créateur",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="URL des images"
          name="photo"
          rules={[
            {
              required: true,
              message: 'Veuillez saisir les URLs des images',
            },
          ]}
        >
          <Input.TextArea placeholder="Entrez les URLs des images séparées par des virgules" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="submit-button">
          Modifier le créateur
        </Button>
      </Form>
    </>
  );
};

export default ModifierCreateur;
