// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { format } from "date-fns";

export default async (req, res) => {
  const result = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=30.900965&lon=75.857277&appid=${process.env.WEATHER_API_KEY}&part=daily&units=Imperial`
  );

const days = result.data.daily.splice(0, 5).map((day) => {
  return {
    icon: day.weather[0].main,
    desc: day.weather[0].description.replace(" intensity", ""),
    date: format(new Date(day.dt * 1000), "MM/dd"),
    date_full: format(new Date(day.dt * 1000), "MMMM dd, yyyy"),
    details: { humidity: day.humidity, rain: day.rain, wind: day.wind_speed },
    feels: {
      day: day.feels_like.day,
      night: day.feels_like.night,
      even: day.feels_like.eve,
      morn: day.feels_like.morn 
    },
    temp: {
      day: day.temp.day,
      night: day.temp.night,
      even: day.temp.eve,
      morn: day.temp.morn 
    },
  }})


  res.statusCode = 200;
  res.json({ days });
};



// const days = [
//   {
//    "icon": "Clear",
//    "desc": "Clear sky",
//    "date": "04/26",
//    "date_full": "April 26, 2024",
//    "details": {
//      "humidity": 70,
//      "rain": 0,
//      "wind": 5.5
//    },
//    "feels": {
//      "day": 25,
//      "night": 15,
//      "even": 22,
//      "morn": 18
//    },
//    "temp": {
//      "day": 24,
//      "night": 14,
//      "even": 21,
//      "morn": 17
//    }
//  },
//   {
//    "icon": "Clear",
//    "desc": "Clear sky",
//    "date": "04/26",
//    "date_full": "April 26, 2024",
//    "details": {
//      "humidity": 70,
//      "rain": 0,
//      "wind": 5.5
//    },
//    "feels": {
//      "day": 25,
//      "night": 15,
//      "even": 22,
//      "morn": 18
//    },
//    "temp": {
//      "day": 24,
//      "night": 14,
//      "even": 21,
//      "morn": 17
//    }
//  },
//   {
//    "icon": "Clear",
//    "desc": "Clear sky",
//    "date": "04/26",
//    "date_full": "April 26, 2024",
//    "details": {
//      "humidity": 70,
//      "rain": 0,
//      "wind": 5.5
//    },
//    "feels": {
//      "day": 25,
//      "night": 15,
//      "even": 22,
//      "morn": 18
//    },
//    "temp": {
//      "day": 24,
//      "night": 14,
//      "even": 21,
//      "morn": 17
//    }
//  },
 
// ];
