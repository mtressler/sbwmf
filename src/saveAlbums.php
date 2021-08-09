<?php
$link = mysqli_connect('sbwmf.cfn7ax1bfjco.us-east-2.rds.amazonaws.com', 'admin', '0TZ9yw$IJ^5s', 'sbwmf', '3306');
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode($_POST['data'], false);
$items = $data->items;

$uris = "";
$count = 0;

foreach ($items as $i) {

    $item = $i->album;

    date_default_timezone_set("America/Indiana/Indianapolis");
    $date = new DateTime($item->release_date);
    $dt=$date->format('Y-m-d');

    $artists = "";
    $first = true;
    foreach ($item->artists as $artist) {
        if ($first)
            $first = false;
        else
            $artists .= ", ";
        $artists .= $artist->name;
    }

    $genres = "";
    foreach ($item->genres as $genre) {
        $genres .= $genre->name;
    }

    /*
    var_dump($artists);
    var_dump($item->uri);
    var_dump($item->name);
    var_dump($item->popularity);
    var_dump($dt);
    var_dump($genres);
    var_dump($item->images[1]->url);
     */

    $count += 1;
    $uris .= "&";
    $uris .= $item->uri;

    $stmt = mysqli_prepare($link, "INSERT INTO Albums values (?,?,?,?,?,?,?)");
    mysqli_stmt_bind_param($stmt, "sssisss", $item->uri, $item->name, $artists, $item->popularity, $dt, $genres, $item->images[2]->url);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);   
}

$out = "";
$out .= $count;
$out .= $uris;
echo $out;

?>
