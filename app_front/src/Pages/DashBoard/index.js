import React, { useState, useEffect } from 'react';
import { Typography, Calendar, theme, Col, Row, Statistic, Button } from 'antd';
import { LikeOutlined  } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const DashBoard = () => {
  const [touristCount, setTouristCount] = useState(0);
  const [monumentCount, setMonumentCount] = useState(0);

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: '100%',
    padding: '24px',
    backgroundColor: '#749BC2',
  };

  const sectionStyle = {
    marginBottom: '24px',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    marginBottom: '16px',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/tourist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTouristCount(response.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={wrapperStyle}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div style={sectionStyle}>
            <Title level={4} style={titleStyle}>
              Calendrier
            </Title>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={sectionStyle}>
            <Title level={4} style={titleStyle}>
              Nombre de touristes
            </Title>
            <Statistic title="" value={touristCount} />
          </div>
        </Col>
        <Col span={12}>
          <div style={sectionStyle}>
            <Title level={4} style={titleStyle}>
              Nombre de monuments
            </Title>
            <Statistic title="" value={112} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;