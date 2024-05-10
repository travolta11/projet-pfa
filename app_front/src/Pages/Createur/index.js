import React, { useState, useEffect } from 'react';
import './index.css';
import { Table, Pagination, Space, Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate  } from 'react-router-dom'; 
import axios from 'axios';

const showTotal = (total) => `Total ${total} items`;

const Createur = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 
  const navigate = useNavigate(); 

  // Fetch createur data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/createur');
        const formattedData = response.data.map((createur, index) => ({
          key: index,
          id: createur.id,
          Nom: createur.nom,
          Biographie: createur.biographie.split('. ')[0].length > 50 ? createur.biographie.split('. ')[0].slice(0, 50) + "..." : createur.biographie.split('. ')[0], 
          Date_n: new Date(createur.date_n).toISOString().split('T')[0],
          Photos: createur.photos,
         
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching createur data:', error);
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
      item.Nom.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Delete createur by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/createur/${id}`);
      message.success('Createur deleted successfully');
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting createur:', error);
      message.error('Error deleting createur');
    }
  };

  const handleAddCreateur = () => {
    navigate('/createur/ajouterCreateur'); 
  };
 
  const modifierCreateur = (id) => {
    navigate(`/createur/modifierCreateur/${id}`);
  };
  
  
  const voirCreateurs = (id) => {
    navigate(`/createur/voirCreateur/${id}`);
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
      title: 'Nom',
      dataIndex: 'Nom',
      key: 'Nom',
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('Nom', 'Nom'),
    },
    {
      title: 'Biographie',
      dataIndex: 'Biographie',
      key: 'Biographie',
      ...getColumnSearchProps('Biographie', 'Biographie'),
    },
    {
      title: 'Date naissance',
      dataIndex: 'Date_n',
      key: 'Date_n',
      width: 150,
      ...getColumnSearchProps('Date_n', 'Date_n'),
    },
    
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => voirCreateurs(record.id)}>Voir</Button>
          <Button type="primary" onClick={() => modifierCreateur(record.id)}>Modifier</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Gestion Createur</h1> 

      <div className="searchContainer">
        <Input
          placeholder="Rechercher un createur"
          className="searchInput"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button type="primary" icon={<SearchOutlined />} className="searchButton"></Button>
        <Button type="primary" className="addButton leftButton" onClick={handleAddCreateur}>
          Ajouter un Createur
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

export default Createur;
