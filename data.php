<?php
  $API_KEY = "DVBV7U5PAU4WVL8M";
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOGL&apikey=" . $API_KEY))
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $server_output = curl_exec ($ch);
  curl_close ($ch);
  $result = json_decode($server_output);

  $dataForAllDays = $result->{'Time Series (Daily)'};
  $dataForSingleDate = $dataForAllDays['2020-10-30'];
  echo $dataForSingleDate['1. open'] .'</br>'
  // for($i = 0; $i < 31; $i++) {
  //   echo $dataArray[$i] = $dataForAllDays->{'2020-01-'.$i};
  // }
   //$dataTarget = $dataForAllDays->{'2020-02-01'};

  return json_encode($dataForSingleDate['1. open']);
?>