<?php
/**
 * Прокси для публичной веб-версии телеграм-канала.
 * Сервер сам ходит на t.me/s/ParfunA и отдаёт HTML фронтенду —
 * чтобы не зависеть от зарубежных CORS-прокси, которые в РФ нестабильны.
 *
 * Кэширует ответ на 5 минут, чтобы не дёргать Telegram на каждый заход.
 */

header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=300');

$channel   = 'ParfunA';
$targetUrl = 'https://t.me/s/' . $channel;

$cacheFile = sys_get_temp_dir() . '/tg_cache_' . $channel . '.html';
$cacheTtl  = 300; // 5 минут

if (is_readable($cacheFile) && (time() - filemtime($cacheFile) < $cacheTtl)) {
    $cached = file_get_contents($cacheFile);
    if ($cached !== false && strlen($cached) > 0) {
        echo $cached;
        exit;
    }
}

$html = '';
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $targetUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        CURLOPT_HTTPHEADER     => ['Accept-Language: ru,en;q=0.9'],
    ]);
    $html = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($html === false || $httpCode !== 200) {
        $html = '';
    }
}

if (!$html && ini_get('allow_url_fopen')) {
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'header'  => "User-Agent: Mozilla/5.0\r\nAccept-Language: ru,en;q=0.9\r\n",
        ],
        'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
    ]);
    $fetched = @file_get_contents($targetUrl, false, $context);
    if ($fetched !== false) {
        $html = $fetched;
    }
}

if ($html) {
    @file_put_contents($cacheFile, $html);
    echo $html;
} else {
    http_response_code(502);
    echo '';
}
