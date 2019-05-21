var express = require('express')
var app = express()
// 设置handle-bars视图引擎
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))
var fortune = require('./lib/fortune.js')
app.get('/', function (req, res) {
    res.render('home')
})
app.get('/about', function (req, res) {
    res.render('about', { fortune: fortune.getFortune() });
})
// app.get('/about/content', function (req, res) {
//     res.type('text/plain')
//     res.send('About Meadllark Travel Content')
// })
app.use(function (req, res) {
    res.status(404)
    res.render('404')
})
app.use(function (err, req, res, next) {
    // console.error(err.stack);
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function () {
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
})