import { expect } from 'chai';
import cachePath from '../src/cache/path';
import { JPEG } from '../src/constants/extensions';

describe('#generate cache path', () => {
  it('should throw TypeError', () => {
    expect(() => cachePath()).to.throw(TypeError);
  });

  context('without options', () => {
    const no_option_path = cachePath('/path/to/image.jpeg');

    it('should return same path if called twice', () => {
      expect(cachePath('/path/to/image.jpeg')).to.equal(no_option_path);
    });

    context('without extension', () => {
      it('should return default extension', () => {
        const extension = cachePath('/path/to/image')
          .split('.')
          .pop();
        expect(extension).to.equal(JPEG);
      });
    });
  });

  context('with options', () => {
    const path_with_options = cachePath('/path/to/image.jpeg', ['thumb', 150]);

    it('should return same path if called twice', () => {
      expect(cachePath('/path/to/image.jpeg', ['thumb', 150])).to.equal(
        path_with_options
      );
    });
  });
});
