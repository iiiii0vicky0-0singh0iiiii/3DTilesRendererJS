import { decodeOctNormal } from '../src/utilities/decodeOctNormal';

const PRECISION = 0.005;

describe( 'decodeOctNormal', () => {

	it.each( [
		// 4 corners of the projected octahedron
		[ 0, 0, 0, 0, - 1 ],
		[ 255, 255, 0, 0, - 1 ],
		[ 0, 255, 0, 0, - 1 ],
		[ 255, 0, 0, 0, - 1 ],

		// Center of the projected octahedron
		[ 127, 127, 0, 0, 1 ],

		// Midpoint of left edge of the projected octahedron
		[ 0, 127, - 1, 0, 0 ],

		// Midpoint of right edge of the projected octahedron
		[ 255, 127, 1, 0, 0 ],

		// Midpoint of top edge of the projected octahedron
		[ 127, 255, 0, 1, 0 ],

		// Midpoint of bottom edge of the projected octahedron
		[ 127, 0, 0, - 1, 0 ],
	] )( 'should decode (%s, %s) into [%s, %s, %s]', ( encX, encY, x, y, z ) => {

		const result = decodeOctNormal( encX, encY );

		expect( result.length() ).toBeCloseTo( 1, PRECISION );
		expect( result.x ).toBeCloseTo( x, PRECISION );
		expect( result.y ).toBeCloseTo( y, PRECISION );
		expect( result.z ).toBeCloseTo( z, PRECISION );

	} );
	it('should throw an error for invalid inputs', () => {
    const invalidInputs = [
      [-1, 0],   // X out of range
      [0, -1],   
      [256, 0],  // X exceeds range
      [0, 256],  
      ['a', 0],  
      [0, 'b'],  // Y is not a number
    ];

    invalidInputs.forEach(([encX, encY]) => {
      expect(() => decodeOctNormal(encX, encY)).toThrow(
        `Invalid input: (${encX}, ${encY})`
      );
    });
  });

  it('should have minimal performance overhead', () => {
    const startTime = performance.now();
    for (let i = 0; i <= 255; i++) {
      for (let j = 0; j <= 255; j++) {
        decodeOctNormal(i, j);
      }
    }
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(1000); // Performance threshold
  });

});
