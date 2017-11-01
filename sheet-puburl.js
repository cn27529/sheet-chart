var url_html = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTu1l2t6AOj8rFzwJ1WHxUYT34YmMuYvKeGmf3IjfuTGRGpuJqV0O-m69ckg5XGvZA9rOSwejOnYER4/pubhtml';
//console.log(url_html)

var url_csv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTu1l2t6AOj8rFzwJ1WHxUYT34YmMuYvKeGmf3IjfuTGRGpuJqV0O-m69ckg5XGvZA9rOSwejOnYER4/pub?output=csv';

var url_split = url_csv.split('/')
    //console.log(url_split)

var request = require('request')

function res_sheet_url(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
}

request(url_csv, res_sheet_url)
