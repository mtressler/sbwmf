<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "UPDATE AccessQueue SET role=? WHERE User_id=? and Queue_id=?");
mysqli_stmt_bind_param($stmt, "ssi", $data->role, $data->userId, $data->queueId);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

?>