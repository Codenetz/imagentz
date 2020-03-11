import exists from '../cache/exists';

export default async (sharp_resource, path) => {
  exists(path);
  const data = await sharp_resource.toFile(path);
  return {
    width: data.width,
    height: data.height
  };
};
