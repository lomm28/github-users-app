
const GitHub = require('github-api');

async function getGitHubData(token) {
  const gh = new GitHub({ token });
  const data = {};
  const me = gh.getUser();
  const repos = await me.listRepos();
  data.repos = repos.data;
  return data;
}

module.exports = getGitHubData;
