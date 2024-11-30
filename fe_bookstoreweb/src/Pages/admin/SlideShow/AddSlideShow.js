import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { axiosFormData } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";

const AddSlideShow = ({ isOpen, setIsOpen, fetchSlideShow }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();

      // Ensure a file is uploaded
      if (fileList.length === 0 || !fileList[0]?.originFileObj) {
        toast.error("Please upload an image.");
        return;
      }

      // Prepare FormData payload
      const formData = new FormData();
      formData.append("link", values.Link);
      formData.append("description", values.description || ""); // Optional field
      formData.append("imageFile", fileList[0].originFileObj);

      // Submit the form
      await axiosFormData.post("/Slideshows/create-slideshow", formData);

      toast.success("Thêm slideshow thành công");
      setIsOpen(false);
      form.resetFields();
      setFileList([]); // Reset file list
      fetchSlideShow(); // Refresh slideshow list
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(`Lỗi: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Không có phản hồi từ server.");
      } else {
        toast.error("Có lỗi xảy ra khi thêm slideshow!");
      }
    }
  };

  return (
    <Modal
      title="Thêm Slideshow"
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      okText="Xác nhận"
      cancelText="Hủy bỏ"
      width={800}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Link"
          name="Link"
          rules={[{ required: true, message: "Vui lòng thêm liên kết" }]}
        >
          <Input placeholder="Enter link" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Thêm miêu tả" rows={4} />
        </Form.Item>

        <Form.Item
          label="Thêm ảnh"
          name="upload"
          rules={[{ required: true, message: "Please upload an image." }]}
        >
            <div style={{ width:'100%'}}>
          <Upload
          
            multiple={false} // Only allow one image
            listType="picture"
            maxCount={1}
            fileList={fileList}
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleChange}
            accept="image/*"
          >
            
            <Button>Chọn ảnh</Button>
            
          </Upload>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSlideShow;
