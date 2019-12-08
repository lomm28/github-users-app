module.exports = (response, clientRes) => {
  const { statusCode } = response;
  const contentType = response.headers['content-type'];

  const { link = '' } = response.headers;

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
  }

  if (error) {
    console.error(error.message);
    response.resume();
    return;
  }

  response.setEncoding('utf8');

  let rawData = '';

  response.on('data', chunk => {
    rawData += chunk;
  });

  response.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);

      if (link && link.includes('rel="next"')) {
        const [nextPageNum] = link.match(/\d+/);
        return clientRes.send({ data: parsedData, page: nextPageNum });
      }

      if (link && !(link.includes('rel="next"'))) {
        return clientRes.send({ data: [] });
      }

      clientRes.send(parsedData);
      clientRes.end();
    } catch (e) {
      console.error(e.message);
    }
  });
};
