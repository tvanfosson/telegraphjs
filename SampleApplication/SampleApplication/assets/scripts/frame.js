define(["jquery", "telegraph"], function ($, Telegraph) {

    var controller = function () {
    };

    controller.prototype.init = function () {
        this.initHandlers()
            .initEvents();
    };

    controller.prototype.initHandlers = function () {
        this.closingHandler = $.proxy(this.addMessage, this);
        this.openHandler = $.proxy(this.open, this);
        this.closeHandler = $.proxy(this.close, this);
        return this;
    };

    controller.prototype.initEvents = function () {
        $('.js-close-btn').on('click', this.closeHandler);

        var handlers = {
            'APP:close': this.closingHandler,
            'APP:open': this.openHandler
        };

        this.telegraph = new Telegraph(parent.window, handlers);

        return this;
    };

    controller.prototype.open = function (e) {
        this.telegraph.send('APP:opened', { when: new Date() });
        this.addMessage(e);
    };

    controller.prototype.addMessage = function (e) {
        $('.js-messages').append($('<p>Main message received ' + e + '</p>'));
    };

    controller.prototype.close = function () {
        this.telegraph.send('APP:close');
    };

    new controller().init();
});