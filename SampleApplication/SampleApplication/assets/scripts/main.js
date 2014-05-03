define(["jquery", "telegraph"], function($, Telegraph) {

    var controller = function () {
    };

    controller.prototype.init = function () {
        var iframe = document.getElementById('client-frame');

        this.window = iframe.contentWindow;

        this.initHandlers()
            .initEvents();
    };

    controller.prototype.initHandlers = function () {
        this.toggleHandler = $.proxy(this.toggle, this);
        this.openedHandler = $.proxy(this.opened, this);
        this.closeHandler = $.proxy(this.close, this);
        return this;
    };

    controller.prototype.initEvents = function () {
        $('.js-open-btn').on('click', this.toggleHandler);

        var handlers = {
            'APP:close': this.closeHandler,
            'APP:opened': this.openedHandler
        };

        this.telegraph = new Telegraph(this.window, handlers);

        return this;
    };

    controller.prototype.toggle = function() {
        var self = this;
        var $container = $('.js-frame-container');
        var show = $container.hasClass('hidden');

        $container.toggleClass('hidden');

        if (show) {
            self.telegraph.send('APP:open');
        }
        else {
            self.telegraph.send('APP:close');
        }
    };

    controller.prototype.opened = function(e, data) {
        $('.js-messages').append($('<p>Frame message received ' + e + ' at ' + data.when + '</p>'));
    };

    controller.prototype.close = function (e) {
        $('.js-messages').append($('<p>Frame message received ' + e + '</p>'));
        $('.js-frame-container').addClass('hidden');
    };

    new controller().init();
});