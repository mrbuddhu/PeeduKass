<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Secret');

// Simple auth check
$adminSecret = $_SERVER['HTTP_X_ADMIN_SECRET'] ?? '';
$expectedSecret = 'peedukass-admin-2024';

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

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['path']) || !isset($input['contents'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$relPath = $input['path'];
$contents = $input['contents'];

// Security: only allow writing to content directory
$allowedPath = '../content/';
$fullPath = realpath($allowedPath . $relPath);

if (!$fullPath || !str_starts_with($fullPath, realpath($allowedPath))) {
    http_response_code(403);
    echo json_encode(['error' => 'Path not allowed']);
    exit;
}

// Create content directory if it doesn't exist
if (!is_dir($allowedPath)) {
    mkdir($allowedPath, 0755, true);
}

// Write file
if (file_put_contents($fullPath, $contents) !== false) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
}
?>
