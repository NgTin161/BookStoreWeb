import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Marquee from "react-fast-marquee";
import { Carousel, Flex } from 'antd';
import './Home.css'
import SlideProduct from './SlideProduct';
import { Helmet } from 'react-helmet';
import PopupLogin from './PopupLogin';
import TabCategory from './TabCategory';
import { axiosJson } from '../../../axios/AxiosCustomize';
import Partner from './Partner';
import ShippingPolicy from './ShippingPolicy';


const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideshow, setSlideshow] = useState([]);

  const [newBook, setNewBook] = useState([]);

  const [hotBook, setHotBook] = useState([]);
  const [shippingPolicy, setShippingPolicy] = useState('');
  const fetchSlideshow = async () => {
    const response = await axiosJson.get('/Home/get-slideshows');
    setSlideshow(response.data);
  }

  const fetchNewBook = async () => {
    const response = await axiosJson.get('/Home/new-books');
    setNewBook(response.data);
  }

  const fetchHotBook = async () => {
    const response = await axiosJson.get('/Home/hot-books');
    setHotBook(response.data);
  }

  const fetchShippingPolicy = async () => {
    const response = await axiosJson.get('/Home/shipping-policy');
    setShippingPolicy(response.data);
  }
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsModalOpen(true);
    }

    fetchSlideshow();
    fetchNewBook(); 
    fetchHotBook();
    fetchShippingPolicy();
       
  }, []);
  

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: slideshow?.length > 1,
  //   speed: 1000,
  //   autoplaySpeed: 5000,
  //   arrows: true,
  //   prevArrow: <CustomPrevArrow />,
  //   nextArrow: <CustomNextArrow />,
  // };

  return (
    < >
   
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px'}}>
 
      {/* <Slider {...settings}>
        {slideshow?.map((item, index) => (
          <div key={index} style={{ justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={item.link} target="_blank" rel="">
           
              <img 
                src={item.imageURL} 
                alt="Slide" 
                style={{ width: '94vw', height: '300px', objectFit: 'cover', borderRadius:'30px'  }} 
              />
            
            </a>
          </div>
        ))}
      </Slider> */}

      <Carousel style={{paddingLeft:'20px'}}  dots={false} arrows draggable={true} autoplay={true} autoplaySpeed={1000} >
      {slideshow?.map((item, index) => (
          // <div key={index} style={{ justifyContent:'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={item.link} target="_blank" rel="">
           
              <img 
                src={item.imageURL} 
                alt="Slide" 
                style={{ width: '94vw', height: '300px', objectFit: 'cover', borderRadius:'30px'  }} 
              />
            
            </a>
          // </div>
        ))}
    </Carousel>
        
   <SlideProduct data={hotBook} title="SẢN PHẨM HOT"/>
   <SlideProduct data={newBook} title="SẢN PHẨM MỚI"/>
   
   <TabCategory/> 
   <Partner/>

   <ShippingPolicy shippingPolicy={shippingPolicy} />
    <PopupLogin setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
    </div>
    </>
  );
};

export default Home;
