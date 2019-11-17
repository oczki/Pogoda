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
        <title>Pogoda na rzut oka</title>
        <?php
        addJs('data/data');
        addJs('data/sundays');
        addJs('js/skycons');
        addJs('js/app');
        addCss('style');
        ?>
    </head>
    <body>
    </body>
</html>
