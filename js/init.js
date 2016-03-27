var weatherData;
getinfo={};
weatherReading={};

	
//set default city from the data_object, and get its state	
current_city="san francisco";
current_state=weatherObj.city[current_city];

/*
Read more about the api used:
https://www.wunderground.com/weather/api/d/docs?MR=1
*/


checkWeather();