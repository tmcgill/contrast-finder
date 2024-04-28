function findContrast(rgbInputA, rgbInputB, process = 'single') {
	let contrasts = {
			"ratioA1" : {},
			"ratioA2" : {},
			"ratioB1" : {},
			"ratioB2" : {}
		},
		directions = {
			"none" : "None",
			"out" : "Outward",
			"in" : "Inward (crossover)"
		},
		direction,
		steps = 0,
		inputA = {
			"hex" : rgbToHex(rgbInputA),
			"rgb" : rgbInputA,
			"hsl" : rgbToHsl(rgbInputA),
			"lum" : luminance(rgbInputA),
			"stepsToWhite" : 0,
			"stepsToBlack" : 0
		},
		inputB = {
			"hex" : rgbToHex(rgbInputB),
			"rgb" : rgbInputB,
			"hsl" : rgbToHsl(rgbInputB),
			"lum" : luminance(rgbInputB),
			"stepsToWhite" : 0,
			"stepsToBlack" : 0
		}
	;
	inputA.stepsToWhite = (100 - inputA.hsl.l) * 10;
	inputA.stepsToBlack = inputA.hsl.l * 10;
	inputB.stepsToWhite = (100 - inputB.hsl.l) * 10;
	inputB.stepsToBlack = inputB.hsl.l * 10;
	direction = directions.none;
		
	steps = inputA.stepsToWhite >= inputB.stepsToWhite ? inputA.stepsToWhite : inputB.stepsToWhite;
	for (let i = 0; i <= steps; i++) {
		if (inputB.lum >= inputA.lum) {
			let thisContrast = contrast(inputB.lum, inputA.lum);
			if (thisContrast > 3 && Object.keys(contrasts.ratioB1).length == 0) {
				contrasts.ratioB1 = {
					"ratio" : "3:1",
					"hexA" : inputA.hex,
					"hexB" : inputB.hex,
					"direction" : direction
				};
			}
			if (thisContrast > 4.5 && Object.keys(contrasts.ratioB2).length == 0) {
				contrasts.ratioB2 = {
					"ratio" : "4.5:1",
					"hexA" : inputA.hex,
					"hexB" : inputB.hex,
					"direction" : direction
				};
				break;
			}
		}
		
		if (direction == directions.none) {					
			if (inputB.lum > inputA.lum) {
				direction = directions.out;
			}
			if (inputB.lum < inputA.lum) {
				direction = directions.in;
			}
			// no change if lums are equal
		}
		
		if (process == 'dual') {
			if (inputA.hsl.l >= .1) {
				inputA.hsl.l -= .1;
			}
			inputA.rgb = hslToRgb(inputA.hsl);
			inputA.hex = rgbToHex(inputA.rgb);
			inputA.lum = luminance(inputA.rgb);
		}
		
		if (inputB.hsl.l <= 99.9) {
			inputB.hsl.l += .1;
		}
		inputB.rgb = hslToRgb(inputB.hsl);
		inputB.hex = rgbToHex(inputB.rgb);
		inputB.lum = luminance(inputB.rgb);
	}
	
	// Finished stepping to white. Reset before stepping to black.
	inputA.hex = rgbToHex(rgbInputA);
	inputA.rgb = rgbInputA;
	inputA.hsl = rgbToHsl(rgbInputA);
	inputA.lum = luminance(rgbInputA);
	
	inputB.hex = rgbToHex(rgbInputB);
	inputB.rgb = rgbInputB;
	inputB.hsl = rgbToHsl(rgbInputB);
	inputB.lum = luminance(rgbInputB);
	
	direction = directions.none;
	
	steps = inputA.stepsToBlack >= inputB.stepsToBlack ? inputA.stepsToBlack : inputB.stepsToBlack;
	for (let i = steps; i > 0; i--) {
		if (inputB.lum <= inputA.lum) {
			let thisContrast = contrast(inputB.lum, inputA.lum);
			if (thisContrast > 3 && Object.keys(contrasts.ratioA1).length == 0) {
				contrasts.ratioA1 = {
					"ratio" : "3:1",
					"hexA" : inputA.hex,
					"hexB" : inputB.hex,
					"direction" : direction
				};
			}
			if (thisContrast > 4.5 && Object.keys(contrasts.ratioA2).length == 0) {
				contrasts.ratioA2 = {
					"ratio" : "4.5:1",
					"hexA" : inputA.hex,
					"hexB" : inputB.hex,
					"direction" : direction
				};
				break;
			}
		}
		
		if (direction == directions.none) {					
			if (inputB.lum < inputA.lum) {
				direction = directions.out;
			}
			if (inputB.lum > inputA.lum) {
				direction = directions.in;
			}
			// no change if lums are equal
		}
		
		if (process == 'dual') {
			if (inputA.hsl.l <= 99.9) {
				inputA.hsl.l += .1;
			}
			inputA.rgb = hslToRgb(inputA.hsl);
			inputA.hex = rgbToHex(inputA.rgb);
			inputA.lum = luminance(inputA.rgb);
		}
		
		if (inputB.hsl.l >= .1) {
			inputB.hsl.l -= .1;
		}
		inputB.rgb = hslToRgb(inputB.hsl);
		inputB.hex = rgbToHex(inputB.rgb);
		inputB.lum = luminance(inputB.rgb);
	}
	
	console.log('---done---');
	console.log(contrasts);
	return contrasts;
}
