import React from 'react';
import { Table } from 'antd';
import { shape, oneOfType, arrayOf } from 'prop-types';

const columns = [
  {
    title: 'Repo Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Repo Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Repo Url',
    dataIndex: 'html_url',
    key: 'html_url',
  },
];

const AntTable = ({ repos }) => {
  const userRepos = Array.isArray(repos) ? repos : repos.data;
  const data = userRepos.map(repo => ({ ...repo, key: repo.id }));

  return <Table dataSource={data} columns={columns} />;
};

AntTable.propTypes = {
  repos: oneOfType([shape({}), arrayOf(shape({}))]).isRequired,
};

export default AntTable;
