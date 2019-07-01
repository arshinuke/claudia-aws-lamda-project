# claudiaAwsLambdaProject


Simple claudia aws project



Add web module and below code to configure  api config -----


/*global require, module*/

//const url = require('url');
//const queryString = require('querystring');
var ApiBuilder = require('claudia-api-builder'),
    api = module.exports = new ApiBuilder(),
    url = require('url'),
    queryString = require('querystring'),
    superb = require('superb'),
    renderPage = function (body) {
        'use strict';
        return '<html> ' +
            '<body>' +
            '<h1>Hello from Claudia.js</h1>' +
            body +
            '</body>' +
            '</html>';
    };

// this should show up as a normal web page in the browser, the response type is text/html
api.get('/start.html', function () {
    'use strict';
    return renderPage(
        '<ul>' +
        '<li><a href="search?name=shinu">Valid search</a></li>' +
        '<li><a href="search">Invalid search (will return 403)</a></li>' +
        '<li><a href="redirect">Redirect to GitHub</a></li>' +
        '</ul>'
    );
}, {success: {contentType: 'text/html'}});

// because the success code is 3xx, the content will be used as the redirect location
api.get('/redirect', function (req, response) {
    'use strict';
    // var queryString = require('querystring');
    console.log('request' + req.proxyRequest.queryStringParameters);

    let paramObject = req.proxyRequest.queryStringParameters;
    let keys = Object.keys(paramObject);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = paramObject[key];
        console.log(key, paramObject[key]);
        response.headers = {'Set-Cookie': key + '=' + value};
    }

    const parsedUrl = JSON.stringify(req.proxyRequest.queryStringParameters);

    console.log('request' + parsedUrl);
    return 'https://www.google.com';
}, {success: 302});

// both the success and the error show as web pages, but the error is 403, not the default 500
api.get('/search', function (request) {
    'use strict';
    if (request.queryString.name) {
        return renderPage('<h2>' + request.queryString.name + ' is ' + superb() + '</h2>');
    } else {
        throw renderPage('<div style="color: red">Please provide a name</a>');
    }
}, {error: {code: 403, contentType: 'text/html'}, success: {contentType: 'text/html'}});

