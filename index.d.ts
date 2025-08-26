/**
 * Converts a PNG image to an object containing Base64-encoded RGB565 data.
 *
 * @param {string} inputPath - The path to the input PNG image.
 * @returns {Promise<EmbeddedRepresentation>} - A promise that resolves to the embedded representation of the image.
 */
export function convert(inputPath: string): Promise<EmbeddedRepresentation>;

/**
 * The embedded representation of an image.
 */
export interface EmbeddedRepresentation {
  /**
   * The width of the image in pixels.
   */
  width: number;

  /**
   * The height of the image in pixels.
   */
  height: number;

  /***
   * Bits per pixel used (default is 16).
   */
  bpp: number;

  /**
   * Base64-encoded string of the RGB565 image data.
   */
  data: string;
}
