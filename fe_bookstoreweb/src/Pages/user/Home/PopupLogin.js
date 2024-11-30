import React, { useState } from 'react';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Form, Button, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { axiosJson } from '../../../axios/AxiosCustomize';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { jwtDecode } from 'jwt-decode';

const PopupLogin = ({setIsModalOpen, isModalOpen, setIsModalRegisterOpen, isModalRegisterOpen}) => {
    const [form] = Form.useForm();
    const { login } = useContext(AuthContext);

    const onFinish = async (values) => {
        try {
            const response = await axiosJson.post('/Users/login', {
                Email: values.username,
                Password: values.password,
            });
    
            if (response.status === 200) {
                const token = response.data.token;
                login(token); // Lưu token
                toast.success('Đăng nhập thành công');
    
                // Giải mã token để lấy thông tin vai trò
                const decodedToken = jwtDecode(token);
                const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                   setIsModalOpen(false);
                // Điều hướng dựa trên vai trò
                // if (role === 'Admin') {
                //     window.location.href = '/admin';
                // } else {
                //     window.location.href = '/';
                // }
                }
               else if (response.status === 403) {
                toast.error('Tài khoản của bạn không hoạt động');
            } else if (response.status === 404) {
                toast.error('Sai tên đăng nhập hoặc mật khẩu');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Đã xảy ra lỗi khi đăng nhập');
        }
    };
    
    const responseGoogle = async (response) => {
        try {
            const result = await axios.post('https://localhost:7186/api/Users/google-login', {
                tokenId: response.credential,
            });
    
            const token = result.data.token;
            login(token); // Lưu token
            toast.success('Đăng nhập thành công');
    
            // Giải mã token để lấy thông tin vai trò
            const decodedToken = jwtDecode(token);
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            // Điều hướng dựa trên vai trò
            if (role === 'Admin') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Đăng nhập với Google thất bại');
        }
    };

  
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const handleOpenRegister = () => {
        setIsModalOpen(false);
        setIsModalRegisterOpen(true);
      };
    return (
        <>
  <Modal
   open={isModalOpen} onCancel={handleCancel} footer={null}
   style ={{ padding: '20px', display:'flex',justifyContent:'center' }}
  >
          <div style={{ display:'flex',flexDirection:'column' ,alignItems:'center'}}>
                    <h1 style={{ padding: '15px', fontSize: '30px'}} className='login-name'>ĐĂNG NHẬP</h1>
                    <Form
                        form={form}
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        {/* Input cho Email hoặc Số điện thoại */}
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập Email hoặc Số điện thoại!' }]}
                        >
                            <Input
                                size="large"
                                placeholder="Email hoặc Số điện thoại"
                                prefix={<UserOutlined />}
                                className="custom-input" // Thêm class để custom style
                            />
                        </Form.Item>

                        {/* Input cho Mật khẩu */}
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Mật khẩu"
                                prefix={<LockOutlined />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className="custom-input" // Thêm class để custom style
                            />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent:'flex-end', padding: '10px' }}>
                            <Link to="/forgot-password" style={{ color: 'black' , textDecoration: 'none' }}>
                                Quên mật khẩu?
                            </Link>
                        </div>
                        {/* <div className='pass'>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <label style={{ color: 'black' }}>
                                    <input type="checkbox" id="rememberMe" />  Nhớ mật khẩu
                                </label>
                            </Form.Item>
                        </div> */}
                        <div >
                            <Button type="primary" htmlType="submit" style={{ width: '100%', height: '50px' }}>
                                ĐĂNG NHẬP
                            </Button>
                        </div>
                    </Form>
                    <div style={{ color: 'black', margin: 10 }}>
                        hoặc
                    </div>
                    <div className="links">
                        <div >
                            <GoogleOAuthProvider clientId="702226400553-a23melhr8d23jmlvn19vmj578922dlkr.apps.googleusercontent.com">
                                <GoogleLogin
                                    onSuccess={responseGoogle}
                                    onError={() => {
                                        console.error('Login Failed');
                                    }}
                                    size='large'
                                    width={330}
                                />
                            </GoogleOAuthProvider>
                        </div>


                    </div>
                    <div className="signup" style={{ color: 'black' }}>
                        Bạn chưa có tài khoản?
                        <a style={{textDecoration: 'none'}} onClick={()=>{handleOpenRegister()}}> Đăng ký ngay</a>
                    </div>
                
            
                    </div>
                </Modal>
        </>
    );
};

export default PopupLogin;