import React from "react";
import { Table, Button, Space } from "antd";
import DeleteCategory from "./DeleteCategory";


const CategoryTable = ({ data, type, onViewChild, onEdit, onDeleteSuccess }) => {
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 80,
      render: (text, _, index) => index + 1,
    },
    {
      title: type === "parent" ? "Tên danh mục" : "Tên danh mục con",
      dataIndex: "nameCategory",
      key: "nameCategory",
      align: "left",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "left",
    },
    {
      title: "Chức năng",
      key: "actions",
      align: "center",
      width: 250, // Adjust width
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {type === "parent" && (
            <>
              <Button type="link" onClick={() => onViewChild(record)}>
                Xem danh mục con
              </Button>
             
            </>
          )}
           <Button type="link" onClick={() => onEdit(record)}>
                Chỉnh sửa
              </Button>
          <DeleteCategory
            id={record.id}
            endpoint="/Categories/delete-category"
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      ),
    },
  ];

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

export default CategoryTable;
