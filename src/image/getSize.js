import sizeOf from 'image-size';
export default path => {
  const { width, height } = sizeOf(path);
  return { width, height };
};
