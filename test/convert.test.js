const {convert} = require('../index');

// Test suite
describe('convert', () => {
    // Regression test case
    it('should convert a PNG image to RGB565', async () => {
        // Input PNG image
        const inputPath = './test/js.png';
        
        // Expected output
        const expected = require('./js.json');
        
        // Call the function
        const result = await convert(inputPath);
        
        // Compare the result with the expected output
        expect(result).toHaveProperty('width');
        expect(result).toHaveProperty('height');
        expect(result).toHaveProperty('bpp');
        expect(result).toHaveProperty('data');
        expect(result).toEqual(expected);
    });

    it('should error out if the input file is not a PNG', async () => {
        // mock console.error
        console.error = jest.fn();
            
        // Input file that does not exist
        const inputPath = './test/missingfile.png';

        // Call the function
        try {
            
            await convert(inputPath);
        }
        catch (error) {
            expect(error.message).toBe("Input file is missing: ./test/missingfile.png");
            expect(console.error).toHaveBeenCalledWith('Error converting PNG to RGB565:', error);
        }

    });
});