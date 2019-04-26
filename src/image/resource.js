import isRemote from 'is-remote';
import getBufferRemote from './getBufferRemote';
import getBufferLocal from './getBufferLocal';

export default async path => {
  if (await isRemote(path)) {
    return await getBufferRemote(path);
  }

  return getBufferLocal(path);
};
