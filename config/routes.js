var passport = require('passport');
module.exports = function routes() {
	
  this.match("/", 'pages#main', {as: "home"});
  this.match('about/', 'pages#about', {as: 'about'});
  this.match('faq/:id/:mode', 'pages#faq', {as: 'faq'});
  this.match('contact', 'pages#contact', {as: 'contact'});
  this.match('policies/:id/:mode', 'pages#policies', {as: 'policies'});

  this.match('corsets/over_bust/:id/:mode', 'corsets#overBust', {as: 'overbust'} );
  this.match('corsets/under_bust/:item/:mode', 'corsets#underBust', {as: 'underbust'});
  
  this.match('latex/wardrobe/:id/:mode', 'latex#wardrobe', {as: 'latexWardrobe'});
  this.match('latex/lingerie/:id/:mode', 'latex#lingerie', {as: 'latexLingerie'});
  
  this.match('lingerie/:id/:mode', 'lingerie#main', {as: 'lingerie'});
  this.match('wardrobe/:id/:mode', 'wardrobe#main', {as: 'wardrobe'});
  
  this.resource('account');
  this.match('register', 'account#new', {via: 'get'});
  this.match('login', 'account#loginForm', {via: 'get', as: 'loginAttempt'});
  this.match('login', passport.authenticate('local', {
	  successRedirect: '/account',
	  failureRedirect: '/login',
	  failureFlash: true	
  }), {via: 'post'});
  this.match('logout', 'account#logout');
}
