class Color {
    constructor(hex = "#000000") {
        const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        this._r = parseInt(rgb[1], 16);
        this._g = parseInt(rgb[2], 16);
        this._b = parseInt(rgb[3], 16);
    }
    
    set r(r) { this._r = r; }
    set g(g) { this._g = g; }
    set b(b) { this._b = b; }
    get r() { return this._r; }
    get g() { return this._g; }
    get b() { return this._b; }
    
    get rgb() {
        return [ this._r, this._g, this._b ];
    }
    
    get hex() {
        return "#" + ((1 << 24) + (this._r << 16) + (this._g << 8) + this._b
                     ).toString(16).slice(1);
    }
}

class ColorMixer {
    constructor(color1, color2, factor) {
        this.color1 = color1;
        this.color2 = color2;
        this.factor = factor;
    }
    
    lerp(val1, val2) {
        const result = (1 - this.factor) * val1 + this.factor * val2;
        return Math.round(result);
    }
    
    mix() {
        let mixed = new Color();
        mixed.r = this.lerp(this.color1.r, this.color2.r);
        mixed.g = this.lerp(this.color1.g, this.color2.g);
        mixed.b = this.lerp(this.color1.b, this.color2.b);
        return mixed;
    }
}

function darken(input, factor=0.5) {
    const black = new Color("#000000");
    return new ColorMixer(input, black, factor).mix();
}

function lighten(input, factor=0.5) {
    const white = new Color("#ffffff");
    return new ColorMixer(input, white, factor).mix();
}
