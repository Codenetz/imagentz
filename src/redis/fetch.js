export default async (client, key) => {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => {
    client.client.get(client.config.prefix + key, function(err, data) {
      return resolve(JSON.parse(data));
    });
  });
};
