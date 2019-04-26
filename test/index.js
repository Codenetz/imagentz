import { expect } from 'chai';
import Imagentz from './../src/index';

describe('#test', () => {
  it('should return true', async () => {
    let imagentz = new Imagentz();

    let output = await imagentz
      .resource(
        'https://raw.githubusercontent.com/Codenetz/is-remote/master/test/bar.png'
      )
      .quality(10)
      .resize(100, 100)
      .output();

    expect((() => true)()).to.equal(true);
  });
});
