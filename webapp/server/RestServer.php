<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $str_json = file_get_contents('php://input');
    $memberChanged = json_decode($str_json, true);

    $file = "../Members.json";

    $string = file_get_contents($file);
    $json = json_decode($string, true);
    $members = $json['Members'];

    foreach ($members as &$member) {
        if ($member['Name'] == $memberChanged['Name']) {
            $member['Comment'] = $memberChanged['Comment'];
            $member['ArrivalTime'] = $memberChanged['ArrivalTime'];
            $member['LeaveTime'] = $memberChanged['LeaveTime'];
            $member['isGoing'] = $memberChanged['isGoing'];
            $member['isThere'] = $memberChanged['isThere'];
        }
    }

    $json['Members'] = $members;
    file_put_contents($file, json_encode($json, JSON_PRETTY_PRINT));
}
?>
