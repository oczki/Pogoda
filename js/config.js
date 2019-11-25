const temperatureColors = new Map([
    [-30, "#1C0A8A"],
    [-20, "#2F2BBD"],
    [-10, "#0684BE"],
    [  0, "#14B39D"],
    [ 10, "#75B340"],
    [ 20, "#B9A700"],
    [ 30, "#BB4400"],
    [ 40, "#C30015"],
    [ 50, "#9E0061"]
]);

const airPollutionColors = new Map([
    [  5, "#399323"],
    [ 20, "#669818"],
    [ 35, "#949E0C"],
    [ 50, "#C1970B"],
    [ 65, "#D16623"],
    [ 80, "#D62A2A"],
    [100, "#A50052"],
    [125, "#6D006D"],
    [160, "#000000"]
]);

function skyconsColors() {
    let opts = {};
    opts["monochrome"] = false;
    opts["resizeClear"] = true;
    opts["colors"] = {};
    opts["colors"]["main"]        = "#111111";
    opts["colors"]["moon"]        = "#353545";
    opts["colors"]["fog"]         = "#AAAAAA";
    opts["colors"]["fogbank"]     = "#AAAAAA";
    opts["colors"]["light_cloud"] = "#777777";
    opts["colors"]["cloud"]       = "#666666";
    opts["colors"]["dark_cloud"]  = "#444444";
    opts["colors"]["thunder"]     = "#D1D13F";
    opts["colors"]["snow"]        = "#84BCD1";
    opts["colors"]["hail"]        = "#9595C7";
    opts["colors"]["sleet"]       = "#97BAC7";
    opts["colors"]["wind"]        = "#777777";
    opts["colors"]["leaf"]        = "#2C5228";
    opts["colors"]["rain"]        = "#2499C7";
    opts["colors"]["sun"]         = "#e0b31d";
    return opts;
}
    