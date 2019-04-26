import fs from 'fs';

export default path => {
  return fs.existsSync(path);
};
