<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode($_POST['data'], false);
$items = $data->items;
var_dump($items);

foreach ($items as $item) {
    $stmt = mysqli_prepare($link, "INSERT INTO Playlists values (?,?,?,?,?,?,?)");
    mysqli_stmt_bind_param($stmt, "ssiisss", $item->uri, $item->description, $item->tracks->total, $item->collaborative, $item->name, $item->owner->id, $item->images[0]->url);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);   
}

?>
