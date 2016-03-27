//set up city list
//set up filterning json feed from the weather_data.json file
//maps keys to node location.


weatherObj={
	"city": {
		"new york":"ny",
		"chicago":"il",
		"san francisco":"ca",
		"San Diego":"ca",
		"Seattle":"wa",
		"Houston":"tx"
	},
	
	  "dataMap":{
		  "display_location":["full"],
		  "observation_location":["full"],
		  "root":["observation_time","weather","temperature_string","relative_humidity","wind_string","wind_gust_mph","dewpoint_f","dewpoint_c","heat_index_string","windchill_string","feelslike_string","visibility_mi","visibility_km","solarradiation","UV","precip_1hr_string","precip_today_string","icon_url"]
	  }
		
}