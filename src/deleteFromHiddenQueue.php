<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com
', 'admin', '0TZ9yw$IJ^5s') or die('Dead');
mysqli_select_db($link, 'sbwmf');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "DELETE from HiddenQueue WHERE queueId=?");
mysqli_stmt_bind_param($stmt, "i", $data->queueId);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

?>