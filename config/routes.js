// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
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
  
  this.match('/login', 'login#present', {as: 'login', via: "get"});
  this.match('/login/attempt', 'login#attempt', {as: 'loginAttempt', via: "post"})
  
}
