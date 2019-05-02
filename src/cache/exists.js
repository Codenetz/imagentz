import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

export default pathname => {
  /** Creates cache folders */
  mkdirp.sync(path.dirname(pathname));

  return fs.existsSync(pathname);
};
