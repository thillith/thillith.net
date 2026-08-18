<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require __DIR__ . '/../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "../../");
$dotenv->load();

$WALLET_ID = $_ENV["WALLET_ID"];

$url = "https://api.moneroocean.stream/miner/" . urlencode($WALLET_ID) . "/stats/allWorkers";

$response = file_get_contents($url);

if ($response === false) {
    echo json_encode(["error" => "Failed to fetch data"]);
    exit;
}

$data = json_decode($response, true);
$response = array_intersect_key($data["global"], array_flip(["hash2", "totalHash", "validShares"]));
echo json_encode($response);
