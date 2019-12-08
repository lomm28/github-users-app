import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';

import AntModal from '../../components/Modal';
import UsersList from '../../components/Lists/UsersList';
import useLoaderHook from './reducer';
import { loadUsers } from './actions';

const styles = {
  container: {
    background: '#ECECEC',
    padding: '30px',
  },
  card: {
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loadBtn: {
    marginBottom: 15,
  },
};

const Dashboard = () => {
  const { state, dispatch } = useLoaderHook();
  const [modal, updateModal] = useState({
    isVisible: false,
    isModalLoading: false,
  });

  const { users, hasMoreUsers, currentUser, repos, modalMode, error } = state;
  const { isVisible, isModalLoading } = modal;
  const { hasError, message: errMsg } = error;

  useEffect(() => {
    loadUsers(dispatch, state);
  }, []);

  const handleOk = () =>
    updateModal({ isVisible: false, isModalLoading: false });

  const fetchAndShowData = async (username, callback) => {
    try {
      updateModal({ isVisible: true, isModalLoading: true });
      await callback(dispatch, username);
      updateModal(prevState => ({ ...prevState, isModalLoading: false }));
    } catch (e) {
      updateModal(prevState => ({ ...prevState, isModalLoading: true }));
    }
  };

  if (hasError) {
    message.error(errMsg);
    return false;
  }

  return (
    <>
      <AntModal
        visible={isVisible}
        handleOk={handleOk}
        currentUser={currentUser}
        repos={repos}
        mode={modalMode}
        isLoading={isModalLoading}
      />
      <div style={styles.container}>
        <Button
          type="primary"
          style={styles.loadBtn}
          disabled={!hasMoreUsers}
          onClick={() => loadUsers(dispatch, state)}
        >
          Load More Users
        </Button>
        <UsersList users={users} fetchAndShowData={fetchAndShowData} />
      </div>
    </>
  );
};

export default Dashboard;
