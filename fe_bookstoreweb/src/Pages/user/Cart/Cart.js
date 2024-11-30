import React, { useState } from 'react';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import ButtonGroup from 'antd/es/button/button-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  // Sử dụng useState để quản lý số lượng mỗi sản phẩm
  const [cartItems, setCartItems] = useState(
    exampleData.map((item) => ({ ...item, quantity: 1 }))
  );

  // Tính tổng tiền của tất cả các sản phẩm trong giỏ hàng
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Hàm tăng số lượng
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm xóa sản phẩm
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h3>Giỏ hàng</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ border: '1px solid #379AE6FF', width: '60vw', margin: '20px' }}>
          {cartItems.length > 0 ? (
            <div>
              {/* Tiêu đề của các cột */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '30px',
                borderBottom: '2px solid #ddd',
                fontWeight: 'bold'
              }}>
                <div> Sản phẩm</div>
                <div style={{marginLeft: '200px'}}> Số lượng</div>
                <div> Thành tiền</div>
                <div></div>
              </div>

              {/* Hiển thị các sản phẩm trong giỏ hàng */}
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px',
                  gap: 10,
                  borderBottom: '1px solid #ddd'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' ,width:'200px'}}>
                      <span>{item.title}</span>
                      <span>{item.price.toLocaleString()} VND</span>
                    </div>
                  </div>
                  <div style={{  display: 'flex', alignItems: 'center' }}>
                    <ButtonGroup>
                      <Button onClick={() => decreaseQuantity(item.id)} icon={<MinusOutlined />} />
                      <Button>{item.quantity}</Button>
                      <Button onClick={() => increaseQuantity(item.id)} icon={<PlusOutlined />} />
                    </ButtonGroup>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{(item.price * item.quantity).toLocaleString()} VND</span>
                  </div>
                  <div style={{  textAlign: 'center',alignItems:'center' ,alignContent:'center'}}>  
                  <Button onClick={() => removeItem(item.id)} icon={<FontAwesomeIcon icon={faTrash} />}></Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Giỏ hàng của bạn trống</p>
          )}
        </div>

        {/* Tổng cộng bên phải */}
        <div style={{
          border: '1px solid #379AE6FF',
          padding: '20px',
          height: 'fit-content',
          width: '25%',
          margin: '20px'
        }}>
          <h4>Tổng cộng</h4>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{totalPrice.toLocaleString()} VND</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// Dữ liệu ví dụ với số lượng ban đầu là 1
const exampleData = [
  {
    id: 1,
    title: 'Sapiens: Lược sử loài người',
    author: 'Yuval Noah Harari',
    price: 120000,
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
    rate: 3,
    quantity: 1,
  },
  {
    id: 2,
    title: 'Homo Deus: Lược sử tương lai',
    author: 'Yuval Noah Harari',
    price: 135000,
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
    rate: 2,
    quantity: 1,
  },
  {
    id: 3,
    title: '21 Bài học cho thế kỷ 21',
    author: 'Yuval Noah Harari',
    price: 140000,
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
    rate: 3,
    quantity: 1,
  },
  {
    id: 4,
    title: 'Nghệ thuật tinh tế của việc đếch quan tâm',
    author: 'Mark Manson',
    price: 95000,
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
    rate: 3,
    quantity: 1,
  },
  {
    id: 5,
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 110000,
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
    rate: 3,
    quantity: 1,
  }
];
