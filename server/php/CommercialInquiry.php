<?php
declare(strict_types=1);
namespace SkyGroup;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

final class DeliveryFailure extends \RuntimeException {
    public function __construct(public readonly bool $uncertain = false, public readonly string $reason = 'smtp_delivery') { parent::__construct('delivery_failure'); }
}
final class TrackedSMTP extends SMTP {
    public bool $dataAttempted = false;
    public function data($msg_data) { $this->dataAttempted = true; return parent::data($msg_data); }
}
final class CommercialInquiry {
    public const BODY_LIMIT = 16384;
    public function __construct(private array $config, private $sendMail, private $sendConfirmation = null) {}
    public static function contract(): array {
        return json_decode(file_get_contents(__DIR__ . '/commercial-contract.json'), true, 512, JSON_THROW_ON_ERROR);
    }
    public static function validate(array $input, ?int $year = null): array {
        $contract = self::contract();
        $operation = $input['operation'] ?? null;
        if (!is_string($operation) || !isset($contract['operations'][$operation])) return [['operation'=>'format'], []];
        $rules = $contract['operations'][$operation];
        $fields = array_merge($contract['common'], $rules['fields']);
        $errors = []; $values = ['operation'=>$operation];
        foreach ($fields as $key=>$rule) {
            $raw = $input[$key] ?? '';
            $value = is_string($raw) ? trim($raw) : '';
            $values[$key] = $value;
            if (!is_string($raw)) $errors[$key] = 'format';
            if (($rule['required'] ?? false) && $value === '') $errors[$key] ??= match($key) { 'phone'=>'phoneRequired','country'=>'country','service'=>'service','aircraftType'=>'aircraftType',default=>'required' };
            if ($key !== 'phone' && $value !== '' && (mb_strlen($value) < ($rule['min'] ?? 0) || mb_strlen($value) > ($rule['max'] ?? 254))) $errors[$key] ??= 'length';
            if (preg_match($key === 'comments' ? '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]/u', is_string($raw) ? $raw : '')) $errors[$key] ??= 'format';
        }
        if (!in_array($values['aircraftType'], $rules['types'], true)) $errors['aircraftType'] ??= 'aircraftType';
        if ($values['country'] !== '' && !preg_match("/^[\\p{L}\\p{M} .,'’()\\-]+$/u", $values['country'])) $errors['country'] ??= 'format';
        if (isset($values['service']) && preg_match('/[<>]/', $values['service'])) $errors['service'] ??= 'format';
        if ($values['name'] !== '' && !preg_match('/^[\p{L}\p{M} \'’\.\-]+$/u', $values['name'])) $errors['name'] ??= 'name';
        if ($values['email'] !== '' && !filter_var($values['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] ??= 'email';
        if ($values['phone'] !== '' && !preg_match('/^[0-9]{10}$/D', $input['phone'])) $errors['phone'] ??= 'phone';
        if (isset($rules['fields']['year']) && $values['year'] !== '' && (!preg_match('/^\d{4}$/', $values['year']) || (int)$values['year'] < 1903 || (int)$values['year'] > ($year ?? (int)gmdate('Y')))) $errors['year'] ??= 'year';
        if (($input['privacyAccepted'] ?? null) !== true) $errors['privacyAccepted'] = 'privacy';
        $values['privacyAccepted'] = ($input['privacyAccepted'] ?? null) === true;
        if (($input['privacyVersion'] ?? '') !== $contract['version']) $errors['privacyAccepted'] = 'privacy';
        return [$errors, $values];
    }
    private static function response(int $status, array $data): array { return [$status, $data]; }
    public function handle(string $method, string $body, array $server): array {
        $fail = fn(int $status, string $code) => self::response($status, ['success'=>false,'received'=>false,'stored'=>false,'delivery'=>'failed','code'=>$code]);
        if ($method !== 'POST') return $fail(405, 'method_not_allowed');
        if (strlen($body) > self::BODY_LIMIT) return $fail(413, 'body_too_large');
        if (strtolower(trim(explode(';', $server['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') return $fail(415, 'content_type');
        $origin = $server['HTTP_ORIGIN'] ?? '';
        $referer = $server['HTTP_REFERER'] ?? '';
        $refererOrigin = '';
        if ($referer !== '') {
            $url = parse_url($referer);
            $refererOrigin = ($url['scheme'] ?? '') . '://' . ($url['host'] ?? '') . (isset($url['port']) ? ':' . $url['port'] : '');
        }
        $allowed = $this->config['origins'] ?? [];
        if (!$allowed || ($origin !== '' && !in_array($origin, $allowed, true)) || ($refererOrigin !== '' && !in_array($refererOrigin, $allowed, true)) || ($server['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site') return $fail(403, 'origin');
        try { $input = json_decode($body, true, 32, JSON_THROW_ON_ERROR); } catch (\Throwable) { return $fail(400, 'invalid_json'); }
        if (!is_array($input) || array_is_list($input)) return $fail(400, 'invalid_json');
        if (!is_string($input['website'] ?? '') || trim($input['website'] ?? '') !== '') return $fail(403, 'spam');
        $requestId = $input['requestId'] ?? '';
        if (!is_string($requestId) || !preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i', $requestId)) return $fail(422, 'invalid_request_id');
        [$errors, $values] = self::validate($input);
        if ($errors) return self::response(422, ['success'=>false,'received'=>false,'stored'=>false,'delivery'=>'failed','errors'=>$errors,'code'=>'validation']);
        if (!isset($this->config['secret'], $this->config['stateDir']) || strlen($this->config['secret']) < 32) return $fail(503, 'configuration');
        $dir = $this->config['stateDir'];
        if (!is_dir($dir) || !is_writable($dir) || is_link($dir) || (fileperms($dir) & 0077) !== 0) return $fail(503, 'configuration');
        $realDir = realpath($dir); $documentRoot = realpath($server['DOCUMENT_ROOT'] ?? '/nonexistent');
        if ($documentRoot && ($realDir === $documentRoot || str_starts_with($realDir, $documentRoot . DIRECTORY_SEPARATOR))) return $fail(503, 'configuration');
        $secret = $this->config['secret'];
        $fingerprint = hash_hmac('sha256', json_encode($values, JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR), $secret);
        $requestKey = hash_hmac('sha256', strtolower($requestId), $secret);
        $path = $dir . '/request-' . $requestKey . '.json';
        $newRequest = !is_file($path);
        if ($newRequest && !$this->rateAllowed($server['REMOTE_ADDR'] ?? 'unknown')) return $fail(429, 'rate_limit');
        $file = fopen($path, 'c+');
        if (!$file) return $fail(503, 'storage');
        chmod($path, 0600);
        if (!flock($file, LOCK_EX|LOCK_NB)) { fclose($file); return $fail(409, 'in_progress'); }
        try {
            $previous = stream_get_contents($file);
            $record = $previous !== '' ? json_decode($previous, true, 32, JSON_THROW_ON_ERROR) : [];
            if ($record && !hash_equals($record['fingerprint'], $fingerprint)) return $fail(409, 'request_conflict');
            $folio = self::folio($requestId);
            $receipt = ['success'=>true,'received'=>true,'stored'=>false,'delivery'=>'sent','requestId'=>$requestId,'folio'=>$folio];
            if (($record['state'] ?? '') === 'sent') return self::response(200, $receipt + ['clientConfirmation'=>$record['clientConfirmation'] ?? 'unknown']);
            if (in_array($record['state'] ?? '', ['sending','unknown'], true)) return $fail(409, 'delivery_unknown');
            if (!$newRequest && !$this->rateAllowed($server['REMOTE_ADDR'] ?? 'unknown')) return $fail(429, 'rate_limit');
            $record = ['fingerprint'=>$fingerprint,'state'=>'sending','receivedAt'=>gmdate('c'),'operation'=>$values['operation'],'privacyAccepted'=>true,'privacyVersion'=>self::contract()['version']];
            self::writeRecord($file, $record);
            try {
                if (($this->sendMail)($values, $requestId, $record['receivedAt']) === false) throw new DeliveryFailure(false);
            } catch (DeliveryFailure $error) {
                $record['state'] = $error->uncertain ? 'unknown' : 'failed'; self::writeRecord($file, $record);
                error_log('commercial_inquiry ' . $error->reason . ' id=' . $requestId);
                $configuration = in_array($error->reason, ['smtp_configuration','phpmailer_missing'], true);
                return $fail($error->uncertain ? 409 : ($configuration ? 503 : 502), $error->uncertain ? 'delivery_unknown' : ($configuration ? 'configuration' : 'delivery_failed'));
            } catch (\Throwable) {
                $record['state'] = 'unknown'; self::writeRecord($file, $record);
                error_log('commercial_inquiry delivery_unknown id=' . $requestId);
                return $fail(409, 'delivery_unknown');
            }
            // Commit internal receipt before attempting the optional client email.
            // A confirmation failure must never resend the commercial request.
            $record['state']='sent'; $record['folio']=$folio;
            $record['clientConfirmation']=$this->sendConfirmation ? 'unknown' : 'not_configured';
            self::writeRecord($file, $record);
            if ($this->sendConfirmation) {
                try {
                    ($this->sendConfirmation)($values, $requestId, $record['receivedAt'], $input['locale'] ?? 'es');
                    $record['clientConfirmation']='sent';
                } catch (\Throwable) {
                    $record['clientConfirmation']='failed';
                    error_log('commercial_inquiry confirmation_failure id=' . $requestId);
                }
                self::writeRecord($file, $record);
            }
            return self::response(200, $receipt + ['clientConfirmation'=>$record['clientConfirmation']]);
        } finally { flock($file, LOCK_UN); fclose($file); }
    }
    private static function writeRecord($file, array $record): void {
        $data = json_encode($record, JSON_THROW_ON_ERROR);
        rewind($file);
        if (!ftruncate($file, 0) || fwrite($file, $data) !== strlen($data) || !fflush($file)) throw new \RuntimeException('state_write_failed');
        if (function_exists('fsync') && !fsync($file)) throw new \RuntimeException('state_sync_failed');
    }
    private function rateAllowed(string $address): bool {
        $path = $this->config['stateDir'] . '/rate-' . hash_hmac('sha256', $address, $this->config['secret']) . '.json';
        $file = fopen($path, 'c+'); if (!$file) return false;
        chmod($path, 0600);
        if (!flock($file, LOCK_EX)) { fclose($file); return false; }
        try {
            $raw = stream_get_contents($file);
            $times = $raw ? json_decode($raw, true, 32, JSON_THROW_ON_ERROR) : [];
            $times = array_values(array_filter($times, fn($timestamp)=>$timestamp > time()-900));
            if (count($times) >= ($this->config['rateLimit'] ?? 5)) return false;
            $times[] = time(); self::writeRecord($file, $times); return true;
        } finally { flock($file, LOCK_UN); fclose($file); }
    }
    public static function message(array $values, string $id, string $receivedAt): array {
        $titles = ['buy'=>'Compra de aeronave','sell'=>'Venta de aeronave','aircraft_management'=>'Administración de aeronave','technical_service'=>'Servicio técnico'];
        $labels = ['name'=>'Nombre','email'=>'Correo','phone'=>'Teléfono','country'=>'País de ubicación','aircraftType'=>'Tipo de aeronave','manufacturer'=>'Fabricante','model'=>'Modelo de interés','year'=>'Año','service'=>'Servicio requerido','comments'=>'Comentarios'];
        $rows = ''; $plain = ['Folio: ' . self::folio($id)];
        foreach (array_merge(['requestId'=>$id,'receivedAt'=>$receivedAt], $values) as $key=>$value) {
            if (!isset($labels[$key]) && !in_array($key,['requestId','receivedAt'],true)) continue;
            if ($value === '') continue;
            $label = $labels[$key] ?? ($key === 'requestId' ? 'Solicitud' : 'Recepción UTC');
            $safe = htmlspecialchars((string)$value, ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8');
            $rows .= '<tr><th align="left" style="padding:12px;border-bottom:1px solid #dce2e8">'.$label.'</th><td style="padding:12px;border-bottom:1px solid #dce2e8">'.nl2br($safe).'</td></tr>';
            $plain[] = $label . ': ' . $value;
        }
        $consent = 'Aviso de privacidad aceptado. Versión: ' . self::contract()['version'] . '. Fecha UTC: ' . $receivedAt;
        return ['subject'=>'Nueva solicitud — '.$titles[$values['operation']], 'html'=>'<!doctype html><html lang="es"><body style="margin:0;background:#f4f6f8;font:14px Arial;color:#071b30"><div style="max-width:680px;margin:auto"><header style="background:#071b30;color:#d8b47d;padding:30px">SKY GROUP LLC<p>Folio: '.self::folio($id).'</p><h1 style="color:white;font-size:24px">'.$titles[$values['operation']].'</h1></header><table style="width:100%;border-collapse:collapse;background:white">'.$rows.'</table><p style="padding:20px;color:#526171">'.$consent.'</p></div></body></html>', 'text'=>implode("\n", $plain)."\n".$consent];
    }
    public static function folio(string $id): string {
        return 'SKY-' . strtoupper(str_replace('-', '', $id));
    }
    public static function checkSmtpConfiguration(array $smtp): void {
        $missing = [];
        foreach (['host','username','password','from','recipient','encryption','port'] as $key) if (empty($smtp[$key])) $missing[] = $key;
        if ($missing) {
            // Only fixed field names; never print values or PHPMailer ErrorInfo.
            error_log('commercial_inquiry smtp_configuration_missing fields=' . implode(',', $missing));
            throw new DeliveryFailure(false, 'smtp_configuration');
        }
        foreach (['host','username','password','from','recipient'] as $key) {
            if (preg_match('/^(?:CHANGE_ME|CHANGEME|REPLACE_ME|YOUR_PASSWORD|SMTP_PASSWORD|TU_CONTRASEÑA|PON_AQUI_LA_CONTRASEÑA|<[^>]+>)$/iu', trim((string)$smtp[$key]))) {
                error_log('commercial_inquiry smtp_configuration_placeholder field=' . $key);
                throw new DeliveryFailure(false, 'smtp_configuration');
            }
        }
        if (!filter_var($smtp['from'], FILTER_VALIDATE_EMAIL) || !filter_var($smtp['recipient'], FILTER_VALIDATE_EMAIL) ||
            !in_array($smtp['encryption'], ['tls','ssl'], true) || !ctype_digit((string)$smtp['port']) || (int)$smtp['port'] < 1 || (int)$smtp['port'] > 65535) {
            error_log('commercial_inquiry smtp_configuration_invalid');
            throw new DeliveryFailure(false, 'smtp_configuration');
        }
    }
    public static function confirmationSender(array $smtp): \Closure {
        return static function(array $values, string $id, string $receivedAt, string $locale) use ($smtp): void {
            $english = $locale === 'en';
            $mail = new PHPMailer(true);
            $mail->isSMTP(); $mail->Host=$smtp['host']; $mail->SMTPAuth=true;
            $mail->Username=$smtp['username']; $mail->Password=$smtp['password'];
            $mail->Port=(int)$smtp['port']; $mail->SMTPSecure=$smtp['encryption'];
            $mail->Timeout=20; $mail->Timelimit=25; $mail->SMTPDebug=0; $mail->CharSet='UTF-8';
            $mail->setFrom($smtp['from'],'Sky Group LLC');
            // Only this acknowledgment goes to the validated contact email.
            // The internal recipient remains fixed by SMTP configuration.
            $mail->addAddress($values['email'], $values['name']);
            $mail->Subject=($english ? 'Request received — ' : 'Solicitud recibida — ') . self::folio($id);
            $text=$english ? 'Your request was received successfully. An advisor will contact you shortly.' : 'Solicitud recibida correctamente. Un asesor se pondrá en contacto contigo a la brevedad.';
            $safeName=htmlspecialchars($values['name'], ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8');
            $mail->isHTML(true);
            $mail->Body='<html><body style="font-family:Arial;color:#071b30"><h1>Sky Group LLC</h1><p>'.$safeName.'</p><p>'.$text.'</p><p>'.self::folio($id).'</p></body></html>';
            $mail->AltBody=$text . "\n" . self::folio($id);
            $mail->send();
        };
    }
    public static function smtpSender(array $smtp): \Closure {
        return static function(array $values, string $id, string $receivedAt) use ($smtp): void {
            self::checkSmtpConfiguration($smtp);
            if (!class_exists(PHPMailer::class)) throw new DeliveryFailure(false, 'phpmailer_missing');
            $message = self::message($values,$id,$receivedAt);
            $mail = new PHPMailer(true); $transport = new TrackedSMTP(); $mail->setSMTPInstance($transport);
            try {
                $mail->isSMTP(); $mail->Host=$smtp['host']; $mail->SMTPAuth=true;
                $mail->Username=$smtp['username']; $mail->Password=$smtp['password'];
                $mail->Port=(int)$smtp['port']; $mail->SMTPSecure=$smtp['encryption'];
                $mail->Timeout=20; $mail->Timelimit=25; $mail->SMTPDebug=0; $mail->CharSet='UTF-8';
                $mail->setFrom($smtp['from'],'Sky Group LLC'); $mail->addAddress($smtp['recipient']);
                $mail->addReplyTo($values['email'],$values['name']);
                $mail->Subject=$message['subject']; $mail->isHTML(true); $mail->Body=$message['html']; $mail->AltBody=$message['text'];
                $mail->send();
            } catch (\Throwable) {
                $reply = $transport->getLastReply();
                $rejected = preg_match('/^[45]\d\d/', $reply) === 1;
                $smtpError = $transport->getError();
                $errorCode = (string)($smtpError['smtp_code'] ?? '');
                $reason = in_array($errorCode, ['534','535'], true) ? 'smtp_authentication' : (!$transport->connected() && !$transport->dataAttempted ? 'smtp_connection' : 'smtp_delivery');
                throw new DeliveryFailure($transport->dataAttempted && !$rejected, $reason);
            }
        };
    }
}
