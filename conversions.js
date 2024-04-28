/***
* Color conversions
* References:
*	https://css-tricks.com/converting-color-spaces-in-javascript/
*	https://www.w3schools.com/lib/w3color.js
***/

function rgbToHex(rgb) {
	let hex = '#';
	
	for (let channel in rgb) {
		channel = rgb[channel].toString(16);
		if (channel.length == 1) {
			channel = '0' + channel;
		}
		hex += channel;
	}
	
	return hex;
}

function hexToRgb(hex) {
	let r = 0,
		g = 0,
		b = 0
	;
	
	if (hex.length == 4) {
		r = '0x' + hex[1] + hex[1];
		g = '0x' + hex[2] + hex[2];
		b = '0x' + hex[3] + hex[3];
	} else if (hex.length == 7) {
		r = '0x' + hex[1] + hex[2];
		g = '0x' + hex[3] + hex[4];
		b = '0x' + hex[5] + hex[6];
	}
	
	return {'r': Number(r), 'g': Number(g), 'b': Number(b)};
}

function rgbToHsl(rgb) {
	let r = Number(rgb.r) / 255,
		g = Number(rgb.g) / 255,
		b = Number(rgb.b) / 255,
		channelMin = Math.min(r, g, b),
		channelMax = Math.max( r, g, b),
		delta = channelMax - channelMin,
		h = 0,
		s = 0,
		l = 0
	;
	
	// hue calculation from w3schools
	if (channelMax == r) {
		h = (g - b) / delta;
	}
	if (channelMax == g) {
		h = (b - r) / delta + 2;
	}
	if (channelMax == b) {
		h = (r - g) / delta + 4;
	}
	if (isNaN(h)) {
		h = 0;
	}
	h = h * 60;
	if (h < 0) {
		h += 360;
	}
	
	l = (channelMax + channelMin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	
	h = h.toFixed(1);
	s = (s * 100).toFixed(1);
	l = (l * 100).toFixed(1);
	
	return {'h': Number(h), 's': Number(s), 'l': Number(l)};
}

function hslToRgb(hsl) {
	let h = Number(hsl.h),
		s = Number(hsl.s) / 100,
		l = Number(hsl.l) / 100
	;
	
	// Chroma is color intensity
	// Only 2 rgb channels are needed to represent a color at its darkest expression
	let primaryChroma = (1 - Math.abs(2 * l - 1)) * s,
		secondaryChroma = primaryChroma * (1 - Math.abs((h / 60) % 2 - 1)),
		r = 0,
		g = 0,
		b = 0
	;
	if (h < 60) {
		r = primaryChroma;
		g = secondaryChroma;
		b = 0;
	} else if (h < 120) {
		r = secondaryChroma;
		g = primaryChroma;
		b = 0;
	} else if (h < 180) {
		r = 0;
		g = primaryChroma;
		b = secondaryChroma;
	} else if (h < 240) {
		r = 0;
		g = secondaryChroma;
		b = primaryChroma;
	} else if (h < 300) {
		r = secondaryChroma;
		g = 0;
		b = primaryChroma;
	} else if (h < 360) {
		r = primaryChroma;
		g = 0;
		b = secondaryChroma;
	}
	
	// Increase each rgb channel to match hsl lightness
	let channelBump = l - primaryChroma / 2;
	r = Math.round((r + channelBump) * 255);
	g = Math.round((g + channelBump) * 255);
	b = Math.round((b + channelBump) * 255);
		
	return {'r': Number(r), 'g': Number(g), 'b': Number(b)};
}

function hslToHex(hsl) {
	let rgb = hslToRgb(hsl);
	return rgbToHex(rgb);
}

function hexToHsl(hex) {
	let rgb = hexToRgb(hex);
	return rgbToHsl(rgb);
}