import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { mkdtemp, readFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import tls from 'node:tls';
import net from 'node:net';
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { contract } from '../src/features/aircraft-sales/commercialSchema.js';
test('real PHP endpoint and PHPMailer deliver to a local TLS SMTP fixture, reject failures and deduplicate', {timeout:25000}, async()=>{
 const dir=await mkdtemp(join(tmpdir(),'skygroup-smtp-'));
 let php, smtp; const sockets=new Set(), messages=[]; let rejectNext=false, rejectClient=false;
 try {
  const certPath=join(dir,'cert.pem'),keyPath=join(dir,'key.pem'),stateDir=join(dir,'state');await mkdir(stateDir,{mode:0o700});
  execFileSync('openssl',['req','-x509','-newkey','rsa:2048','-nodes','-keyout',keyPath,'-out',certPath,'-days','1','-subj','/CN=127.0.0.1','-addext','subjectAltName=IP:127.0.0.1'],{stdio:'ignore'});
  smtp=tls.createServer({key:await readFile(keyPath),cert:await readFile(certPath)},socket=>{
   sockets.add(socket);socket.on('close',()=>sockets.delete(socket));socket.on('error',()=>{});socket.write('220 local SMTP fixture\r\n');
   let buffer='',dataMode=false,auth=0,mail=[];
   socket.on('data',chunk=>{buffer+=chunk.toString();let index;while((index=buffer.indexOf('\r\n'))>=0){const line=buffer.slice(0,index);buffer=buffer.slice(index+2);
    if(dataMode){if(line==='.'){messages.push(mail.join('\r\n'));mail=[];dataMode=false;socket.write('250 2.0.0 queued locally\r\n');}else mail.push(line);continue;}
    if(auth){auth--;socket.write(auth?'334 UGFzc3dvcmQ6\r\n':'235 2.7.0 authenticated\r\n');continue;}
    if(/^EHLO/.test(line))socket.write('250-localhost\r\n250-AUTH LOGIN PLAIN\r\n250 SIZE 16384\r\n');
    else if(/^AUTH LOGIN/.test(line)){auth=2;socket.write('334 VXNlcm5hbWU6\r\n');}
    else if(/^AUTH PLAIN/.test(line))socket.write('235 2.7.0 authenticated\r\n');
    else if(/^RCPT/.test(line)&&(rejectNext || (rejectClient && line.includes('client@example.com')))){rejectNext=false;socket.write('550 5.1.1 fixture rejection\r\n');}
    else if(/^DATA/.test(line)){dataMode=true;socket.write('354 end with dot\r\n');}
    else if(/^QUIT/.test(line)){socket.end('221 bye\r\n');}
    else socket.write('250 OK\r\n');
   }});
  });
  await new Promise(resolve=>smtp.listen(0,'127.0.0.1',resolve));
  const reservation=net.createServer();await new Promise(resolve=>reservation.listen(0,'127.0.0.1',resolve));const httpPort=reservation.address().port;await new Promise(resolve=>reservation.close(resolve));
  php=spawn('php',['-d','openssl.cafile='+certPath,'-S','127.0.0.1:'+httpPort,'-t',resolve('public')],{stdio:['ignore','ignore','pipe'],env:{...process.env,SKY_INQUIRY_ORIGINS:'http://localhost:5174',SKY_INQUIRY_STATE_DIR:stateDir,SKY_INQUIRY_SECRET:'local-fixture-secret-with-more-than-32-characters',SMTP_HOST:'127.0.0.1',SMTP_PORT:String(smtp.address().port),SMTP_ENCRYPTION:'ssl',SMTP_USERNAME:'fixture',SMTP_PASSWORD:'fixture-password',SMTP_FROM:'sales@example.com',SKY_INQUIRY_RECIPIENT:'inbox@example.com'}});
  let logs='';php.stderr.on('data',data=>logs+=data);
  const url='http://127.0.0.1:'+httpPort+'/aircraft-inquiry.php';
  let ready=false;for(let i=0;i<30;i++){try{const r=await fetch(url);if(r.status===405){ready=true;break;}}catch{}await delay(100);}assert.ok(ready,logs);
  const input={operation:'buy',requestId:randomUUID(),aircraftType:'Jet privado',country:'México',name:'Prueba Local',email:'client@example.com',phone:'7221234567',comments:'<script>unsafe</script>',privacyAccepted:true,privacyVersion:contract.version};
  const send=body=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Origin:'http://localhost:5174'},body:JSON.stringify(body)});
  let response=await send(input);let result=await response.json();assert.equal(response.status,200,JSON.stringify({result,logs}));assert.equal(result.received,true);assert.equal(result.delivery,'sent');assert.equal(result.clientConfirmation,'sent');assert.equal(result.folio,'SKY-'+input.requestId.replaceAll('-','').toUpperCase());assert.equal(result.stored,false);assert.equal(messages.length,2);
  const boundary=/boundary="([^"]+)"/.exec(messages[0])[1];
  const htmlStart=messages[0].indexOf('Content-Type: text/html');
  const htmlPart=messages[0].slice(htmlStart).split(/\r\n--/)[0];
  const [partHeaders,...partContent]=htmlPart.split('\r\n\r\n');
  const encoded=partContent.join('\r\n\r\n');
  const decoded=/base64/i.test(partHeaders)?Buffer.from(encoded,'base64').toString():encoded.replace(/=\r\n/g,'').replace(/=([A-F0-9]{2})/g,(_,hex)=>String.fromCharCode(parseInt(hex,16)));
  assert.ok(messages[0].includes('To: inbox@example.com'));assert.ok(messages[0].includes('From: Sky Group LLC <sales@example.com>'));assert.ok(messages[0].includes('Reply-To: Prueba Local <client@example.com>'));
  assert.ok(decoded.includes('&lt;script&gt;'));assert.ok(!decoded.includes('<script>'));
  response=await send(input);assert.equal(response.status,200);assert.equal(messages.length,2,'duplicate cannot deliver twice');
  rejectNext=true;const failed={...input,requestId:randomUUID()};response=await send(failed);result=await response.json();assert.equal(response.status,502);assert.equal(result.received,false);assert.equal(result.delivery,'failed');assert.equal(messages.length,2);
  response=await send(failed);assert.equal(response.status,200);assert.equal(messages.length,4);
  response=await send({...input,requestId:randomUUID(),phone:'invalid'});assert.equal(response.status,422);assert.equal(messages.length,4);
  assert.equal(result.folio,undefined); // The last result was a failed internal delivery.
  assert.ok(!messages[0].includes('application/pdf'));
  assert.ok(messages[1].includes('To: Prueba Local <client@example.com>'));
  rejectClient=true;const noAck={...input,requestId:randomUUID()};
  response=await send(noAck);result=await response.json();assert.equal(response.status,200);assert.equal(result.clientConfirmation,'failed');assert.equal(result.received,true);assert.equal(result.folio,'SKY-'+noAck.requestId.replaceAll('-','').toUpperCase());assert.equal(messages.length,5);
  response=await send(noAck);assert.equal(response.status,200);assert.equal((await response.json()).clientConfirmation,'failed');assert.equal(messages.length,5,'client confirmation failure must not resend internal message');
  await new Promise(resolve=>{php.once('exit',resolve);php.kill();});php=null;
  php=spawn('php',['-S','127.0.0.1:'+httpPort,'-t',resolve('public')],{stdio:['ignore','ignore','pipe'],env:{...process.env,SKY_INQUIRY_ORIGINS:'http://localhost:5174',SKY_INQUIRY_STATE_DIR:stateDir,SKY_INQUIRY_SECRET:'local-fixture-secret-with-more-than-32-characters',SMTP_HOST:'',SMTP_USERNAME:'',SMTP_PASSWORD:'',SMTP_FROM:'',SKY_INQUIRY_RECIPIENT:''}});
  php.stderr.on('data',data=>logs+=data);
  for(let i=0;i<30;i++){try{if((await fetch(url)).status===405)break;}catch{}await delay(100);}
  response=await send({...input,requestId:randomUUID()});result=await response.json();assert.equal(response.status,503);assert.equal(result.code,'configuration');assert.equal(result.received,false);assert.equal(messages.length,5,'no SMTP starts without configuration');
  assert.ok(logs.includes('smtp_configuration_missing'));assert.ok(!logs.includes('fixture-password'));assert.ok(!logs.includes('client@example.com'));
 } finally {
  if(php){php.kill();await new Promise(resolve=>php.once('exit',resolve));}
  for(const socket of sockets)socket.destroy();
  if(smtp)await new Promise(resolve=>smtp.close(resolve));
  await rm(dir,{recursive:true,force:true});
 }
});
