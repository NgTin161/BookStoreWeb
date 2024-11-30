import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";

const { Option } = Select;

const EditProduct = ({ 
  isOpen, 
  setIsOpen, 
  category, 
  type, 
  parentCategories, 
  fetchCategories, 
  fetchChildCategories,
  setNameCategoryFather
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category && parentCategories.length > 0) {
      const parentCategory = parentCategories.find((p) => p.id === category.parentId);

      form.setFieldsValue({
        nameCategory: category.nameCategory,
        description: category.description,
        parentId: parentCategory
          ? {
              value: parentCategory.id,
              label: parentCategory.nameCategory,
            }
          : null,
      });
    }
  }, [category, parentCategories, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        nameCategory: values.nameCategory,
        description: values.description,
        parentId: values.parentId?.value || null,
      };

      await axiosJson.put(`/Categories/update-category/${category.id}`, payload);

      
      fetchCategories(); // Fetch lại toàn bộ danh mục
      if (type === "child" && values.parentId?.value) {
        fetchChildCategories(values.parentId?.value); // Fetch lại danh mục con theo danh mục cha mới
      }
      setNameCategoryFather(values.parentId?.label);
      toast.success("Cập nhật danh mục thành công!");

      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      toast.error("Cập nhật danh mục thất bại!");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={`Chỉnh sửa danh mục ${type === "parent" ? "lớn" : "nhỏ"}`}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên danh mục"
          name="nameCategory"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input placeholder="Nhập tên sách " />
        </Form.Item>
        {type === "child" && (
          <Form.Item
            label="Danh mục cha"
            name="parentId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục cha!" }]}
          >
            <Select
              placeholder="Chọn danh mục cha"
              labelInValue
            >
              {parentCategories.map((parent) => (
                <Option key={parent.id} value={parent.id}>
                  {parent.nameCategory}
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

export default EditProduct;
