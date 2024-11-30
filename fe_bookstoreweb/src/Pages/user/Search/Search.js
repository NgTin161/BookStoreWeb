import { Col, Collapse, Pagination, Rate, Row, Select, Slider, Tree, Typography } from 'antd'
import Card from 'antd/es/card/Card';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { Option } from 'antd/es/mentions';
import React, { useEffect, useState } from 'react'


import { FolderOpenOutlined, FileOutlined } from '@ant-design/icons';
import { axiosJson } from '../../../axios/AxiosCustomize';

const { Panel } = Collapse;

const { Title, Text } = Typography;



const Search = () => {
    const [priceRange, setPriceRange] = useState([0, 3000000]);
    const [sortOrder, setSortOrder] = useState('asc');

     const [categories, setCategories] = useState([]);
     const [publishers, setPublishers] = useState([]);

    const fetchPublishers = async () => {
        const response = await axiosJson.get('/Filter/get-publishers');
        setPublishers(response.data);
    }

    const fetchCategories = async () => {
        const response = await axiosJson.get('/Filter/get-categories');
        const formattedData = response.data.map(category => ({
            id: category.id,
            name: category.nameCategory
        }));
        setCategories(formattedData);
        
        console.log(formattedData);
        setCategories(formattedData);
    }
    
    
    useEffect(() => {
        fetchPublishers();
        fetchCategories();
    }, []);

    const [filters, setFilters] = useState({
        acceptChildren: false,
        acceptPet: false,
        supportPeopleWithDisabilities: false,
        haveElevator: false,
        haveSwimmingPool: false,
        ratingStarts: Array(5).fill(false), // Array for 5 stars
    });

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const handleFilterChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.checked,
        });
    };

    const handleRatingChange = (index) => {
        const newRatingStars = filters.ratingStarts.map((checked, i) => (i === index ? !checked : checked));
        setFilters({
            ...filters,
            ratingStarts: newRatingStars,
        });
    };

    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const currentProducts = relatedProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (checkedValues, category) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            category: checkedValues,
        }));
    };
    

    const mapCategoryToTreeData = (categories) => {
        return categories
          .filter(category => category?.childCategories?.length > 0) // Lọc ra các mục có con
          .map((category) => ({
            title: category.nameCategory,   // Tên hiển thị trên cây
            key: category.id,       // Key duy nhất cho mỗi node
            children: mapCategoryToTreeData(category?.childCategories) // Đệ quy nếu có các mục con
          }));
      };
      
    // const categories = [
    //     {
    //       title: 'Văn học',
    //       key: '1',
    //       children: [
    //         { title: 'Tiểu thuyết', key: '1-1' },
    //         { title: 'Truyện ngắn', key: '1-2' },
    //         { title: 'Thơ ca', key: '1-3' },
    //         { title: 'Hồi ký', key: '1-4' },
    //         { title: 'Truyện cổ tích', key: '1-5' },
    //       ],
    //     },
    //     {
    //       title: 'Khoa học',
    //       key: '2',
    //       children: [
    //         { title: 'Vật lý', key: '2-1' },
    //         { title: 'Hoá học', key: '2-2' },
    //         { title: 'Sinh học', key: '2-3' },
    //         { title: 'Thiên văn học', key: '2-4' },
    //         { title: 'Khoa học máy tính', key: '2-5' },
    //       ],
    //     },
    //     {
    //       title: 'Kinh tế',
    //       key: '3',
    //       children: [
    //         { title: 'Kinh tế học', key: '3-1' },
    //         { title: 'Quản trị kinh doanh', key: '3-2' },
    //         { title: 'Marketing', key: '3-3' },
    //         { title: 'Tài chính', key: '3-4' },
    //         { title: 'Đầu tư', key: '3-5' },
    //       ],
    //     },
    //     {
    //       title: 'Lịch sử',
    //       key: '4',
    //       children: [
    //         { title: 'Lịch sử Việt Nam', key: '4-1' },
    //         { title: 'Lịch sử thế giới', key: '4-2' },
    //         { title: 'Chiến tranh thế giới', key: '4-3' },
    //         { title: 'Lịch sử hiện đại', key: '4-4' },
    //         { title: 'Khảo cổ học', key: '4-5' },
    //       ],
    //     },
    //     {
    //       title: 'Tâm lý học',
    //       key: '5',
    //       children: [
    //         { title: 'Tâm lý học hành vi', key: '5-1' },
    //         { title: 'Tâm lý học xã hội', key: '5-2' },
    //         { title: 'Thần kinh học', key: '5-3' },
    //         { title: 'Phát triển cá nhân', key: '5-4' },
    //         { title: 'Tâm lý trị liệu', key: '5-5' },
    //       ],
    //     },
    //   ];
      const [selectedKeys, setSelectedKeys] = useState([]);

      // Hàm xử lý thay đổi khi người dùng thay đổi trạng thái checkbox
      const onCheck = (checkedKeys) => {
        setSelectedKeys(checkedKeys); // Cập nhật selectedKeys khi có thay đổi
      };
    
    return (
        <div className="" style={{ display: 'flex', gap: 10, margin:'20px' }}>
            <div style={{ border: '1px solid  #379AE6FF', borderRadius: '15px', width: '25vw' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px', flexDirection: 'column' }}>
                    <Title level={3} style={{ color: '#379AE6FF', fontWeight: 'bold' }}>Lọc theo:</Title>
                    <Select defaultValue="asc" style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', width: 210 }} onChange={(value) => setSortOrder(value)}>
                        <Option value="asc">Sắp xếp theo giá thấp nhất</Option>
                        <Option value="desc">Sắp xếp theo giá cao nhất</Option>
                    </Select>
                </div>
                <div style={{ padding: '20px', marginTop: 0, display: 'flex', flexDirection: 'column' }}>
                    <Typography.Title level={5}>Giá tiền của bạn:</Typography.Title>
                    <Slider
                        range
                        value={priceRange}
                        onChange={handlePriceChange}
                        defaultValue={[0, 3000000]}
                        min={0}
                        max={3000000}
                    />

                    <Typography variant="body" color="textSecondary">Từ: {priceRange[0].toLocaleString()} VND - Đến: {priceRange[1].toLocaleString()} VND</Typography>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: '10px' }}>
                        <Typography.Title level={5}>Thể loại:</Typography.Title>
                        {/* <Checkbox name="fiction" checked={filters.fiction} onChange={handleFilterChange}>Tiểu thuyết</Checkbox>
                        <Checkbox name="science" checked={filters.science} onChange={handleFilterChange}>Khoa học</Checkbox>
                        <Checkbox name="history" checked={filters.history} onChange={handleFilterChange}>Lịch sử</Checkbox>
                        <Checkbox name="philosophy" checked={filters.philosophy} onChange={handleFilterChange}>Triết học</Checkbox>
                        <Checkbox name="selfHelp" checked={filters.selfHelp} onChange={handleFilterChange}>Tự lực</Checkbox>
                        <Checkbox name="psychology" checked={filters.psychology} onChange={handleFilterChange}>Tâm lý học</Checkbox>
                        <Checkbox name="children" checked={filters.children} onChange={handleFilterChange}>Thiếu nhi</Checkbox>
                        <Checkbox name="romance" checked={filters.romance} onChange={handleFilterChange}>Lãng mạn</Checkbox>
                        <Checkbox name="fantasy" checked={filters.fantasy} onChange={handleFilterChange}>Giả tưởng</Checkbox>
                         */}

<Tree
       
        checkable
        
        onCheck={onCheck}
        treeData={categories}
    
     
      />



{categories.map( item => (
                <Checkbox
                    key={item.id}
                    name={item.name}
                    // checked={filters[category.id]}
                    onChange={handleFilterChange}
                >
                    {item.name}
                </Checkbox>
            ))}
                         
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: '10px' }}>
                    <Typography.Title level={5}>Nhà xuất bản:</Typography.Title>
            {publishers.map( item => (
                <Checkbox
                    key={item.id}
                    name={item.name}
                    // checked={filters[category.id]}
                    onChange={handleFilterChange}
                >
                    {item.name}
                </Checkbox>
            ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: '10px' }}>
                        <Typography.Title level={5}>Ngôn ngữ:</Typography.Title>
                        <Checkbox name="fiction" checked={filters.fiction} onChange={handleFilterChange}>Tiếng Việt</Checkbox>
                        <Checkbox name="science" checked={filters.science} onChange={handleFilterChange}>Tiếng Anh</Checkbox>
                        <Checkbox name="history" checked={filters.history} onChange={handleFilterChange}>Song Ngữ (Anh - Việt)</Checkbox>
                        <Checkbox name="philosophy" checked={filters.philosophy} onChange={handleFilterChange}>Khác</Checkbox>

                    </div>
                </div>
            </div>
            <div style={{  width: '80vw', padding: '20px' }}>
                {/* Dùng Flexbox để hiển thị 4 sản phẩm mỗi hàng */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10, // Khoảng cách giữa các sản phẩm
                }}>
                    {currentProducts.map((product, index) => (
                        <div key={index} style={{ borderRadius: '5px' }}> {/* Mỗi sản phẩm chiếm 23% chiều rộng */}
                            <Card
                                hoverable
                                bordered={false}
                                style={{
                                    width: '200px',
                                    height: '300px',
                                    borderRadius: '5px',
                                    border: '1px solid #379AE6FF',
                                    cursor: 'pointer'
                                }}
                                cover={<img style={{ objectFit: 'contain', height: '150px' }} alt={product.title} src={product.image} />}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {/* Title with ellipsis for overflow */}
                                    <span style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontWeight: 'bold',
                                        lineHeight: '1.4'
                                    }}>
                                        {product.title}
                                    </span>

                                    {/* Author with ellipsis if needed */}
                                    <span style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontSize: '0.85rem',
                                        color: 'gray',
                                        lineHeight: '1.4'
                                    }}>
                                        {product.author}
                                    </span>

                                    {/* Price with margin */}
                                    <span style={{
                                        marginTop: 10,
                                        fontWeight: 'bold',
                                        color: 'red',
                                        lineHeight: '1.4'
                                    }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </span>

                                    {/* Rating */}
                                    <span>
                                        <Rate disabled defaultValue={product.rate} style={{ fontSize: 12 }} />
                                    </span>
                                </div>
                            </Card>

                        </div>
                    ))}
                </div>

                {/* Phân trang */}
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={relatedProducts.length}
                    onChange={handlePageChange}
                    style={{ marginTop: '20px', textAlign: 'center', justifyContent:'center' }}
                />
            </div>
        </div>
    )
}

export default Search


const relatedProducts = [
    {
        id: 1,
        title: 'Sapiens: Lược sử loài người',
        author: 'Yuval Noah Harari',
        price: 120000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 2,
        title: 'Homo Deus: Lược sử tương lai',
        author: 'Yuval Noah Harari',
        price: 135000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 2
    },
    {
        id: 3,
        title: '21 Bài học cho thế kỷ 21',
        author: 'Yuval Noah Harari',
        price: 140000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 4,
        title: 'Nghệ thuật tinh tế của việc đếch quan tâm',
        author: 'Mark Manson',
        price: 95000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 5,
        title: 'Đắc Nhân Tâm',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    {
        id: 6,
        title: 'Nguyễn Trung Tín',
        author: 'Dale Carnegie',
        price: 110000,
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/435/244/products/sg11134201221202ucumy8655kvff-e77f3ab8-38e3-4fd5-8470-0f8d19a9ba9b.jpg?v=1672971355547',
        rate: 3
    },
    
];