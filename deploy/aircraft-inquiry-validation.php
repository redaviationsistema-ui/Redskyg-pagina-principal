<?php
/** Compatibility include. The complete receiver is public/aircraft-inquiry.php.
 * Validation uses the same contract as the four Vue forms; no second rule set.
 */
declare(strict_types=1);
require_once __DIR__.'/../server/php/vendor/autoload.php';
require_once __DIR__.'/../server/php/CommercialInquiry.php';
function validateInitialAviationInquiry(array $input): array {
    [$errors,$values]=SkyGroup\CommercialInquiry::validate($input);
    if($errors)throw new InvalidArgumentException('Solicitud inválida.');
    return $values;
}
