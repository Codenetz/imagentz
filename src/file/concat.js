export default (names = []) => {
  return names.join('/').replace(/\/\//g, '/').replace(/\/\//g, '/');
};
