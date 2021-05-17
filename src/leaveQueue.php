<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

$data = json_decode($_POST['data'], false);

$stmt2 = mysqli_prepare($link, "DELETE from AccessQueue WHERE Queue_id=? and User_id=?");
mysqli_stmt_bind_param($stmt2, "i", $data);
mysqli_stmt_execute($stmt2);
mysqli_stmt_close($stmt2);

?>