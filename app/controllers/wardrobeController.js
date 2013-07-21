var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var AccessoriesController = new Controller();

AccessoriesController.main = function() {
  this.render();
}

module.exports = AccessoriesController;
