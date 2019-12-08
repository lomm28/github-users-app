import React, { useEffect } from 'react';
import { List, Avatar, Button } from 'antd';

import useLoaderHook from './reducer';
import loadUsers from './actions';

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
  const { users, hasMoreUsers } = state;

  useEffect(() => {
    loadUsers(dispatch, state);
  }, []);

  return (
    <>
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
            <Item>
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

