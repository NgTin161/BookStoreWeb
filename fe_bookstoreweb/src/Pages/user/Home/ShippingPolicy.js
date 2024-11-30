import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAnglesDown, faAnglesUp, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import React, { useState } from 'react';

const ShippingPolicy = ({ shippingPolicy }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div
      className="container"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #379AE6FF',
        alignItems: 'center',
        borderRadius: '5px',
        overflow: 'hidden', // To hide overflow content when collapsed
        maxHeight: isExpanded ? 'none' : '300px', // Truncate height when collapsed
        transition: 'max-height 0.3s ease-out',
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: shippingPolicy }}
        style={{
          display: 'block',
          overflow: 'hidden', // Hide overflow content when truncated
          whiteSpace: 'pre-wrap', // Maintain line breaks
        }}
      />
      
     
      <Button
        type="link"
        onClick={handleToggle}
        style={{ color: '#379AE6FF', fontWeight: 'bold', marginTop: 10 }}
        aria-expanded={isExpanded}
        aria-controls="shipping-policy-content"
      >
        {isExpanded ? 'Thu gọn' : 'Xem thêm'}{' '}
        {isExpanded ? <FontAwesomeIcon icon={faAnglesUp} /> : <FontAwesomeIcon icon={faAnglesDown} />}
      </Button>
      
    </div>
  );
};

export default ShippingPolicy;
