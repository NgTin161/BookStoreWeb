import React, { useEffect, useState } from 'react';
import {
  PieChartOutlined,
  NotificationOutlined,
  DesktopOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Dropdown } from 'antd';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
// import '../Owner/Owner.css'
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  
  getItem(
    <NavLink to="/user/thong-tin" style={{ color: '#379AE6', textDecoration: 'none' }}>
     Thông tin cá nhân
    </NavLink>,
    "1",
    <UserOutlined style={{ color: '#379AE6' }} />
  ),

  getItem(
    <Link to="/user/danh-sach-yeu-thich" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Danh sách yêu thích
    </Link>,
    "2",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),



  getItem(
    <Link to="/user/lich-su-mua-hang" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Lịch sử mua hàng
    </Link>,
    "3",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),


];

const LayoutUser = () => {
  const { user, logout } = useContext(AuthContext);


  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // const token = localStorage.getItem('jwt');
  // const decodedToken = token ? jwtDecode(token) : null;


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#FFFFFF',
          borderRight: '2px solid #379AE6',
        }}
      >
       
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          style={{ color: 'black' }}
          items={items}
        />
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
      </Sider>
      <Layout className="site-layout">
       
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '10px 0' }} /> */}
          <div style={{ marginTop: 30, padding: 24, minHeight: 360, background: 'white' }}>

            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default LayoutUser;
