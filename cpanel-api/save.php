<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Secret');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// For debugging 500s, uncomment the next two lines temporarily
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Simple auth check - try header, then query, then body
$adminSecret = isset($_SERVER['HTTP_X_ADMIN_SECRET']) ? $_SERVER['HTTP_X_ADMIN_SECRET'] : '';
$expectedSecret = 'peedukass-admin-2024';

// If no header, try to get from body
if (empty($adminSecret)) {
    $input = json_decode(file_get_contents('php://input'), true);
    $adminSecret = isset($input['secret']) ? $input['secret'] : '';
}

// If still empty, try query string
if (empty($adminSecret) && isset($_GET['secret'])) {
    $adminSecret = $_GET['secret'];
}

if ($adminSecret !== $expectedSecret) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get input (already decoded above if no header auth)
if (!isset($input)) {
    $input = json_decode(file_get_contents('php://input'), true);
}

if (!$input || !isset($input['path']) || !isset($input['contents'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$relPath = $input['path'];
$contents = $input['contents'];

// Base content directory (../content relative to this file)
$baseDir = realpath(__DIR__ . '/../');
if ($baseDir === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Base path resolution failed']);
    exit;
}

$contentDir = $baseDir . '/content';
if (!is_dir($contentDir)) {
    if (!mkdir($contentDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create content directory']);
        exit;
    }
}

// Normalize and validate the requested relative path
$safeRel = '/' . ltrim($relPath, '/');
if (strpos($safeRel, '..') !== false) {
    http_response_code(403);
    echo json_encode(['error' => 'Path traversal not allowed']);
    exit;
}

$targetPath = $contentDir . $safeRel;
$targetDir = dirname($targetPath);
if (!is_dir($targetDir)) {
    if (!mkdir($targetDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create target directory']);
        exit;
    }
}

// Write file
$bytes = @file_put_contents($targetPath, $contents);
if ($bytes !== false) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
}
?>
