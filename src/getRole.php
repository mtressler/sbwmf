<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "SELECT role from AccessQueue WHERE User_id=? and Queue_id=?");
mysqli_stmt_bind_param($stmt, "si", $data->userId, $data->queueId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row = $result->fetch_array(MYSQLI_NUM);
var_dump($row[0]);
mysqli_stmt_close($stmt);

?>