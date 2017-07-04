const request = require('request');
// Log a welcome message to the user
console.log('Welcome to the GitHub Avatar Downloader!');
// Function to create request options
function getRequestOptions(path) {
  return {
    url: 'https://api.github.com/repos/' + path + '/contributors',
    headers: {
      'User-Agent': 'wizard'
    },
    qs: {
      access_token: process.env.GITHUB_ACCESS_TOKEN
    }
  };
}
// Function to get the contributors from a given repo
function getRepoContributors(repoOwner, repoName, cb) {
  const path = repoOwner + '/' + repoName;
  request(getRequestOptions(path), function (error, response, body) {
    try {
      const data = JSON.parse(body);
      cb(data);
    } catch (err) {
      console.log('Failed to parse content body')
    }
  });
}
// Invoke the function with arguments
getRepoContributors('nodejs', 'node', (data) => {
  data.forEach((contributor) => {
    console.log(contributor.avatar_url);
  })
});
