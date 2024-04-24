
import React, { useState, useEffect } from 'react';

import './index.css';
import { Table, Pagination, Space, Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';


const showTotal = (total) => `Total ${total} items`;

const Utilisateur = () => {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');



  //get tourist data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/tourist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const formattedData = response.data.map((tourist, index) => ({
          key: index,
          id: tourist.id,
          Nom: tourist.username,
          Email: tourist.email,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  
  

  const onChange = (page) => {
    console.log(page);
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


  //delete tourist by id
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/tourist/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      message.success('Tourist deleted successfully');
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting tourist:', error);
      message.error('Error deleting tourist');
    }
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
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      ...getColumnSearchProps('Email', 'Email'),
    
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => handleDelete(record.id)}>
            Desactiver le compte
          </Button>
      
        </Space>
      ),
    },
  ];

  
 
  

  return (
    <>
      <h1>Utilisateur</h1>

      <div className="searchContainer">
        <Input
          placeholder="Rechercher un utilisateur"
          className="searchInput"
          onChange={(e) => onSearch(e.target.value)}
        />
        
        <Button type="primary" icon={<SearchOutlined />} className="searchButton"></Button>
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

export default Utilisateur;
