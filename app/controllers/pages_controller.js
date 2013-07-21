var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.render();
}

PagesController.about = function() {
	this.render();
}

PagesController.faq = function() {
	this.render();
}

PagesController.policies = function () {
	this.render();
}

PagesController.contact = function () {
	this.render();
}

module.exports = PagesController;
