import api from './api';

const getAllGithubUsers = page => {
  return api.get(`/api/users/${page}`);
};

const getGithubUserDetails = username => {
  return api.get(`/api/users/${username}/details`);
};

const getGithubUserRepos = username => {
  return api.get(`/api/users/${username}/repos`);
};

export { getAllGithubUsers, getGithubUserDetails, getGithubUserRepos };
