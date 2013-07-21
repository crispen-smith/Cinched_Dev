requirejs.config({
    paths: {
        prefixFree: ['/components/prefix-free/prefixfree.min']
		,   pictureFill: ['/components/picturefill/picturefill']
		//,	jquery: ['/components/jquery/jquery.min']
    }
});

require(['prefixFree', 'pictureFill'], function() {
	var reveal = window.setTimeout(function() {
		document.querySelector("#screen").classList.remove("open");
	}, 150);
	
		var menuButton 		= 	document.querySelector("#menuButton"); 
		var navBar 			= 	document.querySelector("#navBar");
		var navBarStatus 	= 	navBar.classList;
		menuButton.addEventListener('click', function() {
			navBarStatus.toggle("closed");
		menuButton.addEventListener('touchStart', function() {
			navBarStatus.toggle("closed");
		})
	});
});
