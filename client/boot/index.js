var tt = require('twitter-timeline');
var $ = require('jquery');
require('bootstrap');

var el = document.getElementById('twitter-timeline');
tt('activimetrics').count(5).render(el);

//$('#navlist').scrollspy();
