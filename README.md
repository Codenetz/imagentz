# Imagentz [![Build Status](https://travis-ci.org/Codenetz/imagentz.svg?branch=master)](https://travis-ci.org/Codenetz/imagentz)

Image manipulation using [sharp](https://www.npmjs.com/package/sharp)

#### Features:

- image dynamic caching
- image manipulation using sharp
- promisified methods
- S3 support
- Redis support

#### Getting started

...

#### Usage

```javascript
const NOTFOUND_DEFAULT_IMAGE = "notfound.jpg";
const TEST_IMAGE = "test.jpg";
const OUTPUT_DIR = "cache";

const types = new Imagentz({
  output_dir: OUTPUT_DIR,
  fallback: NOTFOUND_DEFAULT_IMAGE
})
  .resource(TEST_IMAGE)

  .useRedis("my-prefix", {
    host: "127.0.0.1",
    port: "6379"
  })

  .useS3({
    accessKeyId: "xxxx",
    secretAccessKey: "xxxx",
    region: "xxxx",
    bucket: "xxxx",
    cdn: "http...."
  })

  .addManipulator(manipulator =>
    manipulator
      .key("thumb")
      .quality(90)
      .useWEBP()
      .formatOptions({
        force: true
      })
      .resize({
        width: 100,
        height: 100,
        fit: "cover", //sharp.fit.cover
        position: 16 //sharp.strategy.entropy
      })
  )
  .addManipulator(manipulator =>
    manipulator
      .key("scale")
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
      .key("poster")
      .quality(90)
      .useWEBP()
      .resize({
        width: 1920
      })
  )
  .output();
```

#### Methods

...

#### Express middlewares

...

#### License

...
