import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Modal, Button, Input, Image, Upload } from "antd";
import axios from "axios"; // Import Axios
import "react-quill/dist/quill.snow.css";
import { axiosFormData, axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";

const Information = () => {
    const [id,setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [shippingPolicy, setShippingPolicy] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);


  const [previewImage, setPreviewImage] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosJson.get("/Information");
      const data = response.data; // Dữ liệu trả về từ API
  console.log(data);
      setId(data.id);
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
      setAddress(data.address);
      setDescription(data.description);
      setShippingPolicy(data.shippingPolicy);
      setFacebookLink(data.facebookLink);
      setInstagramLink(data.instagramLink);
      setImageUrl(data.logo);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API:", error);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, []); // Chỉ chạy khi component mount

  // Mở Modal chỉnh sửa toàn bộ thông tin công ty
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Lưu thay đổi và gửi lên API
  const handleSave = async () => {
    const updatedData = {
      name,
      phone,
      email,
      address,
      description,
      shippingPolicy,
      facebookLink,
      instagramLink,
    };

    try {
      const response = await axiosJson.put(`/Information/${id}`, updatedData);
      console.log("Cập nhật thành công:", response.data);
      toast.success("Cập nhật thành công!");
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  // Modules của ReactQuill để cấu hình thanh công cụ
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      ["image"],
    ],
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('No file selected');
      return;
    }
  

    console.log("Selected file:", selectedFile);
  

    const formData = new FormData();
    formData.append("imageFile", selectedFile);  
  
 
  
    try {
      const response = await axiosFormData.post(`/Information/create-logo?Id=${id}`, formData);
      console.log("Response status:", response.status);
  
      if (response.status === 200) {
        toast.success('Cập nhật thành công');
        fetchData();  // Refresh data
      } else {
        toast.error('Cập nhật thất bại');
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error('Có lỗi xảy ra');
    }
  };
  
  const handleBeforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result); // Show image preview
    };
    reader.readAsDataURL(file);  // Load file as Data URL
  
    setSelectedFile(file); // Save the file for upload
    return false;  // Prevent default upload behavior
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
       <p><strong>Tên công ty:</strong> {name}</p>
      <p><strong>Số điện thoại:</strong> {phone}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Địa chỉ:</strong> {address}</p>
      <p><strong>Liên kết Facebook:</strong> {facebookLink}</p>
      <p><strong>Liên kết Instagram:</strong> {instagramLink}</p>

      <h4>Thông tin: </h4>
      <ReactQuill value={description} readOnly={true} theme="bubble" />

      <h4>Chính sách vận chuyển:</h4>
      <ReactQuill value={shippingPolicy} readOnly={true} theme="bubble" />


      <Button type="primary" style={{ marginTop: "20px" }} onClick={showModal}>
        Cập nhật thông tin
      </Button>
      

      <div style={{ marginTop: 20 }}>
      <h4>Logo công ty:</h4>
  
        <Image
        style={{ border:'1px solid black', width: 300, height: 300, objectFit: "contain " }}
          width={250}
          src={previewImage || imageUrl} 
          fallback="https://via.placeholder.com/200"
          alt="Company Logo"

        />
        </div>
     
      <Upload
        beforeUpload={handleBeforeUpload}
        showUploadList={false}
       accept="image/*"
      >
        <Button style={{ marginTop: 16 }} icon={<UploadOutlined />}>Chọn ảnh mới</Button>
      </Upload>
      {previewImage && (
        <Button
          type="primary"
          icon={<SaveOutlined />}
          style={{ margin: 16 }}
          onClick={handleUpload}
        >
          Gửi ảnh
        </Button>
      )}
      <Modal
        title="Chỉnh sửa thông tin"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy bỏ"
        width={1000}
      >
        <div style={{ padding:'30px',display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên công ty"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ"
          />
          <Input
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
            placeholder="Facebook Link"
          />
          <Input
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            placeholder="Instagram Link"
          />
          <div style={{height:'300px'}}>
            <h4>Thông tin:</h4>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={modules}
              style={{ height:'200px'}}
            />
          </div>
          <div style={{margin:'10px'}}>
            <h4>Chính sách giao hàng:</h4>
            <ReactQuill
              value={shippingPolicy}
              onChange={setShippingPolicy}
              modules={modules}
              style={{ height:'200px'}}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Information;
