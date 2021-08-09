<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$item = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "INSERT INTO Songs values (?,?,?,?,?,?,?,?,?,?,?)");
mysqli_stmt_bind_param($stmt, "sdddddddddd", $item->uri, $item->key, $item->valence, $item->energy, $item->tempo, $item->liveness, $item->danceability, $item->loudness, $item->speechiness, $item->acousticness, $item->instrumentalness);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);   
?>
