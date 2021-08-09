<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode($_POST['data'], false);

$stmt2 = mysqli_prepare($link, "DELETE from AccessQueue WHERE Queue_id=? and User_id=?");
mysqli_stmt_bind_param($stmt2, "i", $data);
mysqli_stmt_execute($stmt2);
mysqli_stmt_close($stmt2);

?>