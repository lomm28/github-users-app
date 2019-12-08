import React from 'react';
import { List, Typography } from 'antd';
import { shape } from 'prop-types';

const { Item } = List;
const { Text } = Typography;

const convertUserToDataSource = user => {
  const userDetailsArr = [];
  // eslint-disable-next-line
  const { id, login, html_url, created_at } = user;
  userDetailsArr.push(
    { name: 'id', value: id },
    { name: 'login', value: login },
    { name: 'url', value: html_url },
    { name: 'Profile created on', value: created_at },
  );
  return userDetailsArr;
};

const DetailsList = ({ user }) => {
  const convertedData = convertUserToDataSource(user);

  return (
    <List
      header={<div>User Details</div>}
      bordered
      dataSource={convertedData}
      renderItem={({ name, value }) => (
        <Item>
          <Text mark>{`[${name}]`}</Text>
          {value}
        </Item>
      )}
    />
  );
};

DetailsList.propTypes = {
  user: shape({}).isRequired,
};

export default DetailsList;
