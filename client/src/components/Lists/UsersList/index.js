import React from 'react';
import { List, Avatar, Button } from 'antd';
import { shape, arrayOf, func } from 'prop-types';
import {
  loadUserDetails,
  loadUserRepos,
} from '../../../containers/Dashboard/actions';

const { Item } = List;
const { Meta } = Item;

const UsersList = ({ users, fetchAndShowData }) => {
  const renderListItem = user => (
    <Item
      actions={[
        <Button
          type="primary"
          size="small"
          onClick={() => fetchAndShowData(user.login, loadUserDetails)}
        >
          Show Details
        </Button>,
        <Button
          size="small"
          onClick={() => fetchAndShowData(user.login, loadUserRepos)}
        >
          Show Repos
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={user.avatar_url} />}
        title={<Button type="link">ID: {user.id}</Button>}
        description={`User login: ${user.login}`}
      />
    </Item>
  );

  return (
    <List
      loading={!users.length}
      itemLayout="horizontal"
      dataSource={users}
      pagination={{
        pageSize: 15,
      }}
      renderItem={renderListItem}
    />
  );
};

UsersList.propTypes = {
  users: arrayOf(shape({})).isRequired,
  fetchAndShowData: func.isRequired,
};

export default UsersList;
