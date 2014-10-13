//requirejs.config({
//    "baseUrl": "scripts/lib",
//    "paths": {
//        "app": "../app"
//    },
//    "shim": {
//        "jquery.alpha": ["jquery"],
//        "jquery.beta": ["jquery"]
//    }
//});

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        app: '../app'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/main']);