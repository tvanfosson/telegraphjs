define(function() {

    // Create the telegraph server using the specified options. Target
    // specifies the origin of the messages you send. Accept specifies
    // the origin of the messages you will receive.
    var telegraph = function(w, eventHandlers, options) {

        // note: you should always specify an exact target for the messages
        // you send or you will risk exposing your messages to any listening
        // window.
        this.options = { target: '*', accept: '.*' };
       
        this.initHandlers()
            .initEvents()
            .hookup(w, eventHandlers, options);
    };

    // Send message of type "e" with the associated data. Data may be null.
    telegraph.prototype.send = function (e, data) {
        this.window.postMessage({ event: e, data: data }, this.target);
    }

    // TODO: this should handle space-separated events ala jQuery 
    telegraph.prototype.on = function (evt, handler) {
        if (!this.eventHandlers.hasOwnProperty(evt)) {
            this.eventHandlers[evt] = [];
        }
        this.eventHandlers[evt].push(handler);
    };

    // TODO: this should handle space-separated events ala jQuery 
    telegraph.prototype.off = function (evt, handler) {
        var handlers = this.eventHandlers[evt];
        if (handlers) {
            var i, len;
            for (i = 0, len = handlers.length; i < len; ++i) {
                var candidate = handlers[i];
                if (candidate === handler) {
                    this.eventHandlers[evt].splice(i, 1);
                }
            }
        }
    };

    // Internal methods. These should not be called from outside.
    telegraph.prototype.initHandlers = function () {
        var self = this;

        self.messageHandler = function(e) {
            self.dispatch(e);
        };

        return self;
    };

    telegraph.prototype.initEvents = function () {
        var self = this;

        if (window.attachEvent) {
            window.attachEvent('onmessage', this.messageHandler, false);
        }
        else {
            window.addEventListener('message', this.messageHandler, false);
        }

        return this;
    };

    telegraph.prototype.extend = function(options, overrides) {
        for (var key in overrides) {
            if (b.hasOwnProperty(key)) {
                options[key] = overrides[key];
            }
        }

        return options;
    };

    telegraph.prototype.hookup = function (w, eventHandlers, options) {

        this.options = this.extend(this.options, options || {});

        this.acceptRegex = new RegExp(this.options.accept, 'i');
        this.target = this.options.target;

        this.eventHandlers = {};

        if (eventHandlers) {
            var evt;
            for (evt in eventHandlers) {
                var handlers = eventHandlers[evt];
                if (typeof handlers === 'function') {
                    this.on(evt, handlers);
                }
                else {
                    var i, len;
                    for (i = 0, len = handlers.length; i < len; ++i) {
                        this.on(evt, handlers[i]);
                    }
                }
            }
        }

        this.window = w;

        return this;
    }

    telegraph.prototype.dispatch = function(e) {
        if (e.data && e.data.event && e.origin && e.origin.match(this.acceptRegex)) {

            var evt;
            for (evt in this.eventHandlers) {
                if (e.data.event === evt) {
                    var handlers = this.eventHandlers[evt];
                    var i, len;
                    for (i = 0, len = handlers.length; i < len; ++i) {
                        handlers[i](e.data.event, e.data.data);
                    }
                }
            }
        }
    };

    return telegraph;
});