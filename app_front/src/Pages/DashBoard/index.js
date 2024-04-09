import React from 'react';
import { Typography, Calendar, theme, Col, Row, Statistic, Button } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const DashBoard = () => {
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
            <Statistic title="" value={112893} />
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