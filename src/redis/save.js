export default async (client, key, value) => {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => {
    client.client.set(
      client.config.prefix + key,
      JSON.stringify(value),
      function(err, data) {
        return resolve(data);
      }
    );
  });
};
