var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/views/pages'));

// views is directory for all template files

var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'html');


// app.set('views', __dirname + '/pages');
// app.set('view engine', 'ejs');

//
// app.get('/', function(request, response) {
//   response.render('home.html');
// });

app.get("/", function (req, res) {
      res.redirect("/start.html");
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
