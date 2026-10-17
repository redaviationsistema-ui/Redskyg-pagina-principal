import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import net from 'node:net';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import contract from '../server/php/commercial-contract.json' with {type:'json'};
test('dev PHP loads all seven variables from private file before serving requests', {timeout:15000},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'sky-env-test-'));let child;
 const reserve=async()=>{const server=net.createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;await new Promise(r=>server.close(r));return port;};
 try{
  const port=await reserve(),smtpPort=await reserve(),file=join(dir,'smtp.local');
  await writeFile(file,'SMTP_HOST=127.0.0.1\nSMTP_PORT='+smtpPort+'\nSMTP_ENCRYPTION=ssl\nSMTP_USERNAME=local-fixture\nSMTP_PASSWORD=fixture-only-password\nSMTP_FROM=sales@example.com\nSKY_INQUIRY_RECIPIENT=inbox@example.com\n',{mode:0o600});
  const env={...process.env,SKY_PHP_ENV_FILE:file,SKY_PHP_DEV_PORT:String(port),SKY_INQUIRY_ORIGINS:'http://localhost:5173'};
  for(const key of ['SMTP_HOST','SMTP_PORT','SMTP_ENCRYPTION','SMTP_USERNAME','SMTP_PASSWORD','SMTP_FROM','SKY_INQUIRY_RECIPIENT','SKY_INQUIRY_STATE_DIR','SKY_INQUIRY_SECRET'])delete env[key];
  child=spawn('node',['server/php/dev-server.mjs'],{env,stdio:['ignore','pipe','pipe']});let logs='';child.stdout.on('data',d=>logs+=d);child.stderr.on('data',d=>logs+=d);
  const endpoint='http://127.0.0.1:'+port+'/aircraft-inquiry.php';let ready=false;for(let i=0;i<50;i++){try{if((await fetch(endpoint)).status===405){ready=true;break;}}catch{}await delay(100);}assert.ok(ready,logs);
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Origin:'http://localhost:5173'},body:JSON.stringify({operation:'buy',requestId:randomUUID(),aircraftType:'Jet privado',country:'México',name:'Prueba Local',email:'test@example.com',phone:'7221234567',privacyAccepted:true,privacyVersion:contract.version})});
  const body=await response.json();assert.equal(response.status,502);assert.equal(body.code,'delivery_failed');assert.equal(body.received,false);
  assert.ok(!logs.includes('smtp_configuration_missing'));assert.ok(!logs.includes('fixture-only-password'));assert.ok(!logs.includes('test@example.com'));
 }finally{if(child){await new Promise(r=>{child.once('exit',r);child.kill('SIGTERM');});}await rm(dir,{recursive:true,force:true});}
});
