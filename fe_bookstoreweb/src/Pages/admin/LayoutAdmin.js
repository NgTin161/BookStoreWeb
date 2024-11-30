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

    <Link to="/admin/dashboard" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Tổng quan
    </Link>,
    "1",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),
  getItem(
    <NavLink to="/admin/information" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Quản lý thông tin
    </NavLink>,
    "2",
    <UserOutlined style={{ color: '#379AE6' }} />
  ),

  getItem(
    <Link to="/admin/publisher-manager" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Quản lý nhà xuất bản
    </Link>,
    "3",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),



  getItem(
    <Link to="/admin/booking" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Quản lý đơn hàng
    </Link>,
    "4",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),
  
  getItem(
    <Link to="/admin/product-manager" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Quản lý sản phẩm
    </Link>,
    "5",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),

  getItem(
    <Link to="/admin/category-manager" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Quản lý danh mục
    </Link>,
    "6",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),

  
  getItem(
    <Link to="/admin/booking" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Quản lý slideshow
    </Link>,
    "7",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),
  
  getItem(
    <Link to="/admin/booking" style={{ color: '#379AE6', textDecoration: 'none' }}>
      Quản lý danh mục
    </Link>,
    "8",
    <DesktopOutlined style={{ color: '#379AE6' }} />
  ),


];

const LayoutAdmin = () => {
  const { user, logout } = useContext(AuthContext);


  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // const token = localStorage.getItem('jwt');
  // const decodedToken = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    logout();
    localStorage.removeItem('hotelId');
  };


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

export default LayoutAdmin;
