var connect = require('connect'),
    mime = require('mime'),
    http = require('http'),
    app;

mime.define({'text/cache-manifest': ['manifest']});

app = connect().use(connect.static('app'));

http.createServer(app).listen(8080, function(){
    console.log('Running on http://localhost:8080');
});

