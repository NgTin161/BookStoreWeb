import React, { useEffect, useState, useContext } from 'react';
import { Form, Input, Button, Typography, DatePicker, Radio, Modal } from 'antd';
import { AuthContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';
import { axiosJson } from '../../../axios/AxiosCustomize';
import moment from 'moment';

const Personal = () => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: null,
    birthday: null,
  });

  // Fetch user information
  useEffect(() => {
    const fetchInformation = async () => {
      if (!user?.id) {
        console.error('User ID is not available.');
        return;
      }

      try {
        const response = await axiosJson.get(`/Users/get-profile?id=${user.id}`);
        if (response.status === 200) {
          const { fullName, email, phoneNumber, address, gender, birthday } = response.data;

          setUserInfo({
            fullName,
            email,
            phoneNumber,
            address,
            gender,
            birthday: birthday ? moment(birthday) : null,
          });

          form.setFieldsValue({
            fullName,
            email,
            phoneNumber,
            address,
            gender,
            birthday: birthday ? moment(birthday) : null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch user information:', error);
      }
    };

    fetchInformation();
  }, [user, form]);

  // Show and hide profile modal
  const showProfileModal = () => {
    form.setFieldsValue({
      ...userInfo,
      birthday: userInfo.birthday ? moment(userInfo.birthday) : null,
    });
    setIsProfileModalOpen(true);
  };

  const hideProfileModal = () => {
    form.resetFields();
    setIsProfileModalOpen(false);
  };

  // Update profile
  const handleProfileUpdate = async () => {
    try {
      const values = await form.validateFields();
      const { fullName, phoneNumber, address, gender, birthday } = values;

      const updateProfile = {
        fullName,
        phoneNumber,
        address,
        gender,
        birthday: birthday ? birthday.format('YYYY-MM-DD') : null,
      };

      const response = await axiosJson.post(`/Users/update-profile?id=${user.id}`, updateProfile);
      if (response.status === 200) {
        toast.success('Cập nhật thông tin thành công');
        setUserInfo({
          ...userInfo,
          ...updateProfile,
          birthday: birthday ? moment(birthday) : null,
        });
        setIsProfileModalOpen(false);
      } else {
        toast.error('Có lỗi khi cập nhật thông tin');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Show and hide password modal
  const showPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const hidePasswordModal = () => {
    passwordForm.resetFields();
    setIsPasswordModalOpen(false);
  };

  // Change password
  const handlePasswordChange = async () => {
    try {
      const values = await passwordForm.validateFields();
      const { currentPassword, newPassword } = values;

      const changePasswordDTO = {
        currentPassword,
        newPassword,
      };

      const response = await axiosJson.post(`/Users/change-password?id=${user.id}`, changePasswordDTO);
      if (response.status === 200) {
        toast.success('Mật khẩu đã được thay đổi thành công');
        passwordForm.resetFields();
        setIsPasswordModalOpen(false);
      } else if (response.status === 400) {
        toast.error('Sai mật khẩu hiện tại');
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
      console.error('Error changing password:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Typography.Title level={3}>Thông tin tài khoản</Typography.Title>
      <div style={{ width: 400, margin: '0 auto', textAlign: 'left' }}>
        <Typography.Text>
          <strong>Email:</strong> {userInfo.email}
        </Typography.Text>
        <br />
        <Typography.Text>
          <strong>Họ và tên:</strong> {userInfo.fullName}
        </Typography.Text>
        <br />
        <Typography.Text>
          <strong>Số điện thoại:</strong> {userInfo.phoneNumber}
        </Typography.Text>
        <br />
        <Typography.Text>
          <strong>Địa chỉ:</strong> {userInfo.address}
        </Typography.Text>
        <br />
        <Typography.Text>
          <strong>Ngày sinh:</strong> {userInfo.birthday ? userInfo.birthday.format('DD-MM-YYYY') : 'Không có thông tin'}
        </Typography.Text>
        <br />
        <Typography.Text>
          <strong>Giới tính:</strong> {userInfo.gender === null ? 'Không có thông tin' : userInfo.gender ? 'Nam' : 'Nữ'}
        </Typography.Text>
        <br />
        <Button type="primary" onClick={showProfileModal} style={{ marginTop: '1rem', marginRight: '1rem' }}>
          Thay đổi thông tin
        </Button>
        <Button type="primary" danger onClick={showPasswordModal} style={{ marginTop: '1rem' }}>
          Đổi mật khẩu
        </Button>
      </div>


      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isProfileModalOpen}
        onCancel={hideProfileModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleProfileUpdate}>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^\d{10}$/, message: 'Số điện thoại phải chứa đúng 10 chữ số!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
           <DatePicker
    style={{ width: '100%' }}
    format="DD-MM-YYYY"
    disabledDate={(current) => current && current > moment().endOf('day')} // Vô hiệu hóa ngày tương lai
    onKeyDown={(e) => e.preventDefault()} // Ngăn nhập thủ công
  />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Đổi mật khẩu"
        open={isPasswordModalOpen}
        onCancel={hidePasswordModal}
        footer={null}
      >
        <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Personal;
