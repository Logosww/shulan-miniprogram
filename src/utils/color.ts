import quantize from '@lokesh.dhakar/quantize';
import chroma from 'chroma-js';

type Options = {
  imageData: Taro.ImageData;
  colorCount?: number;
  quality?: number;
};

const createPixelArray = (pixels: Uint8ClampedArray, pixelCount: number, quality: number) => {
  const pixelArray: Array<[number, number, number]> = [];

  let offset: number, r: number, g: number, b: number, a: number;
  for (let i = 0; i < pixelCount; i = i + quality) {
    offset = i * 4;
    r = pixels[offset + 0];
    g = pixels[offset + 1];
    b = pixels[offset + 2];
    a = pixels[offset + 3];

    // If pixel is mostly opaque and not white
    if (typeof a === 'undefined' || a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        pixelArray.push([r, g, b]);
      }
    }
  }
  return pixelArray;
};

const validateOptions = (options: Options) => {
  const { imageData } = options;
  let { colorCount, quality } = options;

  if (typeof colorCount === 'undefined' || !Number.isInteger(colorCount)) {
    colorCount = 10;
  } else if (colorCount === 1 ) {
    throw new Error('colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()');
  } else {
    colorCount = Math.max(colorCount, 2);
    colorCount = Math.min(colorCount, 20);
  }

  if (typeof quality === 'undefined' || !Number.isInteger(quality) || quality < 1) {
    quality = 30;
  }

  return {
    imageData,
    colorCount,
    quality,
  };
};

export const getPalette = (options: Options) => {
  const _options = validateOptions(options);
  const { imageData: { data, width, height }, quality, colorCount } = _options;
  const pixelCount = width * height;

  const pixelArray = createPixelArray(data, pixelCount, quality);
  const cmap = quantize(pixelArray, colorCount);
  const palette = cmap ? cmap.palette() as  Array<[number, number, number]>: void 0;

  return palette && palette.map(rgb => chroma(rgb).hex('rgb'));
};

export const getDominantColor = (options: Options) => {
  const palatte = getPalette(options);

  return palatte && palatte[0];
};
