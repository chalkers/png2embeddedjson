#!/usr/bin/env node
const fs = require('fs');
const { convert } = require('./index');

// If the script is run directly, execute the CLI functionality
if (require.main === module) {
    (async () => {
      const inputImagePath = process.argv[2];
      const outputPath = process.argv[3]; // Optional output path
  
      if (!inputImagePath) {
        console.error('Usage: png2embeddedjson <input.png> [output.json]');
        process.exit(1);
      }
  
      try {
        const result = await convert(inputImagePath);
        const jsonString = JSON.stringify(result, null, 4);
  
        if (outputPath) {
          fs.writeFileSync(outputPath, jsonString, 'utf8');
          console.log(`JSON output saved to ${outputPath}`);
        } else {
          console.log(jsonString);
        }
        process.exit(0);
      } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
      }
    })();
  } else {
    console.error('This script should not be imported as a module.');
    process.exit(1);
  }