var express = require("express"),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});
    
app.get("/", function(req, res) {
  res.render('index');
});

app.get("/academic", function(req, res) {
  res.redirect(301, "/#academic")
})

app.listen(port,'0.0.0.0', function(e){
    if(e){
        // problems
        console.log('cannot start server')
        throw new Error(e)
    }
    console.log("Express server listening port" + port);
    console.log('Current gid: ' + process.getgid());
    try {
        process.setgid(65533);
        console.log('New gid: ' + process.getgid());
    }
    catch (err) {
        console.log('Failed to set gid: ' + err);
        if(process.getgid() === 0) throw(err);
    }
    console.log('Current uid: ' + process.getuid());
    try {
        process.setuid(65534);
        console.log('New uid: ' + process.getuid());
    }
    catch (err) {
        console.log('Failed to set uid: ' + err);
        if(process.getuid() === 0) throw(err);
    }
})
