import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Image, Upload, Button } from "antd";
import { axiosFormData, axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

const { Option } = Select;

const AddProduct = ({ isOpen, setIsOpen, fetchBook }) => {
  const [form] = Form.useForm();
  const [selectPublisher, setSelectPublisher] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetchSelectPublisher();
    fetchSelectCategory();
  }, []);

  const fetchSelectPublisher = async () => {
    try {
  
      const response = await axiosJson.get(`/Publishers`);
      setSelectPublisher(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách NXB!");
    } 
  };

  const fetchSelectCategory = async () => {
    try {
  
      const response = await axiosJson.get(`/Categories/get-chill-category`);
      setSelectCategory(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách NXB!");
    } 
  };
   const options = selectCategory.map((item) => ({ value: item.id, label: item.nameCategory }));
   const [fileList, setFileList] = useState([]);

   const handleChange = ({ fileList }) => setFileList(fileList);
 
   const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        bookCode: values.bookCode,
        name: values.name,
        description: description, // Add the ReactQuill content here
        price: values.price,
        promotionalPrice: values.promotionalPrice,
        stock: values.stock,
        pageCount: values.pageCount,
        authorName: values.authorName,
        language: values.language,
        publisherId: values.publisherId,
        categoryIds: Array.isArray(values.CategoryIds) ? values.CategoryIds : [],
      };
  
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (Array.isArray(payload[key])) {
          payload[key].forEach((value) => formData.append(key, value));
        } else {
          formData.append(key, payload[key]);
        }
      });
  
      if (fileList && fileList.length > 0) {
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("imageFiles", file.originFileObj);
          }
        });
      }
  
      await axiosFormData.post("/Books", formData);
      toast.success("Thêm sản phẩm thành công!");
      setIsOpen(false);
      fetchBook();
      form.resetFields();
      setDescription(""); // Reset ReactQuill content
      fileList.value = [];
    } catch (error) {
      if (error.response) {
        toast.error(`Lỗi từ server: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Không nhận được phản hồi từ server");
      } else {
        toast.error("Lỗi khi thêm sản phẩm!");
      }
    }
  };
  
  return (
    <Modal
      title={"Thêm sản phẩm"}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={() => setIsOpen(false)}
      okText="Thêm sản phẩm"
      cancelText="Hủy"
      width={1000}
    >
  
      <Form form={form} layout="vertical">
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:20}}>
          <div style={{flex:1}}>
        <Form.Item
          label="Mã sách"
          name="bookCode"
          rules={[{ required: true, message: "Vui lòng nhập mã sách!" }]}
        >
          <Input placeholder="Nhập mã sách" />
        </Form.Item>
        <Form.Item
          label="Tên sách"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sách!" }]}
        >
          <Input placeholder="Nhập tên sách" />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá sách!" }]}
        >
          <Input placeholder="Nhập giá sách" />
        </Form.Item>
        <Form.Item
          label="Giá khuyến mãi"
          name="promotionalPrice"
        >
          <Input placeholder="Nhập giá khuyến mãi" />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="stock"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <Input placeholder="Nhập số lượng" />
        </Form.Item>
        <Form.Item
          label="Số trang"
          name="pageCount"
          rules={[{ required: true, message: "Vui lòng nhập số trang!" }]}
        >
          <Input placeholder="Nhập số trang" />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          name="authorName"
          rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
        >
          <Input placeholder="Nhập ngôn ngữ" />
        </Form.Item>
        <Form.Item
          label="Ngôn ngữ"
          name="language"
          rules={[{ required: true, message: "Vui lòng nhập ngôn ngữ!" }]}
        >
          <Input placeholder="Nhập ngôn ngữ" />
        </Form.Item>
          <Form.Item
            label="Nhà xuất bản"
            name="publisherId"
            rules={[{ required: true, message: "Vui lòng chọn nhà xuất bản!" }]}
          >
            <Select placeholder="Chọn nhà xuất bản">
              {selectPublisher.map((publisher) => (
                <Option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        
        </div>
        <div style={{ flex:2, justifyContent:'flex-start',flexDirection:'column', display:'flex',}}>
        <Form.Item
            label="Thể loại sách"
            name="CategoryIds"
            rules={[{ required: true, message: "Vui lòng chọn thể loại sách!" }]}
          >
            <Select  mode="multiple"  placeholder="Chọn thể loaị sách" options={options}>
             
            </Select>
          </Form.Item>
       
        <Form.Item label="Tóm tắt sách" name="description">
  <ReactQuill style={{height:'310px'}} value={description} onChange={setDescription} />
</Form.Item>

        <Form.Item label="Tải hình ảnh sách " name="upload" style={{marginTop:'20px'}}>
              <Upload
                multiple
                listType="picture-card"
                maxCount={6}
                fileList={fileList}
                // defaultFileList={formValues.images}
                beforeUpload={() => false}
                onChange={handleChange}
                accept="image/*"

              >
                <Button>Chọn ảnh</Button>
              </Upload>
            </Form.Item>
        </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddProduct;
