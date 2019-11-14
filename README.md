# Pogoda

Renders a minimal website with current weather and air pollution data. Also marks whether shops are open or closed on Sundays.

Data is taken from DarkSky and Airly. If you set it up correctly, your API keys for these services will not be exposed to curious visitors, and neither will your location.

## Installation

1. Find your longitude and latitude and put them in `data/cron/callApis.py` as floats.
1. Get [DarkSky API key](https://darksky.net/dev). Put it in `data/cron/callApis.py`.
1. Get [Airly API key](https://developer.airly.eu/api). Also put it in `data/cron/callApis.py`.
1. Get [Skycons](https://github.com/darkskyapp/skycons) and put `skycons.js` in `js/`.
1. Set up your cron to call `data/cron/callApis.sh` once per 15 minutes or so.

You're done. Just don't call these APIs more than 1000 times a day, or you'll exceed their free daily quota.
