import fs from 'fs';

export default path => {
  if (!fs.existsSync(path)) {
    throw new Error('File is not found');
  }

  return fs.readFileSync(path);
};
