var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var LingerieController = new Controller();

LingerieController.main = function() {
  this.render();
}

module.exports = LingerieController;
