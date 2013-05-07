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

app.listen(port);
