# png2embeddedjson

Convert PNG images to embedded JSON with Base64-encoded RGB565 data.

## Description

`png2embeddedjson` is a command-line tool and a Node.js module that converts PNG images into a JSON format containing Base64-encoded RGB565 data. This is useful for embedding images directly into applications or systems that utilize JSON for configuration or data representation, such as embedded systems or microcontrollers. For example, it can be used for displaying images on a GC9A01 display on an RP2040 microcontroller powered by the [Kaluma](https://kalumajs.org/) runtime.

The output JSON contains:

- `width`: The width of the image in pixels.
- `height`: The height of the image in pixels.
- `bpp`: Bits per pixel used (default is 16).
- `data`: Base64-encoded string of the RGB565 image data.

## Installation

Install the package globally using npm:

```bash
npm install -g png2embeddedjson
```

## Usage

### CLI

```bash
png2embeddedjson <input.png> [output.json]
```

- `<input.png>`: Path to the input PNG image.
- `[output.json]`: (Optional) Path to save the output JSON file. If not provided, the JSON will be printed to the console.

**Examples:**

Convert an image and save the output to a file:

```bash
png2embeddedjson example.png output.json
```

Convert an image and display the JSON in the console:

```bash
png2embeddedjson example.png

# Output
# {
#   "width": 100,
#   "height": 100,
#   "bpp": 16,
#   "data": "...AAECAwQFBgcICQoLDA0ODw=="
# }
```

### API

Use the package programmatically in Node.js applications:

```javascript
const { convert } = require('png2embeddedjson');

convert('pathToInput.png').then((json) => {
    console.log(json);
    // { width: 100, height: 100, bpp: 16, data: '...AAECAwQFBgcICQoLDA0ODw==' }
});
```

## Dependencies

- [sharp](https://www.npmjs.com/package/sharp): High-performance Node.js image processing library.

## License

MIT © 2024 Andrew Chalkley