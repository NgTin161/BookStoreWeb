import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Switch, message } from 'antd';
import { axiosJson } from '../../../axios/AxiosCustomize';
import { toast } from 'react-toastify';

const PublisherManager = () => {
  const [allPublishers, setAllPublishers] = useState([]); 
  const [publishers, setPublishers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPublisher, setCurrentPublisher] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // Lấy danh sách nhà xuất bản
  const fetchPublishers = async () => {
    setLoading(true);
    try {
      const response = await axiosJson.get('/Publishers');
      setAllPublishers(response.data);
      setPublishers(response.data); 
    } catch (error) {
      toast.error('Lỗi khi tải danh sách nhà xuất bản!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  // Mở modal chỉnh sửa
  const openEditModal = (publisher = null) => {
    setCurrentPublisher(publisher);
    setIsEditModalOpen(true);
    if (publisher) {
      form.setFieldsValue(publisher);
    } else {
      form.resetFields();
    }
  };

  // Gửi dữ liệu chỉnh sửa
  const handleEditFormSubmit = async (values) => {
    try {
      if (currentPublisher) {
        // Cập nhật
        await axiosJson.put(`/Publishers/${currentPublisher.id}`, values);
        toast.success('Cập nhật nhà xuất bản thành công!');
      } else {
        // Tạo mới
        await axiosJson.post('/Publishers', values);
        toast.success('Thêm nhà xuất bản thành công!');
      }
      fetchPublishers();
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };

  // Mở modal xóa
  const openDeleteModal = (publisher) => {
    setCurrentPublisher(publisher);
    setIsDeleteModalOpen(true);
  };

  // Xóa nhà xuất bản
  const handleDelete = async () => {
    try {
      await axiosJson.delete(`/Publishers/${currentPublisher.id}`);
      toast.success('Xóa nhà xuất bản thành công!');
      fetchPublishers();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa!');
    }
  };

  // Bật/tắt trạng thái
  const handleToggleStatus = async (id) => {
    try {
      await axiosJson.post(`/Publishers/${id}/toggle-status`);
      toast.success('Cập nhật trạng thái thành công!');
      fetchPublishers();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  // Tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setPublishers(allPublishers); // Khôi phục dữ liệu ban đầu
    } else {
      const filteredPublishers = allPublishers.filter((item) =>
        item.name?.toLowerCase().includes(value.toLowerCase())
      );
      setPublishers(filteredPublishers);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên nhà xuất bản',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleStatus(record.id)}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => openDeleteModal(record)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên nhà xuất bản"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300, marginRight: 8 }}
        />
        <Button type="primary" onClick={() => openEditModal()}>
          Thêm nhà xuất bản
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={publishers}
        rowKey="id"
        loading={loading}
      />

    
      <Modal
        title={currentPublisher ? 'Chỉnh sửa nhà xuất bản' : 'Thêm nhà xuất bản'}
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleEditFormSubmit}>
          <Form.Item
            name="name"
            label="Tên nhà xuất bản"
            rules={[{ required: true, message: 'Tên nhà xuất bản là bắt buộc!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ max: 500, message: 'Mô tả không được vượt quá 500 ký tự!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái hoạt động" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

 
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onOk={handleDelete}
        okText="Xóa"
        okButtonProps={{ danger: true }}
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn xóa nhà xuất bản <b>{currentPublisher?.name}</b> không?
        </p>
      </Modal>
    </div>
  );
};

export default PublisherManager;
