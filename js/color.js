class Color {
    constructor(hex = "#000000") {
        const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        this.r = parseInt(rgb[1], 16);
        this.g = parseInt(rgb[2], 16);
        this.b = parseInt(rgb[3], 16);
    }

    get rgb() {
        return [this.r, this.g, this.b];
    }

    get hex() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
            .toString(16).slice(1);
    }
}

function mixColors(color1, color2, factor = 0.5) {
    function lerp(val1, val2) {
        const result = (1 - factor) * val1 + factor * val2;
        return Math.round(result);
    }

    let mixed = new Color();
    mixed.r = lerp(color1.r, color2.r);
    mixed.g = lerp(color1.g, color2.g);
    mixed.b = lerp(color1.b, color2.b);
    return mixed;
}

function darken(input, factor = 0.5) {
    const black = new Color("#000000");
    return mixColors(input, black, factor);
}

function lighten(input, factor = 0.5) {
    const white = new Color("#ffffff");
    return mixColors(input, white, factor);
}