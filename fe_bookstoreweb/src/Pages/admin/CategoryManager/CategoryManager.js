import React, { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { axiosJson } from "../../../axios/AxiosCustomize";
import { toast } from "react-toastify";
import CategoryTable from "./CategoryTable";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryManager";

const CategoryManager = () => {
 
  const [data, setData] = useState([]);
 
  const [childData, setChildData] = useState([]);
  const [nameCategoryFather, setNameCategoryFather] = useState("");
  const [isModalFatherOpen, setIsModalFatherOpen] = useState(false);
  const [isModalChildOpen, setIsModalChildOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosJson.get("/Categories");
      setData(response.data);
      setFilteredParentData(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh mục ");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchParentCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosJson.get("/Categories/get-father-category");
      setParentCategories(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh mục cha!");
    } finally {
      setLoading(false);
    }
  };

  const fetchChildCategories = async (id) => {
    try {
      const response = await axiosJson.get(`/Categories/${id}`);
      setChildData(response.data.childCategories);
    } catch (error) {
      toast.error("Lỗi khi tải danh mục con!");
    }
  };

  //Tìm kiếm
  const [searchText, setSearchText] = useState("");
  const [filteredParentData, setFilteredParentData] = useState([]);
  const handleSearch = (e) => {
    const value = e.target.value; // Extract the value from the event
    setSearchText(value);
    setFilteredParentData(
      data.filter((item) =>
        item.nameCategory?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleViewChild = (record) => {
    fetchChildCategories(record.id);
    setNameCategoryFather(record.nameCategory);
  };

  //Xóa
  const handleDeleteSuccess = (id) => {
    setFilteredParentData(filteredParentData.filter((item) => item.id !== id));
    setChildData(childData.filter((item) => item.id !== id));
  };



  //Chỉnh sửa
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingType, setEditingType] = useState("");

  const handleEdit = async (record, type) => {
    if (type === "child" && parentCategories.length === 0) {
      await fetchParentCategories();
    }
    setEditingCategory(record); // Lưu thông tin danh mục cần chỉnh sửa
    setEditingType(type); // Đặt kiểu (lớn/nhỏ)
    setIsEditModalOpen(true); // Mở modal
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
        <div style={{ display: "flex", gap: 20 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalFatherOpen(true)}
          >
            Thêm danh mục lớn
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              fetchParentCategories();
              setIsModalChildOpen(true);
            }}
          >
            Thêm danh mục nhỏ
          </Button>
        </div>
      </div>
      <h4>Danh mục cha</h4>
      <CategoryTable
  data={filteredParentData}
  type="parent"
  onViewChild={handleViewChild}
  onEdit={(record) => handleEdit(record, "parent")}
  onDeleteSuccess={handleDeleteSuccess}
/>
      <h4>Danh mục thể loại {nameCategoryFather}</h4>
      <CategoryTable
  data={childData}
  type="child"
  onEdit={(record) => handleEdit(record, "child")}
  onDeleteSuccess={handleDeleteSuccess}
/>
      <AddCategoryModal
        isOpen={isModalFatherOpen}
        setIsOpen={setIsModalFatherOpen}
        type="parent"
        fetchCategories={fetchCategories}
      />
      <AddCategoryModal
        isOpen={isModalChildOpen}
        setIsOpen={setIsModalChildOpen}
        type="child"
        parentCategories={parentCategories}
        fetchCategories={fetchCategories}
      />


<EditCategoryModal
  isOpen={isEditModalOpen}
  setIsOpen={setIsEditModalOpen}
  category={editingCategory}
  type={editingType}
  parentCategories={parentCategories}
  fetchCategories={fetchCategories}
  fetchChildCategories ={fetchChildCategories}
  setNameCategoryFather = {setNameCategoryFather}
/>
    </div>
  );
};

export default CategoryManager;
