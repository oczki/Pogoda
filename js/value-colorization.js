class ValueColorant {
    constructor(lut) {
        this.lut = lut;
        this.minValue = Math.min.apply(null, Object.keys(this.lut));
        this.maxValue = Math.max.apply(null, Object.keys(this.lut));
    }
    
    getBoundsAndFactor(input) {
        let lowerBound = this.minValue;
        for (let value = input; value > this.minValue; value--)
            if (this.lut.hasOwnProperty(value.toString())) {
                lowerBound = +value;
                break;
            }

        let upperBound = +lowerBound + 1;
        for (let value = upperBound; value < this.maxValue; value++)
            if (this.lut.hasOwnProperty(value.toString())) {
                upperBound = +value;
                break;
            }
        
        const factor = (input - lowerBound) / (upperBound - lowerBound);
        return [ lowerBound, upperBound, factor ];
    }
    
    colorOf(value) {
        if (value <= this.minValue)
            return this.lut[this.minValue];
        if (value >= this.maxValue)
            return this.lut[this.maxValue];
        
        const [ minBound, maxBound, factor ] = this.getBoundsAndFactor(value);
        const minColor = new Color(this.lut[minBound.toString()]);
        const maxColor = new Color(this.lut[maxBound.toString()]);
        return new ColorMixer(minColor, maxColor, factor).mix();
    }
}

class TemperatureColorant {
    constructor() {
        this.lut = { "-30": "#1C0A8A", "-20": "#2F2BBD", "-10": "#0684BE",
                     "0"  : "#14B39D", "10" : "#75B340", "20" : "#B9A700",
                     "30" : "#BB4400", "40" : "#C30015", "50" : "#9E0061" };
        this.colorant = new ValueColorant(this.lut);
    }
    
    colorOf(temperature) {
        return this.colorant.colorOf(temperature);
    }
    
    getTensBetween(min, max) {
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
    
    gradient(lowTemp, highTemp) {
        let res = `linear-gradient(to right, ${this.colorOf(lowTemp).hex} 0, `;
        for (let tenStop of this.getTensBetween(lowTemp, highTemp))
            res += `${this.colorOf(tenStop.value).hex} ${tenStop.percent}%, `;
        res += `${this.colorOf(highTemp).hex} 100%)`;
        return res;
    }
}

function generateGradient(lowTemp, highTemp) {
    return new TemperatureColorant().gradient(lowTemp, highTemp);
}