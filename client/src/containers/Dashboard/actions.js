/* eslint-disable consistent-return */

import {
  getAllGithubUsers,
  getGithubUserRepos,
  getGithubUserDetails,
} from '../../services/network';

const loadUsers = async (dispatch, state) => {
  const { hasMoreUsers, nextPage } = state;
  if (hasMoreUsers) {
    try {
      const { data, page } = await getAllGithubUsers(nextPage);
      if (data.length) {
        return dispatch({ type: 'ADD_USERS', users: data, page });
      }
      return dispatch({ type: 'FINISH_LOAD' });
    } catch (err) {
      const message = (err && err.message) || 'Unexpected Error';
      dispatch({ type: 'ERROR', message });
    }
  }
};

const loadUserDetails = async (dispatch, username) => {
  try {
    const currentUser = await getGithubUserDetails(username);
    return dispatch({ type: 'SET_CURRENT_USER', currentUser });
  } catch (err) {
    const message = (err && err.message) || 'Unexpected Error';
    dispatch({ type: 'ERROR', message });
  }
};

const loadUserRepos = async (dispatch, username) => {
  try {
    const repos = await getGithubUserRepos(username);
    return dispatch({ type: 'SET_SELECTED_REPOS', repos });
  } catch (err) {
    const message = (err && err.message) || 'Unexpected Error';
    dispatch({ type: 'ERROR', message });
  }
};

export { loadUsers, loadUserDetails, loadUserRepos };
