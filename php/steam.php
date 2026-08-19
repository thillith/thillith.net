<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "../../");
$dotenv->load();

$STEAM_KEY = $_ENV["STEAM_KEY"];
$STEAM_ID = $_ENV["STEAM_ID"];

$url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" . urlencode($STEAM_KEY) . "&steamids=" . urldecode($STEAM_ID);

$response = file_get_contents($url);

if ($response === false) {
    echo json_encode(["error" => "Failed to fetch data"]);
    exit;
};

echo $response;
