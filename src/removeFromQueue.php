<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "DELETE from Enqueue where Queue_id=? and song_uri=?");
mysqli_stmt_bind_param($stmt, "is", $data->queueId, $data->uri);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

?>