'use strict';
const Imagentz = require('../build/index').default;

const NOTFOUND_DEFAULT_IMAGE = 'notfound.jpg';
const TEST_IMAGE = 'test1.jpg';
const OUTPUT_DIR = 'cache';

const types = new Imagentz({
  output_dir: OUTPUT_DIR,
  fallback:  NOTFOUND_DEFAULT_IMAGE
})
  .resource(TEST_IMAGE)

  .useCache({})
  .useS3({
    bucket: 'test'
  })

  .addManipulator(manipulator =>
    manipulator
      .key('thumb')
      .quality(90)
      .formatOptions({
        force: true,
        quality: 90
      })
      .resize({
        width: 100,
        height: 100,
        // fit: sharp.fit.cover,
        fit: 'cover',
        position: 16
        // position: sharp.strategy.entropy
      })
  )
  .addManipulator(manipulator =>
    manipulator
      .key('scale')
      .quality(90)
      .formatOptions({
        force: true,
        quality: 90
      })
      .resize({
        width: 500
      })
  )
  .addManipulator(manipulator =>
    manipulator
      .key('poster')
      .quality(9)
      .usePNG()
      .formatOptions({
        palette: true
      })
      .resize({
        width: 1920
      })
  )
  .output();


types.then(i => {
  console.log(i);
});