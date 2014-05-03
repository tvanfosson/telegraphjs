requirejs.config({
    baseUrl: '/assets/scripts',
    paths: {
        'jquery': '/scripts/jquery-1.9.0.min',
    }
});

require(["main"]);