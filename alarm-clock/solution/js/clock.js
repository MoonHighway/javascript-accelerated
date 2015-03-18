var clock = {

    init: function () {
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.time = this.time.bind(this);
        this.tick = this.tick.bind(this);
    },

    time: function () {
        return new Date();
    },

    tick: function () {
        $(this).trigger('timechange', this.time());
    },

    start: function () {
        this.tick();
        this.ticking = setInterval(this.tick, 1000);
    },

    stop: function() {
        clearInterval(this.ticking);
    }

};