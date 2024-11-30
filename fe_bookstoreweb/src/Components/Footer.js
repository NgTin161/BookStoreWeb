import React, { useEffect, useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = ({data}) => {
    const [coordinates, setCoordinates] = useState(null);
    

    useEffect(() => {
        const address = data?.address;
        if (!address) return; // Nếu không có address, dừng việc gọi API
    
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(address)}&api_key=Wnd0Mv769OfC0fQyWfzcqJXjtHyaPSM4R5sCaeIy`
                );
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;
                    setCoordinates({ lat, lng });
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };
    
        fetchCoordinates();
    }, [data?.address]);

    useEffect(() => {
        if (coordinates) {
            const map = new window.maplibregl.Map({
                container: 'map',
                style: `https://tiles.goong.io/assets/goong_map_web.json?api_key=7vnAVNobyzY89uRMLrNuOkvwAQiUeKY1I7LwqLyA`,
                center: [coordinates.lng, coordinates.lat],
                zoom: 15,
                attributionControl: false,
                bearing: 30
            });

            // const marker = new window.maplibregl.Marker()
            //     .setLngLat([coordinates.lng, coordinates.lat])
            //     .addTo(map);

            // // Tạo popup cho marker
            // const popupContent = `<h4>Công ty cổ phần sách ABC</h4>`;
            // const popup = new window.maplibregl.Popup({ offset: [0, -30] })
            //     .setHTML(popupContent);

            // // Gắn popup vào marker
            // marker.setPopup(popup);

            // // Lắng nghe sự kiện thay đổi kích thước để tái tạo bản đồ khi thay đổi kích thước
            // window.addEventListener('resize', () => {
            //     map.resize();
            // });

            // Xóa bản đồ khi component unmount để tránh tạo nhiều bản đồ
            return () => map.remove();
               
        }
    }, [coordinates]);

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <p>{data?.name}</p>
                    <p>Địa chỉ: {data?.address}</p>
                    <p>Email: {data?.email}</p>
                    <p>CSKH: {data?.phone}</p>
                    <h4>Kết nối với chúng tôi</h4>
                    <div className="social-icons">
                   <a href={data?.facebookLink} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                   <a href={data?.instagramLink} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>   
                   <a href={data?.instagramLink} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube} />    </a>
                        <img src="/Logo/dathongbaobocongthuong.png" alt="logo" className=""  style={{width:'120px', height:'40px'}}/>   
                    </div>
                  
                </div>
                
                <div className="footer-column">
                
                    <p>Dịch vụ</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Chính sách bảo mật thông tin cá nhân</p>
                    <p>Chính sách bảo mật thanh toán</p>
                    <p>Giới thiệu Fahasa</p>
                </div>
                
                <div className="footer-column">
                    <p>Hỗ trợ</p>
                    <p>Chính sách đổi - trả - hoàn tiền</p>
                    <p>Chính sách bảo hành - bồi hoàn</p>
                    <p>Chính sách vận chuyển</p>
                    <p>Chính sách khách sỉ</p>
                </div>
            </div>
            
            <div className="map-container">
                {coordinates ? (
                    <div id="map" className="map"></div>
                ) : (
                    <p>Loading map...</p>
                )}
                <div style={{ margin:20  }}> 
                    <div style={{ padding: '20px', display: 'flex', gap: '30px',justifyContent:'center', alignItems:'center' }}>
                    <h3>Đối tác thanh toán:</h3>
                <img src="/Logo/momopay.webp" style={{width:'100px', height:'60px'}} alt=""  />
                <img src="/Logo/vnpay.webp"  style={{width:'100px', height:'60px'}}alt=""  />
                <img src="/Logo/visa-mastercard-logo.png"  style={{width:'100px', height:'60px'}}alt=""  />
                     </div>
                     <div style={{ padding: '20px', display: 'flex', gap: '30px',justifyContent:'center', alignItems:'center' }}>
                <h3>Đối tác giao hàng:</h3>
                <img src="/Logo/ahamove.webp" style={{width:'100px', height:'60px'}} alt=""  />
                <img src="/Logo/ninjavan.webp"  style={{width:'100px', height:'60px'}} alt=""  />
                <img src="/Logo/vnpost1.webp" style={{width:'100px', height:'60px'}}    alt=""  />
                </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;




  {/* <div style={{ borderColor: 'yellow', border: '1px solid' , display:'flex', flexDirection:'column' , width:'30%'}}> 
               <p style={{ margin: '4px 0' }} >Đối tác</p>
               <img src="/Logo/ahamove.webp" alt="logo" style={{ width: 100 , marginTop: 20 }} />
               <img src="/Logo/ninjavan.webp" alt="logo" style={{ width: 100 , marginTop: 20 }} />
               <img src="/Logo/vnpost1.webp" alt="logo" style={{ width: 100 , marginTop: 20 }} />
               <img src="/Logo/snappy.webp" alt="logo" style={{ width: 100 , marginTop: 20 }} />
               <img src="/Logo/vnpay.webp" alt="logo" style={{ width: 100 , marginTop: 20 }} />
               <img src="/Logo/momopay.webp" alt="logo" style={{ width: 100 , marginTop: 20 }} />

            </div>   */}