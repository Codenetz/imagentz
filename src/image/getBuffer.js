import request from 'request';

export default path => {
  return new Promise(resolve => {
    try {
      request.defaults({ encoding: null });
      request.get(path, (error, response, body) => {
        if (error) {
          throw new Error(error);
        }

        if (!error && response.statusCode == 200) {
          return resolve(new Buffer(body));
        }

        return null;
      });
    } catch (e) {
      console.error(e);
      return resolve(null);
    }
  });
};
