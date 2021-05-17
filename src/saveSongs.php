<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

$data = json_decode($_POST['data'], false);
$items = $data->audio_features;
var_dump($items);

foreach ($items as $item) {
    $stmt = mysqli_prepare($link, "INSERT INTO Songs values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    mysqli_stmt_bind_param($stmt, "sssiiidddddddddd", $item->uri, $item->name, $item->artists, $item->duration_ms, $item->popularity, $item->track_num, $item->key, $item->valence, $item->energy, $item->tempo, $item->liveness, $item->danceability, $item->loudness, $item->speechiness, $item->acousticness, $item->instrumentalness);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);   
}

?>
