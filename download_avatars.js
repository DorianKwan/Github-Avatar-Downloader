const request = require('request');
const fs = require('fs');
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
      console.log(err)
    }
  });
}
// Callback function to download images to disk
function downloadImageByURL(url, filePath) {
  if (!(fs.existsSync('./avatars'))) {
    fs.mkdir('./avatars')
  }
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Response Status Code:', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
}
// Invoke the function with arguments
getRepoContributors(process.argv[2], process.argv[3], (data) => {
  data.forEach((contributor) => {
    downloadImageByURL(contributor.avatar_url, ('./avatars/' + contributor.login
     +  '.jpeg'));
  })
});
