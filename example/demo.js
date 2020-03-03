'use strict';
const Imagentz = require('../build/index').default;

const now = Math.floor(Date.now());

const NOTFOUND_DEFAULT_IMAGE = 'notfound.jpg';
const TEST_IMAGE = 'test.jpg';
const OUTPUT_DIR = 'cache';

const types = new Imagentz({
  output_dir: OUTPUT_DIR,
  fallback: NOTFOUND_DEFAULT_IMAGE
})
  .resource(TEST_IMAGE)

  .useRedis('my-prefix', {
    host: '127.0.0.1',
    port: '6379'
  })

  .useS3({
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    region: 'xxxx',
    bucket: 'xxxx',
    cdn: 'http....'
  })

  .addManipulator(manipulator =>
    manipulator
      .key('thumb')
      .quality(90)
      .useWEBP()
      .formatOptions({
        force: true
      })
      .resize({
        width: 100,
        height: 100,
        fit: 'cover', //sharp.fit.cover
        position: 16 //sharp.strategy.entropy
      })
  )
  .addManipulator(manipulator =>
    manipulator
      .key('scale')
      .quality(90)
      .useWEBP()
      .formatOptions({
        force: true
      })
      .resize({
        width: 500
      })
  )
  .addManipulator(manipulator =>
    manipulator
      .key('poster')
      .quality(90)
      .useWEBP()
      .resize({
        width: 1920
      })
  )
  .output();

types.then(i => {
  console.log(i);
  console.log((Math.floor(Date.now()) - now) / 1000);
});
