import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";

const { Option } = Select;

const AddCategoryModal = ({ isOpen, setIsOpen, type, parentCategories, fetchCategories }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        nameCategory: values.nameCategory,
        description: values.description,
      };
      if (type === "child") {
        payload.parentId = values.parentId;
      }
      await axiosJson.post("/Categories/create-category", payload);
      toast.success("Tạo danh mục thành công!");
      fetchCategories();
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      toast.error("Tạo danh mục thất bại!");
    }
  };

  return (
    <Modal
      title={type === "parent" ? "Thêm danh mục lớn" : "Thêm danh mục nhỏ"}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      okText="Tạo"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên danh mục"
          name="nameCategory"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>
        {type === "child" && (
          <Form.Item
            label="Danh mục cha"
            name="parentId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục cha!" }]}
          >
            <Select placeholder="Chọn danh mục cha">
              {parentCategories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.nameCategory}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Miêu tả" name="description">
          <Input.TextArea placeholder="Nhập miêu tả" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
