import sizeOf from 'image-size';
export default data => {
  const { width, height } = sizeOf(data);
  return { width, height };
};
