<?php

require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "../../");
$dotenv->load();


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$LASTFMAPI = $_ENV["LASTFMAPI"];

//$user = "thillith";
$user = $_GET['user'] ?? '';

if (!$user) {
    echo json_encode(["error" => "Missing user"]);
    exit;
}

$url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" . urlencode($user) . "&api_key={$LASTFMAPI}&format=json";

$response = file_get_contents($url);

if ($response === false) {
    echo json_encode(["error" => "Failed to fetch data"]);
    exit;
}

echo $response;
