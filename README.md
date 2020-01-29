# [☀️ Live demo](http://oczki.pl/pogoda)

For English, scroll below.

---

# 🌥️ Pogoda na rzut oka

Wyświetla prostą, responsywną stronę z prognozą pogody i zanieczyszczeniem powietrza dla jednego, stałego miejsca. Na widoku tygodniowym zaznacza też niedziele handlowe i niehandlowe, których ostatnio coraz mniej. Oprócz podstawowego ma też ciemny theme, by nie wypalać oczu przy porannym sprawdzaniu prognozy.

Dane pobierane są z DarkSky oraz Airly. Ich klucze API są trzymane w backendzie, zaś zwracane informacje o lokalizacji – usuwane z wynikowego JSONa.

Ikony to [kolorowe Skycons](https://github.com/maxdow/skycons) ze zmodyfikowanymi odcieniami.

Używa jednostek SI. Jeśli rozumiesz tekst jaki właśnie czytasz, prawdopodobnie właśnie tych jednostek się spodziewasz.

## 🔧 Instalacja

Wymagane składniki to Python 2.7 dla odpytywań API, cron wołający plik shellowy oraz PHP do cache busting.

1. Do pliku `data/cron/call_apis.py` wpisz żądaną lokalizację – long i lat – jako float.
1. Swój [klucz API DarkSky](https://darksky.net/dev) również wpisz do `data/cron/call_apis.py`.
1. Swój [klucz API Airly](https://developer.airly.eu/api) tak samo wpisz do `data/cron/call_apis.py`.
1. Ustaw crontab tak, by `data/cron/call_apis` (nie `.py`!) był wołany raz na 15 minut.
1. Opcjonalnie: Skonfiguruj `.htaccess` (albo jego odpowiednik), by serwer akceptował kompresję gzip.

To wszystko. Pamiętaj, aby nie wołać API więcej niż 1000 razy na dzień, gdyż to limit darmowych odpytań. Włączenie kompresji zmniejszy `data.js` do ~10% oryginalnego rozmiaru.

---

# 🌥️ Weather at a glance

Renders a responsive, minimal website with current weather and air pollution data, all for a hardcoded location. Also marks whether shops are open or closed on Sundays in Poland. Has a light and dark theme, so your eyes don't have to burn when you check the forecast.

Data is taken from DarkSky and Airly. If you set it up correctly, your API keys for these services will not be exposed to curious visitors, and neither will your location.

Icons were taken from [colored Skycons](https://github.com/maxdow/skycons), with slightly adjusted colors.

Uses SI units. Look up respective API docs on how to change that to ones you prefer.

## 🔧 Installation

You'll need Python 2.7 for API calls, cron to make them automatically, and PHP for cache busting.

1. Find your longitude and latitude and put them in `data/cron/call_apis.py` as floats.
1. Get [DarkSky API key](https://darksky.net/dev). Put it in `data/cron/call_apis.py`.
1. Get [Airly API key](https://developer.airly.eu/api). Also put it in `data/cron/call_apis.py`.
1. Set up your cron to call `data/cron/call_apis` (not `.py`!) once per 15 minutes or so.
1. Optionally, set up `.htaccess` (or its equivalent) to accept gzip compression.

You're done. Just don't call these APIs more than 1000 times a day, or you'll exceed their free daily quota. Enabling compression will save you ~90% of bandwidth.
