import requests
import json
import sys
import io
import os


latitude = 12.345678
longitude = 56.789012

darksky_apikey = "<your DarkSky API key here>"
airly_apikey = "<your Airly API key here>"


def save(data, filename):
  path = os.path.join(sys.path[0], filename)
  with io.open(path, "w", encoding="utf-8") as file:
    file.write(data)


class Service:
  def __init__(self, name):
    self.name = name
    self.url = ""
    self.params = {}
    self.headers = { "Accept": "application/json", "Accept-Encoding": "gzip", "Accept-Language": "pl" }

  def set_url(self, url):
    self.url = url

  def set_params(self, params):
    self.params = params

  def set_headers(self, headers):
    self.headers.update(headers)

  def call_api(self):
    response = requests.get(self.url, params=self.params, headers=self.headers)
    response.encoding = "utf-8"
    return response.json()

  def prettify(self, data):
    return json.dumps(data, encoding="utf8", ensure_ascii=False, indent=2)

  def filter(self, data):
    data.pop(u"latitude", None)
    data.pop(u"longitude", None)
    data.pop(u"timezone", None)
    return data

  def get_data(self):
    data = self.prettify(self.filter(self.call_api()))
    return self.name + " = " + data + ";\n"


darksky = Service("darksky")
darksky.set_url("https://api.darksky.net/forecast/" + darksky_apikey + "/" + str(latitude) + "," + str(longitude))
darksky.set_params({ "lang": "pl", "units": "si" })

airly = Service("airly")
airly.set_url("https://airapi.airly.eu/v2/measurements/point")
airly.set_params({ "indexType": "AIRLY_CAQI", "lat": latitude, "lng": longitude })
airly.set_headers({ "apikey": airly_apikey })

save(darksky.get_data() + airly.get_data(), "../data.js")
