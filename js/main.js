//location of api and cache info
weather_api="api_cache.php";


function processWeather(WeatherDataNew){
	
	
      weatherData=WeatherDataNew;
	  
var reading="";  
	  //reshape the node
	  for (my_element in weatherObj.dataMap) {
        format(my_element, weatherObj.dataMap[my_element]);
	  }
  
}




function format(dataType, weatherArray){
	

	  var weatherComponent;
	 // var weatherReading;
	  for(var i=0;i<weatherArray.length;i++){
		  weatherComponent=weatherArray[i];
		  switch(dataType){
				case "observation_location":
				case "display_location":
				 weatherReading[weatherComponent]=weatherData[dataType][weatherComponent];
				break;
				
				case "root":
				 weatherReading[weatherComponent]=weatherData[weatherComponent];
				break;
				
				default:
				
				 
				break;
					 
			 }
			 
	     if(weatherComponent=="icon_url"){weatherReading[weatherComponent]="<img src="+weatherReading[weatherComponent]+">"}
		 document.getElementById("widgetholder").innerHTML+="<div class='col'>"+weatherComponent+"</div><div class='col'>"+weatherReading[weatherComponent]+"</div><br>";
		

	   
	 }

	
	 
}

function getWeather(city){
	
	//console.log(city);
	current_city=city;
    current_state=weatherObj.city[current_city];
	checkWeather();

	
}



function checkWeather(){
	
	getinfo.url = weather_api;
	getinfo.data="city="+current_city+"&state="+current_state+"&nodename=city&fetchednode=weather";
 	getinfo.action="liveweather";
    fetch_info(getinfo);
	
	
	
}
	







/*fetches the weather json if not in cache*/
function fetch_info(getinfo){
 
	
	var xmlhttp = new XMLHttpRequest();
	var url=getinfo.url;
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
			
			var data = JSON.parse(xmlhttp.responseText);
			
			switch(getinfo.action){
				case "liveweather":
				
				
				processWeather(data);
				break;
			
			default:
			    //kept switch for future expansion
				break;
			}
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(getinfo.data);
}

		
		
		