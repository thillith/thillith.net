<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "../../");
$dotenv->load();

$WALLET_ID = $_ENV["WALLET_ID"];

$url = "https://api.moneroocean.stream/miner/" . urlencode($WALLET_ID) . "/chart/hashrate";

$response = file_get_contents($url);

echo json_encode($response);
