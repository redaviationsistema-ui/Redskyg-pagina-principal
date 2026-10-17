<?php
declare(strict_types=1);
if (!is_file(__DIR__ . '/vendor/autoload.php')) { error_log('commercial_inquiry dependencies_missing'); throw new RuntimeException('dependencies_missing'); }
require __DIR__ . '/vendor/autoload.php';
if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer') || !class_exists('PHPMailer\\PHPMailer\\SMTP')) { error_log('commercial_inquiry phpmailer_missing'); throw new RuntimeException('phpmailer_missing'); }
require __DIR__ . '/CommercialInquiry.php';
use SkyGroup\CommercialInquiry;
$stateDir = getenv('SKY_INQUIRY_STATE_DIR') ?: '';
$origins = array_values(array_filter(array_map('trim', explode(',', getenv('SKY_INQUIRY_ORIGINS') ?: ''))));
$smtp = [];
foreach (['host'=>'SMTP_HOST','username'=>'SMTP_USERNAME','password'=>'SMTP_PASSWORD','from'=>'SMTP_FROM','recipient'=>'SKY_INQUIRY_RECIPIENT','port'=>'SMTP_PORT','encryption'=>'SMTP_ENCRYPTION'] as $key=>$env) $smtp[$key] = getenv($env) ?: '';
return new CommercialInquiry(['stateDir'=>$stateDir,'secret'=>getenv('SKY_INQUIRY_SECRET') ?: '', 'origins'=>$origins],CommercialInquiry::smtpSender($smtp),CommercialInquiry::confirmationSender($smtp));
