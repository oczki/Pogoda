function getTemperatureGradient() {
    let gradient = [];
    gradient["-30"] = "#1C0A8A";
    gradient["-20"] = "#2F2BBD";
    gradient["-10"] = "#0684BE";
    gradient["0"]   = "#14B39D";
    gradient["10"]  = "#75B340";
    gradient["20"]  = "#B9A700";
    gradient["30"]  = "#BB4400";
    gradient["40"]  = "#C30015";
    gradient["50"]  = "#9E0061";
    return gradient;
}

function hexColorToRgbArray(hex) {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [ parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16) ];
};

function rgbArrayToHexColor(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
};

function mixRgbColors(color1, color2, factor=0.5) {
    let res = color1.slice();
    for (let i = 0; i < 3; i++)
        res[i] = Math.round(res[i] + factor * (color2[i] - color1[i]));
    return res;
};

function mixHexColors(color1, color2, factor=0.5) {
    const color1Rgb = hexColorToRgbArray(color1);
    const color2Rgb = hexColorToRgbArray(color2);
    const res = mixRgbColors(color1Rgb, color2Rgb, factor);
    return rgbArrayToHexColor(res).toUpperCase();
}

function getTensBetween(min, max) {
    let res = [];
    if (max - min <= 1)
        return res;
    for (let value = min + 1; value < max; value++)
        if (value % 10 === 0) {
            const percent = 100 * (value - min) / (max - min);
            res.push({ value, percent });
        }
    return res;
}

function getBoundingTensAndFactor(value) {
    const decimal = value / 10;
    const floor10 = Math.floor(decimal) * 10;
    const ceil10 = Math.ceil(decimal) * 10;
    const factor = (value - floor10) / 10;
    return [ floor10, ceil10, factor ];
}

function temperatureToColor(temperature) {
    const gradient = getTemperatureGradient();

    if (temperature <= -30)
        return gradient["-30"];
    if (temperature >= 50)
        return gradient["50"];

    const [ lowerTen, upperTen, factor ] = getBoundingTensAndFactor(temperature);
    return mixHexColors(gradient[lowerTen.toString()], gradient[upperTen.toString()], factor);
}

function generateGradient(lowTemp, highTemp) {
    let res = `linear-gradient(to right, ${temperatureToColor(lowTemp)} 0, `;
    for (let tenStop of getTensBetween(lowTemp, highTemp))
        res += `${temperatureToColor(tenStop.value)} ${tenStop.percent}%, `;
    res += `${temperatureToColor(highTemp)} 100%)`;
    return res;
}