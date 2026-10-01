<?php
declare(strict_types=1);

ini_set('display_errors', '0');

const SITE_URL = 'https://redskyg.com';
const AIRCRAFT_TABLE = 'aircraft_sales';
const CACHE_SECONDS = 300;

header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: public, max-age=' . CACHE_SECONDS);

function xml_escape(string $value): string
{
    return htmlspecialchars($value, ENT_XML1 | ENT_COMPAT, 'UTF-8');
}

function clean_text($value): string
{
    $text = trim((string) ($value ?? ''));
    $invalid = ['undefined', 'null', 'n/d', 'na', 'nan'];

    return $text !== '' && !in_array(strtolower($text), $invalid, true) ? $text : '';
}

function normalize_registration($registration): string
{
    $text = strtolower(clean_text($registration));
    $text = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text) ?: $text;
    $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';

    return trim($text, '-');
}

function load_supabase_config(): array
{
    $configPath = getenv('SITEMAP_SUPABASE_CONFIG') ?: '/home/redskygc/supabase_config.php';

    if (!is_file($configPath)) {
        throw new RuntimeException('Supabase config file not found.');
    }

    $config = require $configPath;

    if (is_array($config)) {
        $url = $config['url'] ?? $config['supabase_url'] ?? $config['SUPABASE_URL'] ?? null;
        $anonKey = $config['anon_key'] ?? $config['supabase_anon_key'] ?? $config['SUPABASE_ANON_KEY'] ?? null;
    } else {
        $url = $GLOBALS['supabase_url'] ?? $GLOBALS['SUPABASE_URL'] ?? null;
        $anonKey = $GLOBALS['supabase_anon_key'] ?? $GLOBALS['SUPABASE_ANON_KEY'] ?? null;
    }

    $url = clean_text($url);
    $anonKey = clean_text($anonKey);

    if ($url === '' || $anonKey === '') {
        throw new RuntimeException('Supabase URL or anon key missing.');
    }

    return [
        'url' => rtrim($url, '/'),
        'anon_key' => $anonKey,
    ];
}

function fetch_active_aircraft(): array
{
    $config = load_supabase_config();
    $endpoint = $config['url'] . '/rest/v1/' . AIRCRAFT_TABLE
        . '?select=registration,updated_at&is_active=eq.true&order=display_order.asc';

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'apikey: ' . $config['anon_key'],
            'Authorization: Bearer ' . $config['anon_key'],
            'Accept: application/json',
        ],
        CURLOPT_TIMEOUT => 12,
    ]);

    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);

    if ($body === false || $status < 200 || $status >= 300) {
        throw new RuntimeException('Supabase request failed. Status: ' . $status . ' Error: ' . $error);
    }

    $data = json_decode((string) $body, true);

    if (!is_array($data)) {
        throw new RuntimeException('Supabase returned invalid JSON.');
    }

    return $data;
}

function parse_static_routes(): array
{
    $source = __DIR__ . '/sitemap-backup.xml';

    if (!is_file($source)) {
        $source = __DIR__ . '/sitemap.xml';
    }

    if (!is_file($source)) {
        return [];
    }

    $xml = simplexml_load_file($source);

    if (!$xml instanceof SimpleXMLElement) {
        throw new RuntimeException('Static sitemap source is not valid XML.');
    }

    $xml->registerXPathNamespace('sm', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    $xml->registerXPathNamespace('xhtml', 'http://www.w3.org/1999/xhtml');
    $routes = [];

    foreach ($xml->xpath('//sm:url') ?: [] as $urlNode) {
        $loc = clean_text((string) $urlNode->loc);

        if ($loc === '' || preg_match('#/aircraft-sales/[^/]+$#', $loc)) {
            continue;
        }

        $links = [];

        foreach ($urlNode->xpath('xhtml:link') ?: [] as $linkNode) {
            $attrs = $linkNode->attributes('http://www.w3.org/1999/xhtml');
            $hreflang = clean_text((string) ($attrs['hreflang'] ?? ''));
            $href = clean_text((string) ($attrs['href'] ?? ''));

            if ($hreflang !== '' && $href !== '') {
                $links[$hreflang] = $href;
            }
        }

        $lastmod = clean_text((string) ($urlNode->lastmod ?? ''));

        $routes[] = [
            'loc' => $loc,
            'links' => $links,
            'lastmod' => $lastmod,
        ];
    }

    return $routes;
}

function aircraft_routes(): array
{
    $routes = [];

    foreach (fetch_active_aircraft() as $aircraft) {
        $slug = normalize_registration($aircraft['registration'] ?? '');

        if ($slug === '') {
            continue;
        }

        $es = SITE_URL . '/mx/aircraft-sales/' . $slug;
        $en = SITE_URL . '/en/aircraft-sales/' . $slug;
        $updatedAt = clean_text($aircraft['updated_at'] ?? '');
        $lastmod = '';

        if ($updatedAt !== '') {
            $timestamp = strtotime($updatedAt);
            $lastmod = $timestamp ? gmdate('Y-m-d', $timestamp) : '';
        }

        $links = [
            'es-MX' => $es,
            'en-US' => $en,
            'x-default' => $es,
        ];

        $routes[] = ['loc' => $es, 'links' => $links, 'lastmod' => $lastmod];
        $routes[] = ['loc' => $en, 'links' => $links, 'lastmod' => $lastmod];
    }

    return $routes;
}

function deduplicate_routes(array $routes): array
{
    $seen = [];
    $deduped = [];

    foreach ($routes as $route) {
        $loc = clean_text($route['loc'] ?? '');

        if ($loc === '' || isset($seen[$loc])) {
            continue;
        }

        $seen[$loc] = true;
        $deduped[] = $route;
    }

    return $deduped;
}

function render_sitemap(array $routes): string
{
    $lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ];

    foreach ($routes as $route) {
        $lines[] = '  <url>';
        $lines[] = '    <loc>' . xml_escape($route['loc']) . '</loc>';

        foreach (($route['links'] ?? []) as $hreflang => $href) {
            $lines[] = '    <xhtml:link rel="alternate" hreflang="' . xml_escape((string) $hreflang) . '" href="' . xml_escape((string) $href) . '" />';
        }

        $lastmod = clean_text($route['lastmod'] ?? '');

        if ($lastmod !== '') {
            $lines[] = '    <lastmod>' . xml_escape($lastmod) . '</lastmod>';
        }

        $lines[] = '  </url>';
    }

    $lines[] = '</urlset>';
    $lines[] = '';

    return implode("\n", $lines);
}

try {
    echo render_sitemap(deduplicate_routes(array_merge(parse_static_routes(), aircraft_routes())));
} catch (Throwable $exception) {
    http_response_code(503);
    error_log('Dynamic sitemap error: ' . $exception->getMessage());
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    echo "<error>Service temporarily unavailable</error>\n";
}
