const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  request.get('https://github.com/' + repoOwner + "/" + repoName);
}

getRepoContributors('nodejs', 'node', function(err, result) {
  console.log("Errors:", err);
  console.log("Results:", results);
});
