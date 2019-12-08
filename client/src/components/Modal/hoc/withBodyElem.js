import React from 'react';
import { Spin } from 'antd';
import AntTable from '../../AntTable';
import DetailsList from '../../Lists/DetailsList';

const withBodyElem = Component => {
  const Composed = props => {
    console.log(props);
    const { mode, currentUser, repos, isLoading, visible } = props;

    if(visible && isLoading) return <Spin size="large" />

    return (
      <Component 
        {...props} 
        title={mode === 'list' ? 'User Details' : 'User Repos'}
      >
        {mode === 'list' ? 
          <DetailsList user={currentUser}/> : 
          <AntTable repos={repos}/>
        }
      </Component>
    );
  };
  return Composed;
};

export default withBodyElem;
