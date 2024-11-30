import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";

const ProductManager = () => {
  const [data, setData] = useState([]);
  const [namePublishers, setNamePublishers] = useState("");
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [SelectPublisher, setSelectPublisher] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredParentData, setFilteredParentData] = useState([]);

  // Fetch books
  const fetchBook = async () => {
    try {
      const response = await axiosJson.get("/Books");
      setData(response.data);
      setFilteredParentData(response.data); // Initially filter data as the full list
    } catch (error) {
      toast.error("Lỗi khi tải danh mục sách!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredParentData(
      data.filter((item) =>
        item.name?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // Handle viewing publishers
  const handleViewPublishers = (record) => {
    // fetchSelectPublisher(); // Fetch publishers when viewing
    setNamePublishers(record.Name);
  };

  // Handle delete success
  const handleDeleteSuccess = (id) => {
    setFilteredParentData(filteredParentData.filter((item) => item.id !== id));
  };

  // Modal for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingType, setEditingType] = useState("");

  const handleEdit = async (record, type) => {
    setEditingCategory(record);
    setEditingType(type);
    setIsEditModalOpen(true);
    // await fetchSelectPublisher(); // Ensure publisher data is loaded
  };


  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên danh mục"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
          
            setIsModalProductOpen(true);
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <h4>Danh sách sản phẩm</h4>
      <ProductTable
        data={filteredParentData}
        type="book"
        onViewChild={handleViewPublishers}
        onEdit={(record) => handleEdit(record, "book")}
        onDeleteSuccess={handleDeleteSuccess}
        fetchBook={fetchBook}
      />
      <AddProduct
        isOpen={isModalProductOpen}
        setIsOpen={setIsModalProductOpen}
        type="nxb"
        SelectPublisher={SelectPublisher}
       fetchBook={fetchBook}
      />
      {/* <EditProduct
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        category={editingCategory}
        type={editingType}
        SelectPublisherId={SelectPublisherId}
        fetchPublishers={fetchPublishers}
        setNamePublishers={setNamePublishers}
      /> */}
    </div>
  );
};

export default ProductManager;
