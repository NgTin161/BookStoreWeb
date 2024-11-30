import React from "react";
import { Table, Button, Space, Image, Switch } from "antd";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import DeleteProduct from "./DeleteSlideShow";
import DeleteSlideShow from "./DeleteSlideShow";
// import DeleteCategory from "./DeleteCategory";


const SlideshowTable = ({ data, type, onViewChild, onEdit, onDeleteSuccess ,fetchSlideShow }) => {
    const columns = [
        {
          title: "STT",
          dataIndex: "",
          key: "",
          align: "center",
          width: 'auto',
          render: (text, _, index) => index + 1,
        },
        {
            title: "Ảnh",
            dataIndex: "imageURL",
            key: "imageURL",
            align: "left",
            render: (imageUrls) => (
              imageUrls && imageUrls.length > 0 ? (
                <Image
                  src={imageUrls}
                  alt="Sliedeshow Image"
                  style={{ width: 100, height: 200, objectFit: "cover" }} 
                />
              ) : (
                <span>Không có ảnh</span>
              )
            ),
          },
          
        {
          title: "Link",
          dataIndex: "link",
          key: "description",
          align: "left",
        },  
        {
          title: "Miêu tả",
          dataIndex: "description",
          key: "description",
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
              <DeleteSlideShow
                id={record.id}
                onDeleteSuccess={onDeleteSuccess}
              />
            </div>
          ),
        },
      ];
    
      const handleSwitchChange = async(id) => {
        const response = await axiosJson.post(`/Slideshows/slide-status?Id=${id}`)
        if (response.status == 200)
        {
          toast.success('Cập nhật thành công')
          fetchSlideShow();
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

export default SlideshowTable;
