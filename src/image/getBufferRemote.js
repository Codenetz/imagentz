import request from 'request';

export default path => {
  return new Promise(resolve => {
    request.get({ uri: path, encoding: null }, (error, response, body) => {
      if (error) {
        throw new Error(error);
      }

      if (response.statusCode === 200) {
        return resolve(new Buffer.from(body));
      }

      return null;
    });
  });
};
