<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "INSERT INTO AccessQueue values (?,?,?)");
mysqli_stmt_bind_param($stmt, "sis", $data->userId, $data->queueId, $data->role);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

?>