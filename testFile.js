const request = require('request');
const fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Response Status Code:', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL('https://www.w3schools.com/css/img_fjords.jpg', './img.jpeg')
