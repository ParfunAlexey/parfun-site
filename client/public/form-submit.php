<?php
/**
 * Обработчик формы заявки.
 * Принимает имя + контакт, отправляет на pr@parfun.ru (российский сервер reg.ru).
 * Данные не сохраняются на сторонних сервисах — только письмо на почту в РФ.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Читаем JSON-тело
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$name    = isset($input['name'])    ? trim($input['name'])    : '';
$contact = isset($input['contact']) ? trim($input['contact']) : '';
$consent = !empty($input['consent']);
$honey   = isset($input['website']) ? trim($input['website']) : ''; // honeypot

// Honeypot: если бот заполнил скрытое поле — молча "успех", письмо не шлём
if ($honey !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

// Валидация
$errors = [];
if (mb_strlen($name) < 2) {
    $errors[] = 'Укажите имя';
}
if (mb_strlen($contact) < 3) {
    $errors[] = 'Укажите телефон или email для связи';
}
if (!$consent) {
    $errors[] = 'Необходимо согласие на обработку персональных данных';
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode('. ', $errors)]);
    exit;
}

// Чистим значения для письма
$nameSafe    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$contactSafe = htmlspecialchars($contact, ENT_QUOTES, 'UTF-8');
$ip          = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$time        = date('Y-m-d H:i:s');

$to      = 'pr@parfun.ru';
$subject = 'Заявка с сайта parfun.ru';

$body  = "Новая заявка с сайта parfun.ru\n\n";
$body .= "Имя: {$nameSafe}\n";
$body .= "Контакт: {$contactSafe}\n";
$body .= "Согласие на обработку ПДн: да\n";
$body .= "Время: {$time}\n";
$body .= "IP: {$ip}\n";

// Заголовки. From — на своём домене, чтобы письмо не попало в спам.
$headers  = "From: Сайт parfun.ru <noreply@parfun.ru>\r\n";
$headers .= "Reply-To: {$contactSafe}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Не удалось отправить заявку. Попробуйте написать напрямую.']);
}
