import { expect } from 'chai';
import Imagentz from './../src/index';

describe('#test', () => {
  it('should return true', async () => {

    let imagentz = new Imagentz({
      // output: ['/tmp/image', '@S3/cache/images/'],
      output_dir: '/tmp/image/',
      fallback: '/img.jpeg'
    });

    let output = await imagentz
      .resource(
        // 'https://raw.githubusercontent.com/Codenetz/is-remote/master/test/bar.png'
        '/home/codenetz/projects/imagentz/test/bar.png'
      )
      .addManipulator(manipulator =>
        manipulator
          .quality(10)
          .transparent(0)
          .resize(100, 100)
      )
      .addManipulator(manipulator =>
        manipulator
          .quality(10)
          .transparent(0)
          .resize(300, 300)
      )
      .output();

    expect((() => true)()).to.equal(true);
  });
});
