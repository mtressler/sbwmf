<?php
$link = mysqli_connect('localhost', 'jstrong5', '@Rtkuedx01') or die('Dead');
mysqli_select_db($link, 'jstrong5');

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
