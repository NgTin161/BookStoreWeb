import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
const LoadingSpinner = <LoadingOutlined style={{ fontSize: 50 }} spin />;
const SpinComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
      <Spin indicator={LoadingSpinner} />
    </div>
  );
};

export default SpinComponent;