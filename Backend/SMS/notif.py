import requests
from twilio.rest import Client
from dotenv import load_dotenv
import os
load_dotenv()

# === Weather API Setup ===
weather_api_key = os.getenv("WEATHER_API_KEY")
location = 'Hyderabad,IN'

# === Twilio Setup ===
twilio_sid = os.getenv("TWILIO_ACCOUNT_SID")
twilio_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_PHONE_NUMBER")

# === Initialize Twilio Client ===
client = Client(twilio_sid, twilio_token)

# === Fetch Weather Data ===
weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={weather_api_key}"
response = requests.get(weather_url)

if response.status_code != 200:
    print("Failed to fetch weather data.")
    print("Response:", response.text)
    exit()

weather = response.json()
conditions = weather.get("weather", [])

# === Farmers List (moved outside) ===
farmers = [
    {"name": "Ravi", "phone": "+18777804236"}
]

# === Check for Rain and Send SMS ===
is_raining = any("rain" in condition.get("main", "").lower() for condition in conditions)

if is_raining:
    for farmer in farmers:
        message = (
            f"Dear {farmer['name']}, it's currently raining in your area. "
            "Please take necessary precautions!"
        )
        sent_msg = client.messages.create(
            body=message,
            from_=twilio_number,
            to=farmer['phone']
        )
        print(f"🌧️ Rain Alert sent to {farmer['name']} ({farmer['phone']}), SID: {sent_msg.sid}")
else:
    for farmer in farmers:
        message = (
            f"Dear {farmer['name']}, no rain in your area right now. "
            "It's a good time to plan or monitor your crops accordingly."
        )
        sent_msg = client.messages.create(
            body=message,
            from_=twilio_number,
            to=farmer['phone']
        )
        print(f"☀️ Clear Weather Alert sent to {farmer['name']} ({farmer['phone']}), SID: {sent_msg.sid}")
