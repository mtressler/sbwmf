const http = require('http')
const fs = require('fs')
const mime = require('mime-types')
const port = 55000;
const mysql = require('mysql2')
const processData = require('./processData')

var DEBUG = true;

const mysqlCon = mysql.createConnection({
    host: "192.168.4.44",
    user: "sbwmf",
    password: "sbwmf",
    database: "sbwmf"
})

mysqlCon.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql database!")
})

const server = http.createServer(function(req, res) {
    if (DEBUG)
        console.log(req.method + ', ' + req.url)
    if (req.method == 'POST') {
        if (DEBUG)
            console.log("Processing POST request")
        body = '';
        req.on('data', function(data){
            body += data;
            if (body.length > 1e6) {
                console.error("Too much data!")
                res.writeHead(507);
                res.write("Too much data in POST payload")
                res.end();
                return;
            }
        })
        req.on('end', function () {
            try {
                if (DEBUG) {
                    process.stdout.write('POST Data: ')
                    console.log(JSON.parse(body))
                }
            } catch (e) {
                console.error(e.message);
            }

            processData.processPOST(req, JSON.parse(body), mysqlCon).then((prom) => {
                if (prom.err) {
                    console.log(prom.err)
                    if (prom.err.code == 'ER_DUP_ENTRY')
                        res.writeHead(201);
                    else
                        res.writeHead(400)
                    res.write(JSON.stringify(prom.err))
                    res.end();
                } else {
                    res.writeHead(201);
                    res.write(JSON.stringify(prom.txt))
                    res.end();
                }
            })
        })

        return;
    }

    res.writeHead(200, { 'Content-Type': mime.lookup('src' + req.url) })
    
    fs.readFile('src' + req.url, function(error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else {
            res.write(data)
        }
        res.end()
    })
})

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})