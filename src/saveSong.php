<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

$item = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "INSERT INTO Songs values (?,?,?,?,?,?,?,?,?,?,?)");
mysqli_stmt_bind_param($stmt, "sdddddddddd", $item->uri, $item->key, $item->valence, $item->energy, $item->tempo, $item->liveness, $item->danceability, $item->loudness, $item->speechiness, $item->acousticness, $item->instrumentalness);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);   
?>
