import React from "react";
import { Typography, Form, Input, DatePicker, Button } from "antd";

const { Title } = Typography;

const AjouterCreateur = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <>
      <Title>Ajouter un créateur</Title>
      <Form
        form={form}
        name="createur_form"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Nom"
          rules={[
            { required: true, message: "Veuillez saisir le nom du créateur" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="biography"
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
          name="date_of_birth"
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

        <Button type="primary" htmlType="submit" className="submit-button">
          Ajouter le créateur
        </Button>
      </Form>
    </>
  );
};

export default AjouterCreateur;
