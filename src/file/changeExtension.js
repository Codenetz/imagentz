export default (filename, ext) => {
  const position = filename.lastIndexOf('.');
  return (
    filename.substr(0, position < 0 ? filename.length : position) + '.' + ext
  );
};
