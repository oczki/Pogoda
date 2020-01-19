<?php
function timestampUrl($path) {
    return $path . '?' . filemtime($path);
}
function addCss($name) {
    echo '<link rel="stylesheet" href="'
         . timestampUrl('./css/' . $name . '.css') . '" type="text/css">'
         . "\n";
}
function addJs($path) {
    echo '<script src="' . timestampUrl('./' .$path . '.js') . '"></script>'
         . "\n";
}
?><!DOCTYPE html>
<html lang="pl-PL">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="initial-scale=1.0, width=device-width">
        <link rel="shortcut icon" type="image/png" href="img/favicon.png"/>
        <meta property="og:locale" content="pl_PL"/>
        <meta property="og:title" content="Aktualna pogoda, zanieczyszczenie powietrza i niedziele handlowe"/>
        <meta property="og:image" content="img/og-image.png"/>
        <title>Pogoda na rzut oka</title>
        <?php
        addJs('data/data');
        addJs('data/sundays');
        addJs('js/config');
        addJs('js/skycons');
        addJs('js/color');
        addJs('js/value-colorization');
        addJs('js/app');
        addCss('style');
        ?>
    </head>
    <body>
        <div id="main">
        </div>
        <div id="footer">
            <span id="github-link"><a href="https://github.com/tehoko/Pogoda">GitHub</a></span>
            <span id="darksky-link"><a href="https://darksky.net/poweredby/">Powered by Dark Sky</a></span>
            <span id="airly-link"><a href="https://airly.eu/">Dane z Airly</a></span>
        </div>
    </body>
</html>
