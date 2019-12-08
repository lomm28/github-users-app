import React from 'react';
import { arrayOf, oneOfType, string, shape } from 'prop-types';

import AntTable from '../../AntTable';
import DetailsList from '../../Lists/DetailsList';

const withBodyElem = Component => {
  const Composed = props => {
    const { mode, currentUser, repos } = props;

    return (
      <Component
        {...props}
        title={mode === 'list' ? 'User Details' : 'User Repos'}
      >
        {mode === 'list' ? (
          <DetailsList user={currentUser} />
        ) : (
          <AntTable repos={repos} />
        )}
      </Component>
    );
  };

  Composed.propTypes = {
    mode: string.isRequired,
    currentUser: shape({}).isRequired,
    repos: oneOfType([shape({}), arrayOf(shape({}))]).isRequired,
  };

  return Composed;
};

export default withBodyElem;
