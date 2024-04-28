// from https://www.w3.org/TR/WCAG22/#dfn-relative-luminance

function luminance(rgb) {
    let RsRGB = rgb.r / 255,
        GsRGB = rgb.g / 255,
        BsRGB = rgb.b / 255,
        
        R = (RsRGB <= 0.04045) ? RsRGB/12.92 : Math.pow((RsRGB+0.055)/1.055, 2.4),
        G = (GsRGB <= 0.04045) ? GsRGB/12.92 : Math.pow((GsRGB+0.055)/1.055, 2.4),
        B = (BsRGB <= 0.04045) ? BsRGB/12.92 : Math.pow((BsRGB+0.055)/1.055, 2.4),
        
        L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    ;
    
    return L;
}