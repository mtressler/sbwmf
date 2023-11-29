var DEBUG = true;

module.exports = {
    processPOST: function(req, body, mysqlCon) {
        let prom;
        switch (req.url.substring(1)) {
            case 'saveUser':  
                prom = saveUser(body, mysqlCon)
                break
            case 'saveSongs':
                prom = saveSongs(body, mysqlCon)
                break
            case 'libQuery':
                prom = libQuery(body, mysqlCon)
                break
            default:
                console.warn("No function matches for GET request url \'" + req.url.substring(1) + "\'")
        }
        return prom;
    }
}

function saveUser(body, mysqlCon) {
    return new Promise((resolve) => {
        mysqlCon.query(
            'INSERT INTO users VALUES (?,?)',
            [body.user_id, body.user_uri],
            function(err) {
                if (err) {
                    if (DEBUG)
                        console.error(err)
                        resolve({'err': err, 'fields': null, 'results': null, 'txt': null})
                } else {
                    resolve({'err': err, 'fields': null, 'results': null, 'txt': null})
                }
            }
        );
    });
}

function saveSongs(b, mysqlCon) {
    var values = Array();
    b.forEach(el => {
        values.push([el.uri, el.name, el.artists, el.duration_ms, el.popularity, el.track_num, el.s_key, el.time_signature, el.valence, el.energy, el.tempo, el.liveness, el.danceability, el.loudness, el.speechiness, el.acousticness, el.instrumentalness])
    });

    return new Promise((resolve) => {
        mysqlCon.query(
            'INSERT INTO songs VALUES ?',
            [values],
            function(err) {
                if (err) {
                    if (DEBUG)
                        console.error(err)
                        resolve({'err': err, 'fields': null, 'results': null, 'txt': null})
                } else {
                    resolve({'err': err, 'fields': null, 'results': null, 'txt': null})
                }
            }
        );
    })
}

function libQuery(body, mysqlCon) {
    return new Promise((resolve) => {
        mysqlCon.query(
            body.query,
            function(err, results, fields) {
                if (err && DEBUG)
                    console.error(err)
                // Format results as html to be returned to client
                var txt = "<table class='table'><thead><tr><th scope='col'>#</th>"
                var index = 0
                var img_index = -1
                body.headers.forEach((h) => {
                    txt += "<th scope='col'>" + h + "</th>"
                    if (h == 'Image')
                        img_index = index
                    index += 1
                })
                txt += "</tr></thead><tbody>"
                var row = 0
                results.forEach((r) => {
                    row += 1
                    col = 0
                    txt += "<tr><th scope='row'>" + row + "</th>"
                    console.log(r)
                    for (const [key, value] of Object.entries(r)) {
                        if (col == img_index)
                            txt += "<td><img src='" + value + "' alt='image file' style='height: 5em; width: 5em;'></td>"
                        else
                            txt += "<td>" + value + "</td>"
                        col += 1
                    }
                })
                txt += "</tr>"

                resolve({'err': err, 'fields': fields, 'results': results, 'txt': txt})
            }
        );
    })
}

/*
    mysqlCon.query(
        'SELECT * FROM `test_table`',
        function(err, results, fields) {
            console.log(fields);
            console.log(results);
            console.log(err)
        }
    );
*/

