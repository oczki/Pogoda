import io
import json
import os
import sys

import requests


LATITUDE = 12.345678
LONGITUDE = 56.789012

APIKEY_DARKSKY = "<your DarkSky API key here>"
APIKEY_AIRLY = "<your Airly API key here>"

DATA_PATH = "../data.js"


def save(data, filename):
    path = os.path.join(os.path.dirname(__file__), filename)
    with io.open(path, "w", encoding="utf-8") as file:
        file.write(data)


def prettify(data):
    return json.dumps(data, encoding="utf8", ensure_ascii=False, indent=2)


class Service:
    def __init__(self, name):
        self.name = name
        self.url = ""
        self.params = {}
        self.headers = {
            "Accept": "application/json",
            "Accept-Encoding": "gzip",
            "Accept-Language": "pl",
        }

    def call_api(self):
        response = requests.get(
            self.url, params=self.params, headers=self.headers
        )
        response.encoding = "utf-8"
        return response.json()

    def filter(self, data):
        data = data.copy()
        data.pop(u"latitude", None)
        data.pop(u"longitude", None)
        data.pop(u"timezone", None)
        return data

    def get_data(self):
        return self.filter(self.call_api())


def main():
    darksky = Service("darksky")
    darksky.url = (
        "https://api.darksky.net/forecast/"
        + APIKEY_DARKSKY
        + "/"
        + str(LATITUDE)
        + ","
        + str(LONGITUDE)
    )
    darksky.params = {"lang": "pl", "units": "si"}

    airly = Service("airly")
    airly.url = "https://airapi.airly.eu/v2/measurements/point"
    airly.params = {
        "indexType": "AIRLY_CAQI",
        "lat": LATITUDE,
        "lng": LONGITUDE,
    }
    airly.headers.update({"apikey": APIKEY_AIRLY})

    save(
        "".join(
            u"{} = {};\n".format(service.name, prettify(service.get_data()))
            for service in [darksky, airly]
        ),
        DATA_PATH,
    )


if (__name__) == "__main__":
    main()
