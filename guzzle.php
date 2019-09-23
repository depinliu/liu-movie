<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();

    $response = $client->request('GET', 'http://omdbapi.com', [
        'query' => [
            'apikey' => 'a7460f96',
            's' => 'transformers'
        ]
    ]);

    $result = json_decode($response->getBody()->getContents(), true);
    

?>
