const https = require('https');

const requestPromise = (options,body) => {
    return new Promise((resolve, reject) => {
        https.request(options, (res) => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => (rawData += chunk.toString()));
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode <= 299) {
                    resolve({ statusCode: res.statusCode, headers: res.headers, body: rawData });
                } else {
                    reject('Request failed. status: ' + res.statusCode + ', body: ' + rawData);
                }
            });
        }).on('error', (e) => {
            reject(`Got error: ${e.message}`);
        }).on('timeout', () => {
            reject(`Request Timeout:`);
        }).end();
    });
}

module.exports = async function asyncRequest(hostname, path, port, method, timeout,body) {
    return await requestPromise({ hostname, path, port, method, timeout}, body)
        .catch(error => {
            console.log(`Async request failed: ${error}`);
        });
}