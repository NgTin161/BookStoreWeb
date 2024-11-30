import React, { useEffect, useState } from 'react'
import { axiosJson } from '../../../axios/AxiosCustomize';
import { toast } from 'react-toastify';
import SlideshowTable from './SlideShowTable';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddSlideShow from './AddSlideShow';

const SlideShowManager = () => {   
    const [data, setData] = useState([]);
    const [isModalSlideShowOpen, setIsModalSlideShowOpen] = useState(false);
    const fetchSlideShow = async () => {
        try {
          const response = await axiosJson.get(`/Slideshows/get-all-slideshows`);
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          toast.error("Lỗi khi tải danh mục sách!");
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchSlideShow();
      }, []);
    

      //Xóa
      const handleDeleteSuccess = (id) => {
        setData(data.filter((item) => item.id !== id));
      };
  return (
    <>
     <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
          
            setIsModalSlideShowOpen(true);
          }}
        >
          Thêm sản phẩm
        </Button>
    <h4>Danh sách slideshows</h4>
      <SlideshowTable
        data={data}
        // onEdit={(record) => handleEdit(record, "book")}
        onDeleteSuccess={handleDeleteSuccess}
        fetchSlideShow={fetchSlideShow}
      />


<AddSlideShow
        isOpen={isModalSlideShowOpen}
        setIsOpen={setIsModalSlideShowOpen}
        type="nxb"
   
       fetchSlideShow={fetchSlideShow}
      />
      </>
  )
}

export default SlideShowManager