<?php
declare(strict_types=1);
require __DIR__ . '/../server/php/vendor/autoload.php';
require __DIR__ . '/../server/php/CommercialInquiry.php';
$fixtures=json_decode(stream_get_contents(STDIN),true,512,JSON_THROW_ON_ERROR);
$results=[];
foreach($fixtures as $fixture){[$errors,$values]=SkyGroup\CommercialInquiry::validate($fixture['input']);$results[]=['errors'=>(object)$errors,'phone'=>$values['phone']??null];}
echo json_encode($results,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
