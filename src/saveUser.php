<?php

var_dump("Test");

$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "INSERT INTO Users values (?,?)");
mysqli_stmt_bind_param($stmt, "ss", $data->User_id, $data->user_uri);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);   


?>