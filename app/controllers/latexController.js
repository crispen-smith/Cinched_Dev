var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var LatexController = new Controller();

LatexController.wardrobe = function() {
  this.render();
}

LatexController.lingerie = function() {
	this.render();
}

module.exports = LatexController;
