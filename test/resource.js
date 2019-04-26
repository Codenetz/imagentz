import { expect } from 'chai';
import resource from '../src/image/resource';

describe('#resource', () => {
  context('context ...', () => {
    resource(
      'https://raw.githubusercontent.com/Codenetz/is-remote/master/test/bar.png'
    );
  });
});
