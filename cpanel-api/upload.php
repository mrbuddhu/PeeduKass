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

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];
$allowedTypes = ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'zip', 'mp3', 'wav', 'm4a', 'ogg', 'aac'];
$maxSize = 500 * 1024 * 1024; // 500MB

// Check file size
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large']);
    exit;
}

// Check file extension
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($extension, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'File type not allowed']);
    exit;
}

// Create uploads directory if it doesn't exist
$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Generate unique filename
$filename = time() . '-' . preg_replace('/[^a-zA-Z0-9._-]/', '', $file['name']);
$filepath = $uploadDir . $filename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $filepath)) {
    $publicUrl = 'https://peedukass.com/uploads/' . $filename;
    echo json_encode([
        'success' => true,
        'url' => $publicUrl,
        'filename' => $filename
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
}
?>
