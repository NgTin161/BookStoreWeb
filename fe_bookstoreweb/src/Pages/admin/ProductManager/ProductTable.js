import React from "react";
import { Table, Button, Space, Image, Switch } from "antd";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import DeleteProduct from "./DeleteProduct";
// import DeleteCategory from "./DeleteCategory";


const ProductTable = ({ data, type, onViewChild, onEdit, onDeleteSuccess ,fetchBook }) => {
    const columns = [
        {
          title: "Mã sách",
          dataIndex: "bookcode",
          key: "bookcode",
          align: "center",
          width: 'auto',
          render: (text, _, index) => index + 1,
        },
        {
            title: "Ảnh",
            dataIndex: "imageUrls",
            key: "imageUrls",
            align: "left",
            render: (imageUrls) => (
              imageUrls && imageUrls.length > 0 ? (
                <Image
                  src={imageUrls[0]}
                  alt="Book Image"
                  style={{ width: 100, height: 200, objectFit: "cover" }} 
                />
              ) : (
                <span>Không có ảnh</span>
              )
            ),
          },
          
        {
          title: "Tên sách",
          dataIndex: "name",
          key: "name",
          align: "left",
        },  
        {
          title: "Giá",
          dataIndex: "price",
          key: "price",
          align: "left",
          render: (price) =>
            new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price),
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "promotionalPrice",
            key: "promotionalPrice",
            align: "left",
            render: (price) =>
                new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price),
          },
        {
          title: "Tồn kho",
          dataIndex: "stock",
          key: "stock",
          align: "left",
        },
        {
            title: "NXB",
            dataIndex: "publisherName",
            key: "publisherName",
            align: "left",
          },
          {
            title: "Hoạt động",
            dataIndex: "isActive",
            key: "isActive",
            align: "left",
            render: (_, record) => (
              
              <Switch onClick={() =>handleSwitchChange(record.id)} checked={record.isActive}  />
            ),
          },
        {
          title: "Chức năng",
          key: "actions",
          align: "center",
          width: 250, // Adjust width
          render: (_, record) => (
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
               <Button type="link" onClick={() => onEdit(record)}>
                    Chỉnh sửa
                  </Button>
              <DeleteProduct
                id={record.id}
                onDeleteSuccess={onDeleteSuccess}
              />
            </div>
          ),
        },
      ];
    
      const handleSwitchChange = async(id) => {
        const response = await axiosJson.post(`/Books/book-status?Id=${id}`)
        if (response.status == 200)
        {
          toast.success('Cập nhật thành công')
          fetchBook()
        }
        else {
          toast.error('Cập nhật thất bại')
        }
      }

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      bordered
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ProductTable;
