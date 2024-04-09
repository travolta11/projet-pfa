import React from 'react';
import { Card, Typography, Calendar, theme ,Col, Row, Statistic  } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
const { Title } = Typography;

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const DashBoard = () => {
  
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <>  
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>

<Row gutter={16}> 
<Col span={12}>
  <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
</Col>
<Col span={12}>
  <Statistic title="Unmerged" value={93} suffix="/ 100" />
</Col>
</Row></>  

  );
}
export default DashBoard;