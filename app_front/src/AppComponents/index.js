import React, { useState,useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate,Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme,Typography, } from 'antd';
import AppRoutes from '../AppRoutes';
import './style.css';
const { Header, Sider, Content , Footer} = Layout;


const AppComponents = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              key: '/',
              icon: <DashboardOutlined />,
              label: 'DashBoard',
            },
            {
              key: '/monument',
              icon: <VideoCameraOutlined />,
              label: 'Gestion Monuments',
            },
            {
              key: '/utilisateur',
              icon: <UploadOutlined />,
              label: 'Gestion Utilisateurs',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AppRoutes />
        </Content>
        <Footer
        style={{
          
   
          textAlign: 'center',
          margin:10,
          padding:10,
          
          
          
        }}
      >
        
   
      </Footer>
      </Layout>
    </Layout>
  );
};
export default AppComponents;