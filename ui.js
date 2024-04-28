let colorA = {},
	colorB = {},
	controls = [
		'picker',
		'hex',
		'hue',
		'saturation',
		'lightness',
		'slider'
	]
;
	
for (let i = 0; i < 2; i++) {
	let color = colorA;
	if (i > 0) {
		color = colorB;
	}
	
	for (let key in controls) {
		color[controls[key]] = document.getElementById(controls[key] + i);
	}
		
	color.picker.addEventListener('change', function() {
		let hsl = hexToHsl(event.target.value);
		color.hex.value = event.target.value;
		color.hue.value = hsl.h;
		color.saturation.value = hsl.s;
		color.lightness.value = hsl.l;
		color.slider.value = hsl.l;
	});
	
	color.hex.addEventListener('change', function() {
		let hsl = hexToHsl(event.target.value);
		color.picker.value = event.target.value;
		color.hue.value = hsl.h;
		color.saturation.value = hsl.s;
		color.lightness.value = hsl.l;
		color.slider.value = hsl.l;
	});
	
	color.hue.addEventListener('change', function() {
		let hex = hslToHex({
			"h" : event.target.value,
			"s" : color.saturation.value,
			"l" : color.lightness.value
		});
		color.picker.value = hex;
		color.hex.value = hex;
	});
	
	color.saturation.addEventListener('change', function() {
		let hex = hslToHex({
			"h" : color.hue.value,
			"s" : event.target.value,
			"l" : color.lightness.value
		});
		color.picker.value = hex;
		color.hex.value = hex;
	});
	
	color.lightness.addEventListener('change', function() {
		let hex = hslToHex({
			"h" : color.hue.value,
			"s" : color.saturation.value,
			"l" : event.target.value
		});
		color.picker.value = hex;
		color.hex.value = hex;
		color.slider.value = event.target.value;
	});
	
	color.slider.addEventListener('input',function() {
		let hex = hslToHex({
			"h" : color.hue.value,
			"s" : color.saturation.value,
			"l" : event.target.value
		});
		color.picker.value = hex;
		color.hex.value = hex;
		color.lightness.value = event.target.value;
	});
}


document.getElementById('submit').addEventListener('click', function() {
	event.preventDefault();
	let process = document.querySelector('input[name="process"]:checked').value,
		contrastTable = document.getElementById('contrastTable'),
		contrastData = document.getElementById('contrastData'),
		results = findContrast(hexToRgb(colorA.hex.value), hexToRgb(colorB.hex.value), process)
	;
	
	contrastData.innerHTML = '';
	for (let key in results) {
		if (Object.keys(results[key]).length > 0) {
			let row = document.createElement('tr'),
				ratio = document.createElement('td'),
				hexA = document.createElement('td'),
				hexB = document.createElement('td'),
				direction = document.createElement('td'),
				swatchA = document.createElement('span'),
				swatchB = document.createElement('span')
			;
			ratio.innerHTML = results[key].ratio;
			hexA.innerHTML = ' ' + results[key].hexA;
			hexB.innerHTML = ' ' + results[key].hexB;
			direction.innerHTML = results[key].direction;
			
			swatchA.style.backgroundColor = results[key].hexA;
			swatchB.style.backgroundColor = results[key].hexB;
			swatchA.classList.add('swatch');
			swatchB.classList.add('swatch');
			hexA.prepend(swatchA);
			hexB.prepend(swatchB);
			
			row.append(ratio);
			row.append(hexA);
			row.append(hexB);
			row.append(direction);
			
			contrastData.append(row);
			contrastTable.removeAttribute('style');
		}
	}
	
	// 
	// for (key in contrasts) {
	// 	let cell = document.getElementById(key),
	// 		value = cell.getElementsByClassName('value')[0],
	// 		swatch = cell.getElementsByClassName('swatch')[0]
	// 	;
	// 	value.innerHTML = '';
	// 	swatch.removeAttribute('style');
	// 	if (contrasts[key] !== false) {
	// 		value.innerHTML = contrasts[key];
	// 		swatch.style.backgroundColor = contrasts[key];
	// 	} else {
	// 		value.innerHTML = 'n/a';
	// 	}
	// }
});
