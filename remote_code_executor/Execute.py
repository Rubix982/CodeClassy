import requests as req
import json

json_data = {
    "src": open("abc.c", "r").read(),
    "stdin": open("input.txt", "r").read(),
    "lang":"c",
    "timeout":60
}

print(req.post('http://104.43.209.18:7000/submit', data=json.dumps(json_data), headers={'Content-Type': 'application/json'}).content)
