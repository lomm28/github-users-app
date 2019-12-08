import React from 'react';
import { Modal } from 'antd';
import withBodyElem from './hoc/withBodyElem';

const AntModal = ({ 
  visible, 
  handleOk, 
  handleCancel,
  children,
  title,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      destroyOnClose
      width={700}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default withBodyElem(AntModal);