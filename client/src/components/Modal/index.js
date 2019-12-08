import React from 'react';
import { Modal, Spin } from 'antd';
import { bool, func, element, string } from 'prop-types';

import withBodyElem from './hoc/withBodyElem';

const styles = {
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const AntModal = ({ visible, handleOk, children, title, isLoading }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleOk}
      destroyOnClose
      width={700}
    >
      {visible && isLoading ? (
        <Spin size="large" style={styles.spinner} />
      ) : (
        children
      )}
    </Modal>
  );
};

AntModal.propTypes = {
  visible: bool.isRequired,
  handleOk: func.isRequired,
  children: element.isRequired,
  title: string.isRequired,
  isLoading: bool.isRequired,
};

export default withBodyElem(AntModal);
