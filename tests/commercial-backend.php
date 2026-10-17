<?php
declare(strict_types=1);
require __DIR__.'/../server/php/vendor/autoload.php';
require __DIR__.'/../server/php/CommercialInquiry.php';
use SkyGroup\CommercialInquiry;
use SkyGroup\DeliveryFailure;
$dir=sys_get_temp_dir().'/skygroup-test-'.bin2hex(random_bytes(8));mkdir($dir,0700);
$count=0;
function check(bool $condition,string $message):void{global $count;if(!$condition)throw new RuntimeException($message);$count++;}
function uuid():string{$hex=bin2hex(random_bytes(16));return substr($hex,0,8).'-'.substr($hex,8,4).'-4'.substr($hex,13,3).'-a'.substr($hex,17,3).'-'.substr($hex,20);}
$base=['operation'=>'buy','requestId'=>uuid(),'aircraftType'=>'Jet privado','country'=>'México','name'=>'María Pérez','email'=>'test@example.com','phone'=>'7221234567','comments'=>'<img src=x onerror=alert(1)>','privacyAccepted'=>true,'privacyVersion'=>CommercialInquiry::contract()['version']];
$config=['stateDir'=>$dir,'secret'=>str_repeat('x',48),'origins'=>['https://redskyg.com'],'rateLimit'=>100];
$server=['CONTENT_TYPE'=>'application/json','HTTP_ORIGIN'=>'https://redskyg.com','REMOTE_ADDR'=>'127.0.0.1'];
$sends=0;
$handler=new CommercialInquiry($config,function()use(&$sends){$sends++;});
$call=fn(array $input,array $headers=[])=>$handler->handle('POST',json_encode($input),array_replace($server,$headers));
try{
 [$status,$receipt]=$call($base);check($status===200&&$receipt['received']&&$receipt['delivery']==='sent'&&!$receipt['stored'],'confirmed mail receipt');
 [$status,$receipt]=$call($base);check($status===200&&$sends===1,'idempotent repeat');
 [$status]=$call(array_replace($base,['name'=>'Otro nombre']));check($status===409&&$sends===1,'changed payload conflict');
 foreach(['sell','aircraft_management','technical_service']as$operation){$input=array_replace($base,['requestId'=>uuid(),'operation'=>$operation,'manufacturer'=>'Cessna','model'=>'Citation','service'=>'Inspección y asesoría personalizada']);[$status]=$call($input);check($status===200,'each operation accepted');}
 check($handler->handle('GET','',$server)[0]===405,'method');
 check($handler->handle('POST',str_repeat('x',16385),$server)[0]===413,'body size');
 check($handler->handle('POST','{}',array_replace($server,['CONTENT_TYPE'=>'text/plain']))[0]===415,'content type');
 check($handler->handle('POST','invalid',$server)[0]===400,'JSON');
 check($call($base,['HTTP_ORIGIN'=>'https://attacker.test'])[0]===403,'foreign origin');
 check($call($base,['HTTP_REFERER'=>'https://attacker.test/path'])[0]===403,'foreign referer');
 check($call($base,['HTTP_SEC_FETCH_SITE'=>'cross-site'])[0]===403,'fetch site');
 check($call(array_replace($base,['website'=>'spam']))[0]===403,'honeypot');
 check($call(array_replace($base,['operation'=>'arbitrary']))[0]===422,'operation whitelist');
 check($call(array_replace($base,['requestId'=>'bad']))[0]===422,'request id');
 foreach(['country'=>'<invalid>','email'=>"test@example.com\r\nBcc: attacker@example.com",'phone'=>'000','comments'=>str_repeat('a',1001),'privacyAccepted'=>false,'privacyVersion'=>'unknown']as$key=>$bad){[$status,$result]=$call(array_replace($base,[$key=>$bad]));check($status===422&&isset($result['errors'][$key==='privacyVersion'?'privacyAccepted':$key]),'invalid '.$key);}
 $missingSmtp=new CommercialInquiry($config,CommercialInquiry::smtpSender([]));
 [$status,$missingResult]=$missingSmtp->handle('POST',json_encode(array_replace($base,['requestId'=>uuid()])),$server);
 check($status===503&&$missingResult['code']==='configuration','SMTP missing configuration is 503, not delivery failure');
 $attempt=0;$failed=new CommercialInquiry($config,function()use(&$attempt){$attempt++;if($attempt===1)throw new DeliveryFailure(false);});
 $retry=array_replace($base,['requestId'=>uuid()]);check($failed->handle('POST',json_encode($retry),$server)[0]===502,'delivery failure recoverable');check($failed->handle('POST',json_encode($retry),$server)[0]===200,'retry after known rejection');
 $uncertain=new CommercialInquiry($config,function(){throw new DeliveryFailure(true);});$unknown=array_replace($base,['requestId'=>uuid()]);check($uncertain->handle('POST',json_encode($unknown),$server)[0]===409,'ambiguous delivery');check($handler->handle('POST',json_encode($unknown),$server)[0]===409,'ambiguous delivery never resent');
 $limited=new CommercialInquiry(array_replace($config,['rateLimit'=>1]),fn()=>null);$different=array_replace($server,['REMOTE_ADDR'=>'192.0.2.3']);check($limited->handle('POST',json_encode(array_replace($base,['requestId'=>uuid()])),$different)[0]===200,'rate first');check($limited->handle('POST',json_encode(array_replace($base,['requestId'=>uuid()])),$different)[0]===429,'rate burst');
 $unconfigured=new CommercialInquiry(['origins'=>['https://redskyg.com']],fn()=>null);check($unconfigured->handle('POST',json_encode($base),$server)[0]===503,'missing private config fails closed');
 [, $clean]=CommercialInquiry::validate($base);$message=CommercialInquiry::message($clean,$base['requestId'],gmdate('c'));check(str_contains($message['html'],'&lt;img')&&!str_contains($message['html'],'<img'),'HTML escaped');
 foreach(glob($dir.'/request-*.json')as$file){$record=file_get_contents($file);check(!str_contains($record,'test@example.com')&&!str_contains($record,'María')&&!str_contains($record,'img src'),'metadata contains no lead data');}
 echo $count." backend checks passed\n";
}finally{foreach(glob($dir.'/*')as$file)unlink($file);rmdir($dir);}
