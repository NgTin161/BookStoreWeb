import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import { axiosJson } from '../../../axios/AxiosCustomize';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null); 


  const fetchData = async () => {
    const response = await axiosJson.get(`/Wishlists/get-wishlist-by-id?userId=${user.id}`);
    if (response.status === 200) {
      setData(response.data);
    }
    else {
      toast.error('Lỗi khi tải danh sách yêu thích');
    }
  };


  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist
