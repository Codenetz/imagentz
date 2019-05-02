import sharp from 'sharp';
import { JPEG, PNG } from '../constants/extensions';

export const Process = (resource, manipulator) => {
  let sharp_resource = sharp(resource);

  /** Saves local file */
  sharp_resource.resize(manipulator.getResize());

  if (manipulator.getFormat() === JPEG) {
    sharp_resource.jpeg(
      Object.assign(
        {
          quality: manipulator.getQuality()
        },
        manipulator.getFormatOptions()
      )
    );
  }

  if (manipulator.getFormat() === PNG) {
    sharp_resource.png(
      Object.assign(
        {
          compressionLevel: manipulator.getQuality()
        },
        manipulator.getFormatOptions()
      )
    );
  }

  return sharp_resource;
};

export const Save = async (sharp_resource, saveConfig) => {
  return new Promise(async resolve => {
    if (saveConfig.isLocalEnabled()) {
      sharp_resource.toFile(saveConfig.getLocal().path, (err, res) => {
        resolve({
          width: res.width,
          height: res.height
        });
      });
    }

    /** TODO Save to S3 */
  });
};
