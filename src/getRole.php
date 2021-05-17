<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "SELECT role from AccessQueue WHERE User_id=? and Queue_id=?");
mysqli_stmt_bind_param($stmt, "si", $data->userId, $data->queueId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row = $result->fetch_array(MYSQLI_NUM);
var_dump($row[0]);
mysqli_stmt_close($stmt);

?>