/*
 * GET home page.
 */

var index = function(req, res) {
    res.render('index.html');
};

var partials = function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name, {});
};

module.exports = {
    'GET /': index,
    'GET /partials/:name': partials
}
