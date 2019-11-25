class ValueColorant {
    constructor(lut) {
        this.lut = lut;
        this.minValue = Math.min(...this.lut.keys());
        this.maxValue = Math.max(...this.lut.keys());
    }

    getBoundsAndFactor(input) {
        let lowerBound = this.minValue;
        for (let value = input; value >= this.minValue; value--)
            if (this.lut.has(value)) {
                lowerBound = value;
                break;
            }

        let upperBound = lowerBound + 1;
        for (let value = upperBound; value <= this.maxValue; value++)
            if (this.lut.has(value)) {
                upperBound = value;
                break;
            }

        const factor = (input - lowerBound) / (upperBound - lowerBound);
        return [lowerBound, upperBound, factor];
    }

    colorOf(value) {
        if (value <= this.minValue)
            return new Color(this.lut.get(this.minValue));
        if (value >= this.maxValue)
            return new Color(this.lut.get(this.maxValue));

        const [minBound, maxBound, factor] = this.getBoundsAndFactor(value);
        const minColor = new Color(this.lut.get(minBound));
        const maxColor = new Color(this.lut.get(maxBound));
        return mixColors(minColor, maxColor, factor);
    }
}

class TemperatureColorant {
    constructor() {
        this.colorant = new ValueColorant(temperatureColors);
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
                res.push({
                    value,
                    percent
                });
            }
        return res;
    }

    gradient(lowTemp, highTemp) {
        let res =
            `linear-gradient(to right, ${this.colorOf(lowTemp).hex} 0, `;
        for (let tenStop of this.getTensBetween(lowTemp, highTemp))
            res +=
            `${this.colorOf(tenStop.value).hex} ${tenStop.percent}%, `;
        res += `${this.colorOf(highTemp).hex} 100%)`;
        return res;
    }
}

class AirPollutionColorant {
    constructor() {
        this.colorant = new ValueColorant(airPollutionColors);
    }

    colorOf(caqi) {
        const val = Math.round(caqi);
        return this.colorant.colorOf(val);
    }
}