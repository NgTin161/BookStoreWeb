import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { DownOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Button, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartOutlined, BookOutlined, CoffeeOutlined } from '@ant-design/icons';
import { AuthContext } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { axiosJson } from '../axios/AxiosCustomize';
import { toast } from 'react-toastify';
import PopupRegister from '../Pages/user/Home/PopupRegister';
import PopupLogin from '../Pages/user/Home/PopupLogin';

const Header = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState('Book');
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState('');
    const [fullName, setFullName] = useState('');

    const token = localStorage.getItem('jwt');
    const decodedToken = token ? jwtDecode(token) : null;


    const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    useEffect(() => {
        if (decodedToken) {
            const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const name = decodedToken.fullName || 'Người dùng';
            setRole(roles);
            setFullName(name);
        }
    }, [decodedToken]);

    const handleMenuClick = (e) => {
        setSelectedCategory(e.key);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        window.location.href = '/';
    };

    const [parentCategories, setParentCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    

    const fetchParentCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosJson.get('/Home/get-father-category');
        setParentCategories(response.data);
    
      } catch (error) {
        toast.error('Lỗi khi tải danh mục cha!');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchParentCategories(); // Fetch danh mục khi component được render
    }, []);
  
    // Tạo Menu từ danh mục cha
    const menu = (
      <Menu>
        {parentCategories.map((category) => (
          <Menu.Item key={category.id} >
            {category.nameCategory}
          </Menu.Item>
        ))}
      </Menu>
    );

    const getMenuForRoles = (roles) => {
        const menuItems = [];

        if (roles === 'Admin') {
            menuItems.push(
                <Menu.Item key="statistics">
                    <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
                        Quản lý trang web
                    </Link>
                </Menu.Item>
            );
        }

        if (roles.includes('User')) {
            menuItems.push(
                <Menu.Item key="profile">
                    <Link to="/user/profile" style={{ textDecoration: 'none' }}>
                        Thông tin tài khoản
                    </Link>
                </Menu.Item>
            );
        }

        menuItems.push(
            <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        );

        return <Menu>{menuItems}</Menu>;
    };

    const greeting = decodedToken && (
        <Dropdown overlay={getMenuForRoles(role)} trigger={['click']}>
            <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                <FontAwesomeIcon icon={faUser} fontSize={20} />
                Tài khoản
            </Button>
        </Dropdown>
    );

    const languageMenu = (
        <Menu>
            <Menu.Item key="vn">
                <img
                    src="./Logo/vietnam.png"
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    alt="VN"
                />
                VN
            </Menu.Item>
            <Menu.Item key="us">
                <img
                    src="./Logo/us.jpg"
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    alt="US"
                />
                US
            </Menu.Item>
        </Menu>
    );

    const UserMenu = (
        <Menu>
            <Menu.Item key="1" onClick={()=>{setIsModalOpen(true)}}>
                Đăng nhập
            </Menu.Item>
            <Menu.Item key="2" onClick={()=>{setIsModalRegisterOpen(true)}}>
               Đăng ký
            </Menu.Item>
        </Menu>
    );

    return (

        <>
        <header
            style={{
                padding: '10px',
                width: '100vw',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderBottom: '1px solid #379AE6FF',
            }}
        >
            <Link to="/">
                <img src={data?.logo} alt="logo" style={{ width: '100px', height: '100px' }} />
            </Link>

            <div style={{ margin: 10, display: 'flex', gap: 20 }}>
                <div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                            style={{
                                border: 'none',
                                boxShadow: 'none',
                                paddingTop: 30,
                                color: '#379AE6FF',
                            }}
                            icon={<MenuOutlined style={{ fontSize: 35 }} />}
                        ></Button>
                    </Dropdown>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <Search
                            placeholder="Tìm kiếm"
                            style={{
                                paddingTop: 15,
                                width: 500,
                                borderRadius: '8px',
                            }}
                            enterButton={
                                <Button
                                    style={{
                                        backgroundColor: '#379AE6FF',
                                        color: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    <SearchOutlined />
                                </Button>
                            }
                        />
                    </div>
                    <div className="nav" style={{ paddingTop: 20, textDecoration: 'none' }}>
                        <a style={{ color: '#379AE6FF' }} href="/">
                            Trang chủ
                        </a>
                        <a style={{ color: '#379AE6FF' }} href="/lien-he">
                            Liên hệ
                        </a>
                        <a style={{ color: '#379AE6FF' }} href="/services">
                            Dịch vụ
                        </a>
                        <a style={{ color: '#379AE6FF' }} href="/about">
                            Về chúng tôi
                        </a>
                        {fullName && (
                            <a style={{ color: '#379AE6FF' }} href="">
                                Xin chào {fullName}
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', right: '30px' }}>
                <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                    <FontAwesomeIcon icon={faBell} fontSize={20} />
                    Thông báo
                </Button>
                <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                    <FontAwesomeIcon icon={faCartShopping} fontSize={20} />
                    Giỏ hàng
                </Button>

                {!decodedToken ? (
                    <Dropdown overlay={UserMenu} trigger={['click']}>
                        <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>

                            <FontAwesomeIcon icon={faUser} fontSize={20} />
                            Tài khoản
                        </Button>
                    </Dropdown>
                ) : (
                    greeting
                )}

                <Dropdown overlay={languageMenu} trigger={['click']}>
                    <Button style={{ border: 'none', flexDirection: 'column', color: '#379AE6FF' }}>
                        <img
                            src="./Logo/vietnam.png"
                            style={{ width: '30px', height: '30px' }}
                            alt="VN"
                        />
                        VN
                    </Button>
                </Dropdown>
            </div>
        </header>
          <PopupLogin setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} setIsModalRegisterOpen={setIsModalRegisterOpen} isModalRegisterOpen={isModalRegisterOpen}/>
          <PopupRegister setIsModalRegisterOpen={setIsModalRegisterOpen} isModalRegisterOpen={isModalRegisterOpen} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
        </>
    );
};

export default Header;
