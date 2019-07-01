'use strict';
const express = require('express');
const app = express();
const url = require('url');
const queryString = require('querystring');
var circularJSON = require('circular-json');

var superb = require('superb');

app.get('/redirect',  (request, response) => {
    console.log('printing request' + circularJSON.stringify(request));
    console.log('printing request' + circularJSON.stringify(request.query));

    const queryParams =  request.query;
    console.log('pringint  qP  -->' + queryParams);

    /*let keys = Object.keys(queryParams);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = queryParams[key];
        console.log(key + '  '+ value);
        response.append('Set-Cookie', key + '  '+ value);
    }*/

    let paramArray = new Array();
    let keys = Object.keys(queryParams);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        paramArray.push(key + '=' + queryParams[key]);
    }
    //response.set('Set-Cookie','tessdfa=dsfasf; domain=localhost');
    //response.cookie('shinuName', 'shinuValue', { expires: new Date(Date.now() + 900000), httpOnly: true });

    response.redirect(301,'http://localhost:3002/');
});

module.exports = app;

