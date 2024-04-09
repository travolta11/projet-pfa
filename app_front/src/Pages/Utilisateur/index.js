import React, { useState } from 'react';
import './index.css';
import { Table, Pagination, Tag, Space, Button, Input } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const showTotal = (total) => `Total ${total} items`;

const Utilisateur = () => {
  const [current, setCurrent] = useState(3);
  

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'Nom',
      key: 'Nom',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Créateur',
      dataIndex: 'createur',
      key: 'createur',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Modifier {record.Nom}</Button>
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
      <h1>Utilisateur</h1>

      <div className="searchContainer">
        <Button type="primary" >
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="searchContainer">
        <Input placeholder="Rechercher un utilisateur" className="searchInput" />
        <Button type="primary" icon={<SearchOutlined />} className="searchButton"></Button>
      </div>

      <Table columns={columns} dataSource={data} pagination={false} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Pagination current={current} onChange={onChange} total={50} showTotal={showTotal} />
      </div>
    </>
  );
};

export default Utilisateur;