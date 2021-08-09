<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com
', 'admin', '0TZ9yw$IJ^5s') or die('Dead');
mysqli_select_db($link, 'sbwmf');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "DELETE from HiddenQueue WHERE queueId=?");
mysqli_stmt_bind_param($stmt, "i", $data);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

$stmt2 = mysqli_prepare($link, "DELETE from AccessQueue WHERE Queue_id=?");
mysqli_stmt_bind_param($stmt2, "i", $data);
mysqli_stmt_execute($stmt2);
mysqli_stmt_close($stmt2);

$stmt3 = mysqli_prepare($link, "DELETE from Queues WHERE Queue_id=?");
mysqli_stmt_bind_param($stmt3, "i", $data);
mysqli_stmt_execute($stmt3);
mysqli_stmt_close($stmt3);

$stmt4 = mysqli_prepare($link, "DELETE from Enqueue WHERE Queue_id=?");
mysqli_stmt_bind_param($stmt4, "i", $data);
mysqli_stmt_execute($stmt4);
mysqli_stmt_close($stmt4);

?>