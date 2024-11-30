import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { axiosJson } from "../../axios/AxiosCustomize";



const Layout = () => {
    const [data, setData] = useState([]);
  
  
    const fetchData = async () => {
      try {
        const response = await axiosJson.get("/Information");
       
          setData(response.data);     
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []); // Chỉ chạy khi component mount
    return (
        <div>
                <Header  data={data}/>
            <div style={{ }}>
                < Outlet />
            </div>
            <Footer  data={data} />


        </div>
    );
};

export default Layout;