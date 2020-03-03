import fs from 'fs';

export default path => {
  if (!fs.existsSync(path)) {
    return null;
  }

  return fs.readFileSync(path);
};
