import React, { useContext, useState } from 'react';
import { Col, DatePicker, Row, Statistic, Button } from 'antd';
import CountUp from 'react-countup';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Chart from './Chart';
import { useEffect } from 'react';
import axios from 'axios';
import { axiosJson } from '../../axios/AxiosCustomize';
import { jwtDecode } from 'jwt-decode';

import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';



dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const urlDateFormat = 'YYYY-MM-DD';
const today = dayjs();

const formatter = (value) => (
  <CountUp
    end={value}
    separator=","
    formattingFn={(value) => `${value.toLocaleString()} VND`}
  />
);


const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState();
  const [date, setDate] = useState(dayjs().format(dateFormat));

  const [getRevenue, setRevenue] = useState();
  const [getRoomAvailable, setRoomAvailable] = useState();
  const [getMonthlyRevenue, setMonthylyRevenue] = useState();



  const [checkInDate, setCheckInDate] = useState(dayjs());
  const [checkOutDate, setCheckOutDate] = useState(dayjs());
  const handleCheckInChange = (date, dateString) => {
    setCheckInDate(date ? dayjs(date).format('YYYY-MM-DD') : null);
  };

  const handleCheckOutChange = (date, dateString) => {
    setCheckOutDate(date ? dayjs(date).format('YYYY-MM-DD') : null);
  };


  const handleDateChange = (date, dateString) => {

    setDate(dateString);
    const todayFormatted = dayjs(date).format(urlDateFormat);
    GetRevenue(userId, todayFormatted);
    toast.success("Cập nhật thành công");
  };

  useEffect(() => {

    if (user) {

      const userId = user?.id;
      setUserId(userId);
      const todayFormatted = dayjs().format(urlDateFormat);
      GetRevenue(userId, todayFormatted);
      GetMonthlyRevenue(userId);
      GetRoomAvailable(userId);
    }
  }, [user]); // Thêm mảng phụ thuộc rỗng để useEffect chỉ chạy một lần khi component mount
  const GetRevenue = async (userId, day) => {
    try {
      const response = await axiosJson.get(`/Owner/get-revenue`, {
        params: {
          userId: userId,
          day: day,
        },
      });
      if (response.status === 200) {
        setRevenue(response.data);
        console.log('GetRevenue', response.data);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetRoomAvailable = async (userId) => {
    try {
      const response = await axiosJson.get(`/Owner/get-room-available`, {
        params: {
          userId: userId,
        },
      });

      if (response.status === 200) {
        setRoomAvailable(response.data);
        console.log('Room available:', response.data);
      } else {
        console.log('Error fetching room available:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching room available:', error);
    }
  };

  const GetMonthlyRevenue = async (userId) => {
    try {
      const response = await axiosJson.get(`/Owner/get-monthly-revenue`, {
        params: {
          userId: userId,
        },
      });

      if (response.status === 200) {
        setMonthylyRevenue(response.data);
        console.log('GetMonthlyRevenue', response.data);
      } else {
        console.log('Error fetching monthly revenue:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
    }
  };


  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
  };

  return (
    <>

      <h1 style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        fontWeight: 700,
        color: '#379AE6FF'
      }}>Tổng quan</h1>


       

<div style={{ display: 'flex', gap: 8, marginBottom: 10, marginTop: 10 }}>
        <p style={{ display: 'flex', alignItems: 'center' }}>Ngày bắt đầu: </p>
        <DatePicker
          value={checkInDate ? dayjs(checkInDate, 'YYYY-MM-DD') : null}
          format={'DD-MM-YYYY'}
          placeholder={'Ngày đến'}
          onChange={handleCheckInChange}
          style={{ marginBottom: 16 }}
        />

        <p style={{ display: 'flex', alignItems: 'center' }}>Ngày kết thúc:</p>
        <DatePicker
          value={checkOutDate ? dayjs(checkOutDate, 'YYYY-MM-DD') : null}
          format={'DD-MM-YYYY'}
          placeholder={'Ngày đi'}
          onChange={handleCheckOutChange}
          style={{ marginBottom: 16 }}
        />
        <Button type="primary"  style={{ marginLeft: 16 }}>
          Lấy thống kê
        </Button>
      </div>

      <Row style={{ display: 'flex', gap: 50, justifyContent: 'center', marginTop: '20px' }}>

        <Statistic
          style={{
            borderRadius: "30px",
            width: 250,
            textAlign: 'center',
            backgroundColor: '#379AE6FF',
            padding: '20px'
          }}
          title={<span style={{ color: 'white', fontSize: '20px' }}>Doanh thu {date}</span>} // Increase title font size
          value={getRevenue}
          valueStyle={{ color: 'white', fontSize: '30px' }} // Increase value font size
          formatter={formatter}
        />

        <Statistic
          style={{
            borderRadius: "30px",
            width: 250,
            textAlign: 'center',
            backgroundColor: '#379AE6FF',
            color: 'white',
            padding: '20px'
          }}
          title={<span style={{ color: 'white', fontSize: '20px' }}>Đơn hàng đã đặt</span>}
          valueStyle={{ color: 'white', fontSize: '30px' }}
          value={getRoomAvailable}
        />

        <Statistic
          style={{
            borderRadius: "30px",
            width: 250,
            textAlign: 'center',
            backgroundColor: '#379AE6FF',
            color: 'white',
            padding: '20px'
          }}
          title={<span style={{ color: 'white', fontSize: '20px' }}>
            Doanh thu tháng {getMonthlyRevenue && getMonthlyRevenue.length > 0 ? getMonthlyRevenue[2]?.month : 'N/A'}
          </span>}
          value={getMonthlyRevenue && getMonthlyRevenue.length > 0 ? getMonthlyRevenue[2]?.totalRevenue : 'N/A'}
          valueStyle={{ color: 'white', fontSize: '30px' }} // Increase value font size
          formatter={formatter}
        />
      </Row>

      <div>
        <Chart getMonthlyRevenue={getMonthlyRevenue} />
      </div>

    </>
  )
};
export default DashBoard;