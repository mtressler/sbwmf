<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com
', 'admin', '0TZ9yw$IJ^5s') or die('Dead');
mysqli_select_db($link, 'sbwmf');

$data = json_decode($_POST['data'], false);

$stmt = mysqli_prepare($link, "INSERT INTO Queues (User_id, name) values (?,?)");
mysqli_stmt_bind_param($stmt, "ss", $data->userId, $data->queueName);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

$stmt = mysqli_prepare($link, "select Queue_id from Queues where User_id=? order by Queue_id DESC limit 1");
mysqli_stmt_bind_param($stmt, "s", $data->userId);
mysqli_stmt_execute($stmt);
$results = mysqli_stmt_get_result($stmt); 

while ($tuple = $results->fetch_array(MYSQLI_ASSOC)) {
    foreach ($tuple as $val) {
        echo $val;
    }
}
mysqli_stmt_close($stmt);


?>