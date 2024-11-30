import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { axiosJson } from "../../../axios/AxiosCustomize";

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axiosJson.post("/Contacts", {
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        message: values.message,
      });

      if (response.status === 201) {
        toast.success("Gửi thông tin thành công!");
        form.resetFields();
      } else {
        toast.error("Gửi thông tin thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.Message) {
        toast.error(`Lỗi: ${error.response.data.Message}`);
      } else {
        toast.error("Có lỗi xảy ra, vui lòng kiểm tra lại!");
      }
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Liên hệ</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Họ và tên"
          name="fullname"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên!" },
            { max: 100, message: "Họ và tên không được quá 100 ký tự!" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^\d{10}$/,
              message: "Số điện thoại phải có 10 chữ số!",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="message"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung!" },
            { max: 1000, message: "Nội dung không được vượt quá 1000 ký tự!" },
          ]}
        >
          <Input.TextArea placeholder="Nhập nội dung liên hệ" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            
          >
            Gửi liên hệ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
