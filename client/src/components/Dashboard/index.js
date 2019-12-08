import React, { useEffect, useState } from 'react';
import { List, Avatar, Button } from 'antd';

import AntModal from '../Modal';
import useLoaderHook from './reducer';
import {  
  loadUsers,
  loadUserDetails,
  loadUserRepos 
} from './actions';

const { Item } = List;
const { Meta } = Item;

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
  const { users, hasMoreUsers, currentUser, repos, modalMode } = state;

  const [modal, updateModal] = useState({ isVisible: false });
  const [isModalLoading, updateLoader] = useState(false);
  const { isVisible } = modal;

  useEffect(() => {
    loadUsers(dispatch, state);
  }, []);

  const handleOk = () => updateModal({ isVisible: false });
  const handleCancel = () => updateModal({ isVisible: false });

  const showUserDetails = async username => {
    try {
      updateLoader(true);
      updateModal({ isVisible: true });
      await loadUserDetails(dispatch, username);
      updateLoader(false);
    } catch (e) {
      updateLoader(true);
    }
  };

  const showUserRepos = async username => {
    try {
      updateLoader(true);
      updateModal({ isVisible: true });
      await loadUserRepos(dispatch, username);
      updateLoader(false);
    } catch(e) {
      updateLoader(true);
    }
  };

  return (
    <>
      <AntModal 
        visible={isVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
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
        <List
          loading={!users.length}
          itemLayout="horizontal"
          dataSource={users}
          pagination={{
            pageSize: 15,
          }}
          renderItem={user => (
            <Item
              actions={
                [
                  <a key="show-details" onClick={() => showUserDetails(user.login)}>Show Details</a>, 
                  <a key="show-repos" onClick={() => showUserRepos(user.login)}>Show Repos</a>
                ]
              }
            >
              <Meta
                avatar={<Avatar src={user.avatar_url} />}
                title={<Button type="link">ID: {user.id}</Button>}
                description={`User login: ${user.login}`}
              />
            </Item>
          )}
        />
      </div>
    </>
  );
}

export default Dashboard;

