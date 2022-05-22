from time import sleep
import requests as req
import json

json_data = {
    "src": open("abc.c", "r").read(),
    "stdin": open("input.txt", "r").read(),
    "lang":"c",
    "timeout":60
}

res = req.post('http://localhost:7000/submit', data=json.dumps(json_data), headers={'Content-Type': 'application/json'}).content

sleep(0.5)

# Load the JSON to a Python list & dump it back out as formatted JSON
data = json.loads(res.decode('utf8').replace("'", '"'))
print(req.get(data['data']).content)
