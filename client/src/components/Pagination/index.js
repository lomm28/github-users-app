import React from 'react';
import { number, func } from 'prop-types';
import { Pagination } from 'antd';

const style = {
  pagination: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

const AntPagination = ({ total, pageSize, onChange }) => {
  return (
    <div style={style.pagination}>
      <Pagination
        onChange={onChange}
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
};

AntPagination.propTypes = {
  total: number.isRequired,
  pageSize: number.isRequired,
  onChange: func.isRequired,
};

export default AntPagination;
