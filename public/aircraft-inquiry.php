<?php
declare(strict_types=1);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$result = ['success'=>false,'received'=>false,'stored'=>false,'delivery'=>'failed','code'=>'unavailable'];
$status = 503;
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST'); $status=405; $result['code']='method_not_allowed';
} elseif ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) {
    $status=413; $result['code']='body_too_large';
} else {
    try {
        $bootstrap = getenv('SKY_INQUIRY_BOOTSTRAP') ?: dirname(__DIR__) . '/server/php/bootstrap.php';
        if (is_file($bootstrap)) {
            $handler = require $bootstrap;
            $stream = fopen('php://input','rb'); $body = stream_get_contents($stream,16385); fclose($stream);
            [$status,$result] = $handler->handle('POST',$body,$_SERVER);
        } else { error_log('commercial_inquiry bootstrap_missing'); }
    } catch (Throwable) { error_log('commercial_inquiry internal_failure'); }
}
http_response_code($status);
echo json_encode($result, JSON_UNESCAPED_UNICODE|JSON_INVALID_UTF8_SUBSTITUTE);
