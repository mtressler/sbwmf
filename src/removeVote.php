<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "DELETE from Enqueue where Queue_id=? and User_id=? and song_uri=?");
mysqli_stmt_bind_param($stmt, "iss", $data->queueId, $data->userId, $data->uri);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

?>