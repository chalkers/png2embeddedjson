
const sharp = require('sharp');

/**
 * Converts a PNG image to a JSON object containing Base64-encoded RGB565 data.
 * @param {string} inputPath - The path to the input PNG image.
 * @returns {Promise<Object>} - A promise that resolves to the JSON representation of the image.
 */
async function convert(inputPath) {
  try {
    // Load the image, remove alpha channel, and convert to sRGB
    const { data, info } = await sharp(inputPath)
      .removeAlpha() // Remove alpha channel if present
      .toColourspace('srgb') // Ensure sRGB color space
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = info.channels;

    // Prepare a buffer for the RGB565 data
    const rgb565Buffer = Buffer.alloc(width * height * 2); // 2 bytes per pixel

    let offset = 0;
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Convert to RGB565
      const r5 = r >> 3;
      const g6 = g >> 2;
      const b5 = b >> 3;
      const rgb565 = (r5 << 11) | (g6 << 5) | b5;

      // Write to buffer in big-endian format
      rgb565Buffer.writeUInt16BE(rgb565, offset);
      offset += 2;
    }

    // Convert the buffer to a Base64 string
    const base64Output = rgb565Buffer.toString('base64');

    // Create the JSON object
    const result = {
      width,
      height,
      bpp: 16, // bits per pixel
      data: base64Output,
    };

    return result;
  } catch (error) {
    console.error('Error converting PNG to RGB565:', error);
    throw error;
  }
}

// Export the function for use as a module
module.exports = {
  convert
};
