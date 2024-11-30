import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Pages/user/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/user/Home/Home';
import Login from './Pages/user/Login/Login';
import NotFound from './Pages/user/NotFound/NotFound';
import Register from './Pages/user/Register/Register';
import FogotPassword from './Pages/user/ForgotPassword/FogotPassword';
import ConfirmPassword from './Pages/user/ConfirmPassword/ConfirmPassword';
import Details from './Pages/user/Details/Details';
import Search from './Pages/user/Search/Search';
import Cart from './Pages/user/Cart/Cart';
import LayoutAdmin from './Pages/admin/LayoutAdmin';
import ConfirmPayment from './Pages/user/ConfirmPayment/ConfirmPayment';
import PrivateRoute from './axios/PrivateRoute';
import DashBoard from './Pages/admin/DashBoard';
import CategoryManager from './Pages/admin/CategoryManager/CategoryManager';
import Information from './Pages/admin/Information/Information';
import PublisherManager from './Pages/admin/PublisherManager/PublisherManager';
import Contact from './Pages/user/Contact/Contact';
import ProductManager from './Pages/admin/ProductManager/ProductManager';
import LayoutUser from './Pages/user/LayoutUser';
import Personal from './Pages/user/Personal/Personal';
import SlideShowManager from './Pages/admin/SlideShow/SlideShowManager';
import Category from './Pages/user/Category/Category';
import Chatbot from 'react-chatbot-kit';
import config from './chatbot/config';
import MessageParser from './chatbot/MessageParser';
import ActionProvider from './chatbot/ActionProvider';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import './chatbot/chatbot.css';
import Promotion from './Pages/user/Promotion/Promotion';
import Wishlist from './Pages/user/Wishlist/Wishlist';
import { Helmet } from 'react-helmet';
import PopupLogin from './Pages/user/Home/PopupLogin';

const App = () => {
  // State to control chatbot visibility and modal popup
  const [showChatbot, setShowChatbot] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to check if user is logged in (jwt stored in localStorage)
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsModalOpen(true); // Show login popup if no JWT
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<><Helmet><title>ABC.com - Nhà sách trực tuyến</title></Helmet><Home /></>} />
          <Route path="/chi-tiet" element={<Details />} />
          <Route path="/search" element={<Search />} />
          <Route path="/gio-hang" element={<> <Helmet><title>Giỏ hàng</title></Helmet><Cart /> </>} />
          <Route path="/lien-he" element={<> <Helmet><title>Liên hệ</title></Helmet><Contact /> </>} />
          <Route path="/danh-muc/:categoryslug" element={<Category />} />
          <Route path="/:bookslug" element={<Details />} />
          <Route path="/confirm-payment" element={<ConfirmPayment />} />
          <Route path="/dang-nhap" element={<><Helmet><title>Đăng nhập</title></Helmet><Login /></>} />
          <Route path="/dang-ky" element={<><Helmet><title>Đăng ký</title></Helmet><Register /></>} />
          <Route path="*" element={<><Helmet><title>Không tìm thấy</title></Helmet><NotFound /></>} />
          <Route path="/khuyen-mai" element={<><Helmet><title>Khuyến mãi</title></Helmet><Promotion /></>} />
        </Route>

        <Route path="/user" element={<PrivateRoute><LayoutUser /></PrivateRoute>}>
          <Route index path="thong-tin-ca-nhan" element={<><Helmet><title>Thông tin cá nhân</title></Helmet><Personal /></>} />
          <Route path="danh-sach-yeu-thich" element={<><Helmet><title>Danh sách yêu thích</title></Helmet><Wishlist /></>} />
        </Route>

        <Route path="/admin" element={<PrivateRoute><LayoutAdmin /></PrivateRoute>}>
          <Route path="dashboard" index element={<><Helmet><title>DashBoard</title></Helmet><DashBoard /></>} />
          <Route path="category-manager" element={<><Helmet><title>Quản lý danh mục</title></Helmet><CategoryManager /></>} />
          <Route path="information" element={<><Helmet><title>Thông tin trang web</title></Helmet><Information /></>} />
          <Route path="publisher-manager" element={<><Helmet><title>Quản lý nhà xuất bản</title></Helmet><PublisherManager /></>} />
          <Route path="product-manager" element={<><Helmet><title>Quản lý sản phẩm</title></Helmet><ProductManager /></>} />
          <Route path="slideshow-manager" element={<><Helmet><title>Quản lý Slideshow</title></Helmet><SlideShowManager /></>} />
        </Route>
      </Routes>

      {/* Chatbot Button */}
      <div className='chat-button' onClick={() => setShowChatbot(!showChatbot)} title={showChatbot ? "Đóng Chatbot" : "Mở Chatbot"}>
        <span className='icon'>
          {showChatbot ? <span>✖</span> : <FontAwesomeIcon icon={faFaceSmile} />}
        </span>
      </div>

      {/* Chatbot Interface */}
      {showChatbot && (
        <div className="chatbot-container">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}

     
      <PopupLogin setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </>
  );
}

export default App;
