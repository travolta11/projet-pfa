import React, { useState } from 'react';
import './index.css';
import { Table, Pagination, Tag, Space, Button, Input } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';


const showTotal = (total) => `Total: ${total}, items`;

const Monument = () => {
  const [current, setCurrent] = useState(3);

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Titre',
      dataIndex: 'titre',
      key: 'titre',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ville',
      dataIndex: 'ville',
      key: 'ville',
    },
    {
      title: 'Horaire',
      dataIndex: 'horaire',
      key: 'horaire',
    },
    {
      title: 'Frais',
      dataIndex: 'frais',
      key: 'frais',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button>Voir</Button>
          <Button type="primary">Modifier</Button>
          <Button danger>Supprimer</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      Nom: '',
      Email: '',
      createur: '',
    },
    {
      key: '2',
      Nom: '',
      Email: '',
      createur: '',
    },
{
      key: '3',
      Nom: '',
      Email: '',
      createur: '',
    },
  ];

  return (
    <>
      <h1> historique</h1>

      <div className="searchContainer">
      <div className="searchInputWrapper">
        <Input placeholder="Rechercher un utilisateur" className="searchInput" />
        <Button type="primary" icon={<SearchOutlined />} className="searchButton"></Button>
      </div>
      <Button type="primary" className="addButton leftButton">
        Ajouter un Monument
      </Button>
    </div>
      

      <Table columns={columns} dataSource={data} pagination={false} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Pagination current={current} onChange={onChange} total={50} showTotal={showTotal} />
      </div>
    </>
  );
};

export default Monument;