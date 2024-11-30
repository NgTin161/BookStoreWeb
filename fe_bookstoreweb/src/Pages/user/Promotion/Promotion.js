import React from 'react';

const Promotion = () => {
  return (
    <div style={{ padding: '20px', lineHeight: '1.8', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ color: '#ff4d4f', textAlign: 'center' }}>🎉 CHƯƠNG TRÌNH KHUYẾN MÃI "MUA SẮM KHÔNG TIỀN MẶT" 🎉</h2>
      <p>✨ <strong>Ưu đãi hấp dẫn</strong> dành riêng cho khách hàng thanh toán qua ví điện tử và ngân hàng:</p>
      <ul style={{ marginLeft: '20px' }}>
        <li>Giảm ngay <strong>10%</strong> cho đơn hàng thanh toán qua ví điện tử (tối đa 100.000 VNĐ).</li>
        <li>Hoàn tiền <strong>5%</strong> cho giao dịch qua thẻ ngân hàng (áp dụng cho đơn hàng từ 500.000 VNĐ).</li>
        <li>Deal sốc <strong>0 đồng</strong> khi mua sắm trong khung giờ vàng (<strong>12h-14h</strong>).</li>
        <li>Miễn phí vận chuyển cho đơn hàng thanh toán không tiền mặt từ <strong>300.000 VNĐ</strong>.</li>
      </ul>
      <p>💳 <strong>Thanh toán nhanh, nhận ưu đãi lớn!</strong></p>
      <p>📅 <strong>Thời gian áp dụng:</strong> Từ ngày <strong>01/12/2024</strong> đến <strong>15/12/2024</strong>.</p>
      <p style={{ textAlign: 'center', color: '#ff7a45', fontWeight: 'bold', fontSize: '18px' }}>
        ⚡ Đừng bỏ lỡ cơ hội, <span style={{ textDecoration: 'underline' }}>mua sắm ngay hôm nay!</span>
      </p>
    </div>
  );
};

export default Promotion;
