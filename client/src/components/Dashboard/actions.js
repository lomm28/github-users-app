import { getAllGithubUsers, getGithubUserRepos, getGithubUserDetails } from '../../services/network';

const loadUsers = async (dispatch, state) => {

  const { hasMoreUsers, nextPage } = state;

  if (hasMoreUsers) {
    try {
      const { data, page } = await getAllGithubUsers(nextPage);
      const repos = await getGithubUserRepos('lomm28');
      const details = await getGithubUserDetails('lomm28');
      console.log(details);
      console.log(repos);
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

export default loadUsers;
