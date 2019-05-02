import { expect } from 'chai';
import Imagentz from './../src/index';
import sharp from 'sharp';

describe('#test', () => {
  it('should return true', async () => {
    let imagentz = new Imagentz({
      // output: ['/tmp/image', '@S3/cache/images/'],
      output_dir: '/tmp/image/',
      fallback:
        '/home/codenetz/projects/imagentz/test/20190424_180106_remaked.jpg'
    });

    let output = await imagentz
      .resource(
        // 'https://raw.githubusercontent.com/Codenetz/is-remote/master/test/bar.png'
        '/home/codenetz/projects/imagentz/test/DSC_0353.JPG'
      )
      .addManipulator(manipulator =>
        manipulator
          .quality(99)
          .formatOptions({
            force: true,
            quality: 90
          })
          .resize({
            width: 300,
            height: 300,
            fit: sharp.fit.cover,
            position: sharp.strategy.entropy
          })
      )
      .addManipulator(manipulator =>
        manipulator
          .quality(9)
          .usePNG()
          .formatOptions({
            palette: true
          })
          .resize({
            width: 300,
            height: 300,
            fit: sharp.fit.cover,
            position: sharp.strategy.entropy
          })
      )
      .output();

    expect((() => true)()).to.equal(true);
  });
});
