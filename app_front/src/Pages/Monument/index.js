import React, { useState, useEffect } from 'react';
import './index.css';
import { Table, Pagination, Space, Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate  } from 'react-router-dom'; 
import axios from 'axios';

const showTotal = (total) => `Total ${total} items`;

const Monument = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 
  const navigate = useNavigate(); 

  // Fetch monument data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/monument');
        const formattedData = response.data.map((monument, index) => ({
          key: index,
          id: monument.id,
          Titre: monument.titre,
          Ville: monument.ville,
          Horaire: monument.horaire,
          Frais: monument.frais,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching monument data:', error);
      }
    };

    fetchData();
  }, []);

  const onChange = (page) => {
    setCurrent(page);
  };

  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.id.toString().includes(searchQuery) ||
      item.Titre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  // Delete monument by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/monument/${id}`);
      message.success('Monument deleted successfully');
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting monument:', error);
      message.error('Error deleting monument');
    }
  };

  const handleAddMonument = () => {
    navigate('/monument/ajouterM'); 
  };
  const handleVoir = () => {
    navigate('/monument/voirMonument'); 
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps('id', 'ID'),
    },
    {
      title: 'Titre',
      dataIndex: 'Titre',
      key: 'Titre',
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('Titre', 'Titre'),
    },
    {
      title: 'Ville',
      dataIndex: 'Ville',
      key: 'Ville',
      ...getColumnSearchProps('Ville', 'Ville'),
    },
    {
      title: 'Horaire',
      dataIndex: 'Horaire',
      key: 'Horaire',
      ...getColumnSearchProps('Horaire', 'Horaire'),
    },
    {
      title: 'Frais',
      dataIndex: 'Frais',
      key: 'Frais',
      ...getColumnSearchProps('Frais', 'Frais'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={()=> handleVoir()}>Voir</Button>
          <Button type="primary">Modifier</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Monument</h1>

      <div className="searchContainer">
        <Input
          placeholder="Rechercher un monument"
          className="searchInput"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button type="primary" icon={<SearchOutlined />} className="searchButton"></Button>
        <Button type="primary" className="addButton leftButton" onClick={handleAddMonument}>
          Ajouter un Monument
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: current,
          pageSize: 5,
          total: filteredData.length,
          onChange: onChange,
          showTotal: showTotal,
        }}
      />
    </>
  );
};

export default Monument;
