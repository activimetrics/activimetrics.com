var express = require("express"),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;
var url = require('url')
var twitter = require('ntwitter');

var auth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

console.log(auth)
var twit = new twitter(auth);



twit
  .verifyCredentials(function (err, data) {
    if ( !err ) {
      console.log(data);
    } else {
      console.log("FAILED TO VERIFY :",err);
    }
  })

var tweets = []
twit
  .getUserTimeline({screenname: 'sdtoooc'}, function(err, data) {
    if ( !err ) {
      tweets = data;
    } else {
      console.log("FAILED TO GET TIMELINE :"+util.inspect(err));
    }
  })


twit.stream('user', {with: 'followings'}, function(stream) {
    stream.on('data', function (data) {
      console.log(data);
      tweets.unshift(data)
      while( data.length > 20 ) data.pop()
    })
})


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

app.get("/tweets", function(req, res) {
  res.json(tweets)
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
