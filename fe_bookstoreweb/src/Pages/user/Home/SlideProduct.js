import React from 'react';
import { Card, Rate, Progress, Button } from "antd";
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';



const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
const SlideProduct = ({data,title }) => {
    const navigate = useNavigate();

    const handleCardClick = (slugDetail) => {
        navigate(`/${slugDetail}`); 
      };
    const products = [
        { id: 1, name: 'Lược sử loài người aaaaaaaaaaaaaaaaaa', price: '70.000 đ', promotionalPrice: '50.000 đ', sold: 50, stock: 100, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 2, name: 'Lược sử loài người', price: '70.000 đ', promotionalPrice: null, sold: 30, stock: 100, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 3, name: 'Lược sử loài người', price: '70.000 đ', promotionalPrice: '60.000 đ', sold: 80, stock: 100, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 4, name: 'Lược sử loài người', price: '70.000 đ', promotionalPrice: null, sold: 10, stock: 100, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
        { id: 5, name: 'Lược sử loài người', price: '70.000 đ', promotionalPrice: '65.000 đ', sold: 65, stock: 100, img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' },
    ];

    return (
        <div 
            className="container"
            style={{ 
                border: '1px solid #379AE6FF', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                marginTop: '20px', 
                padding: '20px', 
                borderRadius: '10px'
            }}
        >
            <h4 style={{ padding: 10 }}>{title}</h4>
            <div 
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '10px', 
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: '5px'
                }}
            >
                {data?.map(product => {
                 const soldPercentage = (product?.soldCount && product?.stock) ? (product.soldCount / product.stock) * 100 : 0;
                    return (
                        <Card 
                            key={product.id}
                            hoverable
                            style={{ 
                                border: '1px solid #379AE6FF', 
                                borderRadius: '10px', 
                                padding: '10px', 
                                textAlign: 'center' 
                            }}
                            onClick={() => handleCardClick(product?.slug)}
                        >
                            <img 
                                style={{ objectFit: 'contain', height: '150px', marginBottom: '10px' }} 
                                alt="example" 
                                src={product?.imageUrls} 
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span 
                                    style={{ 
                                        fontSize: '16px', 
                                        fontWeight: 'bold', 
                                        width: '100%', 
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis',
                                        display: 'inline-block'
                                    }}
                                    title={product.name}
                                >
                                    {product.name}
                                </span>
                                <div>
                                    {product.promotionalPrice ? (
                                        <div>
                                            <span 
                                                style={{ 
                                                    textDecoration: 'line-through', 
                                                    color: '#B0B0B0', 
                                                    marginRight: '10px' 
                                                }}
                                            >
                                                {formatCurrency(product.price)}
                                            </span>
                                            <span style={{ color: '#E74C3C', fontWeight: 'bold' }}>
                                            {formatCurrency(product.promotionalPrice)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span style={{ color: '#E74C3C', fontWeight: 'bold' }}>
                                            {formatCurrency(product.price)}
                                        </span>
                                    )}
                                </div>
                                {/* Progress Bar */}
                                <Progress 
                                    percent={Math.round(soldPercentage)} 
                                    status="active" 
                                    format={() => `Đã bán ${product?.soldCount ?? 0}`} // Hiển thị text bên trong
                                    style={{ width: '100%', marginTop: '10px' }}
                                />
                                <Rate disabled defaultValue={product?.averagePoint} style={{ fontSize: 12 }} />
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Button
            type="link"
            // onClick={toggleExpanded}
            style={{ color: '#379AE6FF', fontWeight: 'bold', marginTop: 10 }}
          >
             Xem thêm <FontAwesomeIcon icon={faAnglesDown} />
             </Button>
        </div>
    );
};

export default SlideProduct;
