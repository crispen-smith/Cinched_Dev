requirejs.config({
    paths: {
        prefixFree: ['/components/prefix-free/prefixfree.min'],
        pictureFill: ['/components/picturefill/picturefill']
    }
});

require(['prefixFree', 'pictureFill'], function() {});
