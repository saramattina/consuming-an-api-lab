const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//middleware to get req data into req body
app.use(express.urlencoded({ extended: true}))


app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.get("/weather/show", (req, res) => {
  res.render("./weather/show.ejs", {
    weather: req.query.weather,
    city: req.query.city,
    sky: req.query.sky,
  });
  //add city name, current temp, current weather description, link back to home
  //take more data into query params and pass them into here
})

app.post("/weather", async (req, res) => {
  const zip = req.body.zip
  const apiKey = process.env.API_KEY;
  const weatherReq = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${apiKey}`);
  const weatherData = await weatherReq.json();
  console.log(weatherData.main.temp);
  console.log("sky:" + weatherData.weather[0].main)
  res.redirect(`/weather/show?weather=${weatherData.main.temp}&city=${weatherData.name}&sky=${weatherData.weather[0].main}`)
})

app.listen(3000, () => {
   console.log("I'm working");
 });