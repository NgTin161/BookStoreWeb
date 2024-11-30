import React, { useContext, useEffect, useRef, useState } from 'react';
import SlidesDetails from '../../../Components/SlideDetails';
import { Button, Card, Modal, Pagination, Progress, Rate, Tag, Typography } from 'antd';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import moment from "moment";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Details.css";
import { faCreativeCommonsNcJp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosJson } from '../../../axios/AxiosCustomize';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';



const { Title, Text } = Typography;

const Details = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null); 
  const [otherBooks, setOtherBooks] = useState([]);
  const navigate = useNavigate();
  const {  bookslug } = useParams(); // Lấy slug từ URL
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);

  const [isFavorite, setIsFavorite] = useState(false);

  const fetchData = async () => {
      const response = await axiosJson.get(`/Books/get-book-by-slug?slug=${bookslug}`);
      console.log(response.data);
      setData(response.data); // Gán dữ liệu sách vào state
    
  };
  const fetchOtherBooks = async () => {
    if (data && data.categoryId) { 
      try {
        const queryString = data.categoryId.map(id => `Ids=${id}`).join('&');
        const response = await axiosJson.get(
          `/Books/get-random-books-same-categories?${queryString}`
        );
  
        setOtherBooks(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách sách cùng thể loại:", error);
      }
    }
  };
  const fetchStatusFavorite = async () => {
    try {
      const response = await axiosJson.get(`/Wishlists/check-wishlist?UserId=${user.id}&BookId=${data.id}`);
      console.log('response:', response);  // Kiểm tra phản hồi
      if (response.status === 200) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error fetching wishlist status:', error);  // In ra lỗi nếu có
    }
  };

  
  const handleClickCount = (id) => {
    const response = axiosJson.post(`/Home/click-item?id=${id}`);

};

const handleWishlist = async () => {
  console.log('mới nhấn');
  if (!user?.id) {
    
    navigate('/dang-nhap');
    toast.info('Vui lòng đăng nhập');
    return; // Thoát khỏi hàm nếu người dùng chưa đăng nhập
  }

  try {
    const response = await axiosJson.post(`/Wishlists/add-to-wishlist`, {
      UserId: user.id,
      BookId: data.id,
    });

    if (response.status === 200 && isFavorite == false) {
      toast.success('Đã thêm vào danh sách yêu thích');
      setIsFavorite(true);
    }
    else if (response.status === 200 && isFavorite == true) {
      toast.success('Đã xóa khỏi danh sách yêu thích');
      setIsFavorite(false);
    }
  } catch (error) {
    console.error('Lỗi khi thêm vào danh sách yêu thích:', error);
    toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
  }
};

const handleCardClick = (slugDetail) => {
  navigate(`/${slugDetail}`); 
};



  useEffect(() => {
    fetchData();
  
    
  }, [ bookslug]); 

  useEffect(() => {
    if (data?.id) {
      handleClickCount(data?.id);
      fetchOtherBooks(); 
    }
    if(data?.id && user?.id)
      {
        console.log(user.id);
        console.log(data.id);
        fetchStatusFavorite();
      }
  }, [data]); 

  useEffect(() => {
    if (descriptionRef.current && data?.description) {
      const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setIsOverflowing(isOverflowing);
    }
  }, [data?.description]);
  const [isExpanded, setIsExpanded] = useState(false);




  const settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };



  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const renderRatingDescription = (rating) => {
    if (rating >= 1 && rating <= 3) {
      return <Tag color="red">Tệ</Tag>;
    } else if (rating > 3 && rating <= 5) {
      return <Tag color="orange">Tạm được</Tag>;
    } else if (rating > 5 && rating <= 8) {
      return <Tag color="blue">Tốt</Tag>;
    } else if (rating > 8 && rating <= 10) {
      return <Tag color="green">Xuất sắc</Tag>;
    }
    return null;
  };
  const toggleExpanded = () => setIsExpanded(!isExpanded);


  const [modalVisible, setModalVisible] = useState(false);
    const openModal = (email, bookingCode, createDate, rate, comment) => {
      console.log(email, bookingCode, createDate, rate, comment);
      setModalVisible(true);
    };


    const closeModal = () => {
      setModalVisible(false);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3;
  
 
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = fakeReviews.slice(indexOfFirstReview, indexOfLastReview);
    const onPageChange = (page) => {
      setCurrentPage(page);
    };

   
  
  return (
    <>
    <Helmet>
    <title>{`Sách ${data?.name}`}</title>
    </Helmet>
    <div className='container' style={{ padding: 20, backgroundColor: '' }}>
      <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
        <SlidesDetails imageUrls = {data?.imageUrls}  />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Title style={{margin: 0}} level={2}>{data?.name}</Title>
          <Text strong>Tác giả: {data?.authorName}</Text>
          <div style={{ display: 'flex', gap: 10 }}>
            <Rate disabled defaultValue={5} />
            <Text>(Có 5 lượt đánh giá)</Text>
          </div>
          <Text>Còn {data?.stock} sản phẩm</Text>

          {data?.promotionPrice ? (
            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}>
              <span style={{ textDecoration: 'line-through', color: 'black' }}>
                {formatCurrency(data?.price)}
              </span>{' '}
              {formatCurrency(data?.promotionPrice)}
            </Text>
          ) : (
            <Text style={{fontWeight: 'bold',fontSize:25}}>{formatCurrency(data?.price)}</Text>
          )}

         
          <div style={{ display: 'flex', gap: 10, flexDirection: 'column'  }}>
          <Button 
  onClick={handleWishlist} 
  style={{ 
    border: '1px solid red', 
    height: '50px', 
    color: isFavorite ? 'red' : 'gray' ,
    width: '370px' 
  }}
>
  <FontAwesomeIcon 
    icon={faHeart} 
    fontSize={25} 
    style={{ color: isFavorite ? 'red' : 'gray' }} 
  /> 
  {isFavorite ? 'Đã yêu thích' : 'Yêu thích'}
</Button>

          
          <div style={{display:'flex', gap:10}}>
            <Button style={{ borderColor: '#379AE6FF', color: '#379AE6FF', height: '50px', width: '180px' }}>
              <FontAwesomeIcon icon={faCartShopping} fontSize={20} /> Thêm vào giỏ hàng
            </Button>
            <Button style={{ height: '50px', width: '180px', backgroundColor: '#379AE6FF', color: 'white' }}>
              Mua ngay
            </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 15 }}>
        <div style={{ width:'40%',display: 'flex', flexDirection: 'column', marginTop: 20, padding: 15, border: '1px solid #379AE6FF', borderRadius: 5 }}>
          <Title level={4} style={{ color: '#379AE6FF' }}>Thông tin chi tiết</Title>
          <Text><strong>Mã hàng:</strong> {data?.bookCode}</Text>
          <Text><strong>Tác giả:</strong> {data?.authorName}</Text>
          <Text><strong>Nhà xuất bản:</strong> {data?.publisherName}</Text>
          <Text><strong>Số trang:</strong> {data?.pageCount}</Text>
          <Text><strong>Ngôn Ngữ:</strong> {data?.language}</Text>
          <Text><strong>Thể loại:</strong> {data?.categoryNames.join(', ')}</Text>

          {/* <Text><strong>Năm XB:</strong> 2024</Text>
          <Text><strong>Trọng lượng (gr):</strong> 450</Text>
          <Text><strong>Kích Thước Bao Bì:</strong> 20.5 x 14.5 x 2.1 cm</Text>
          <Text><strong>Hình thức:</strong> Bìa Mềm</Text> */}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            padding: 15,
            border: '1px solid #379AE6FF',
            borderRadius: 5,
          }}
        >
          <Title level={4} style={{ color: '#379AE6FF' }}>Thông tin sách</Title>
          <div
            style={{ width: '55vw', fontSize: '16px', lineHeight: '1.6', overflow: 'hidden', maxHeight: isExpanded ? 'none' : '200px' }}
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
           
          
            <Button
              type="link"
              onClick={toggleExpanded}
              style={{ color: '#379AE6FF', fontWeight: 'bold', marginTop: 10 }}
            >
              {isExpanded ? 'Thu gọn' : 'Xem thêm'} {isExpanded ? <UpOutlined /> : <DownOutlined />}
            </Button>
         
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, padding: 30, border: '1px solid #379AE6FF', borderRadius: 5 }}>
        <Title level={4} style={{ color: '#379AE6FF' }}>Có thể bạn quan tâm</Title>
        <div style={{ marginTop: '10px' }}>
          <Slider {...settings}>
            {otherBooks?.map((product,index) => (
               <div key={index}>
              <Card
                // hoverable
                bordered={false}
                style={{ height:'300px', margin: '5px', borderRadius: 5, padding: '10px', border: '1px solid #379AE6FF',  borderColor: "#379AE6FF", cursor: 'pointer' }}
                cover={<img style={{ objectFit: 'contain' }} alt={product.title} src={product.imageUrls} />}
                onClick={() => handleCardClick(product.slug)}
              >
                <Card.Meta title={product.name} description={`${product.authorName}`} />
                <p style={{ marginTop: 10, fontWeight: 'bold', color: 'red' }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </p>
                <p><Rate disabled defaultValue={product?.averagePoint} style={{ fontSize: 12 }} /></p>
              </Card>
              </div>  

            ))}
          </Slider>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, padding: 30, border: '1px solid #379AE6FF', borderRadius: 5 }}>
      <Title level={4} style={{ color: '#379AE6FF' }}>Đánh giá sản phẩm</Title>
      <div style={{display:'flex', gap:40, justifyContent:'space-around'}}>
        <div style={{marginTop: 50,alignItems:'center',display:'flex',flexDirection:'column'}}>
           <div style={{fontSize: 50}}>4/5</div>
             <Rate disabled defaultValue={4} />
             {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} style={{ display: 'flex', flexDirection:'row', marginBottom: 10 }}>
            <div style={{ width: 50  }}> {star} sao</div>
            <Progress 
              percent={getPercentage(star)}
              style={{ width:'100px'}} 
              size="default"
              strokeColor="#379AE6FF"
            />
        
          </div>
        ))}
        </div>
         <div style={{ marginTop: '20px' }}>
        {currentReviews.map((review, index) => (
          <Card
            key={index}
            style={{ borderColor: "#379AE6FF", marginTop: 10 }}
            hoverable
            onClick={() =>
              openModal(
                review.email,
                review.bookingCode,
                review.createDate,
                review.rate,
                review.comment
              )
            }
          >
            <Title level={5}>{review?.email}</Title>
            <Text>Mã đơn hàng: {review?.bookingCode}</Text>
            <p>Ngày đánh giá: {moment(review?.createDate).format("DD-MM-YYYY")}</p>
            <p>Đánh giá: {review?.rate}/10 {renderRatingDescription(review?.rate)}</p>
            <p>"{truncateText(review?.comment, 50)} "</p>
          </Card>
        ))}
         <Pagination
        current={currentPage}
        total={fakeReviews.length}
        pageSize={reviewsPerPage}
        onChange={onPageChange}
        style={{ marginTop: 20, textAlign: 'center' }}
      />
      </div>

     
      </div>
    </div>
    </div>
    <Modal
        title="Chi tiết đánh giá"
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Đóng
          </Button>,
        ]}
      >
        {fakeReviews && (
          <div>
            <p>
              <strong>Email:</strong> {fakeReviews.email}
            </p>
            <p>
              <strong>ID Booking:</strong> {fakeReviews.bookingCode}
            </p>
            <p>
              <strong>Ngày đánh giá:</strong>{" "}
              {moment(fakeReviews.date).format("DD-MM-YYYY")}
            </p>
            <p>
              <strong>Đánh giá:</strong> {fakeReviews.rating}/10{" "}
              {renderRatingDescription(fakeReviews.rating)}
            </p>
            <p>
              <strong>Bình luận:</strong> {fakeReviews.comment}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Details;


const ratings = {
  1: 5,
  2: 8,
  3: 12,
  4: 15,
  5: 30,
};


// Hàm rút ngắn văn bản (cắt đoạn văn bản)
const truncateText = (text, length) => {
if (text.length > length) {
  return text.substring(0, length) + '...';
}
return text;
};
// Tính tổng số lượng đánh giá
const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);

// Tính phần trăm cho mỗi mức sao
const getPercentage = (rating) => {
  return ((ratings[rating] / totalRatings) * 100).toFixed(1);
};



const fakeReviews = [
  {
    email: "user1@example.com",
    bookingCode: "BK12345",
    createDate: "2024-10-15T08:00:00Z",
    rate: 8,
    comment: "Sách rất hay, nội dung hấp dẫn và dễ hiểu. Mình rất thích!"
  },
  {
    email: "user2@example.com",
    bookingCode: "BK12346",
    createDate: "2024-10-20T10:00:00Z",
    rate: 7,
    comment: "Câu chuyện thú vị nhưng có một số phần hơi dài dòng."
  },
  {
    email: "user3@example.com",
    bookingCode: "BK12347",
    createDate: "2024-10-22T12:30:00Z",
    rate: 9,
    comment: "Một tác phẩm tuyệt vời, rất đáng đọc. Tôi sẽ giới thiệu cho bạn bè."
  },
  {
    email: "user4@example.com",
    bookingCode: "BK12348",
    createDate: "2024-10-25T14:00:00Z",
    rate: 6,
    comment: "Sách ổn, nhưng mình mong đợi nhiều hơn về nội dung."
  },
];