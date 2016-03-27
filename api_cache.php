<?php
header('Access-Control-Allow-Origin: *');  


global $city, $state, $nodename, $fetchednode, $datapulled, $apiFile, $localfile, $epoch, $dataHolder;


$nodename=(empty($_POST['nodename'])) ? null : $_POST['nodename'];
$fetchednode=(empty($_POST['fetchednode'])) ? null : $_POST['fetchednode'];

######################
//Specific to Weather API only. Rewrite to fit other Data pull structures
//was setting null as placeholder for variable of future function for new city-state lookup
$city = (empty($_POST['city'])) ? null : $_POST['city'];
$state = (empty($_POST['state'])) ? null : $_POST['state'];


$city= strtoupper($city);//convert to uppercase prevent duplication in json
$state= strtoupper($state);

//temp
$city=rawurlencode($city);//deal with spaces for api
$apiKey="490b7f6020319ed9";// set API key;
$apiFile="http://api.wunderground.com/api/$apiKey/conditions/q/$state/$city.json";
#######################

//General Settings
$next_update=300;//seconds - how long to wait before next update
$epoch=time();
$localfile="api_data.json";
$lastTime=null;
$json_decode="";
$dataHolder=array();




if(file_exists($localfile)){
	   $json_decode=getNewFeedData($localfile);
	   $datapulled=checkFeedData($json_decode);
	
	
}else{
	//if file does not exist, seed it
	$datapulled=checkFeedData($json_decode);
}

	


function getNewFeedData($theFile){
	
	  
	  $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
	  $fileContents= file_get_contents($theFile,false,$context); 
	  $json_decode=json_decode($fileContents,true);
	 
	
	
	  return $json_decode;
	
}

function checkFeedData($json_decode){
	   global $city, $state, $nodename, $fetchednode, $epoch, $next_update, $apiFile, $dataHolder;
	   
	   $dataHolder=array();
	   
	
	   $lastTime=(empty($json_decode[$nodename][$city][time])) ? 0 : $json_decode['city'][$city][time];
	   $updateTime = ($epoch-$next_update>$lastTime) ? 0 : 1;
	   
	    
	   if(!$updateTime){
		  //update data weather
		  
		 $tempdata=getNewFeedData($apiFile);  
		 
		 ########Specific for Weather API
		 $datapulled=$tempdata["current_observation"];//["display_location"]["full"];
	
		 
		//capture new data and set into array for adding to json
		 $dataHolder["time"]=$epoch;
		 $dataHolder["$fetchednode"]=$datapulled;
		 $json_decode[$nodename][$city]=$dataHolder;

		 updateFeedData($json_decode);
		
		   
	   }else{
		   
		 //just pass along weather;
		 $datapulled=$json_decode[$nodename][$city][$fetchednode];
	   }
	   
	   
	   return $datapulled;
	   
	   
	   
	
}
	
function updateFeedData($json_decode){	  
	        global $localfile;
			
			  $newData=json_encode($json_decode);
			  file_put_contents($localfile, $newData);
			
		 
}

   
   

echo (json_encode($datapulled));//send stored json of this city to browser

?>