var alarm = {

    init: function(clock) {
        this.sound = $('#snd')[0];
        this.clock = clock;
        this.time = new Date();

        this.time.setHours(0);
        this.time.setMinutes(0);
        this.time.setSeconds(0);

        Object.keys(this).forEach(function(prop) {
            if (typeof this[prop] === 'function') {
                this[prop] = this[prop].bind(this);
            }
        }.bind(this));

        this.DOM = {
            snooze: $('#btn-snooze').click(this.snooze),
            set: $('#btn-set').click(this.setAlarm),
            add: $('#btn-add'),
            remove: $('#btn-remove')
        };

        $(this.clock).on('timechange', this.check);

    },

    snooze: function() {
        if (this.armed) {
            this.stop();
            this.time.setMinutes(this.time.getMinutes() + 5);
            this.timeChange();
        }
    },

    check: function() {
        if (this.armed &&
            this.clock.time().getHours() === this.time.getHours() &&
            this.clock.time().getMinutes() === this.time.getMinutes()) {
            this.play();
        }
    },

    play: function() {
        if (this.sound.paused) {
            this.sound.play();
        }
    },

    stop: function() {
        if (!this.sound.paused) {
            this.sound.pause();
        }
    },

    addTime: function() {
        this.time.setMinutes(this.time.getMinutes() + 1);
        this.timeChange();
    },
    removeTime: function() {
        this.time.setMinutes(this.time.getMinutes() - 1);
        this.timeChange();
    },

    holdAdd: function() {
        if (!this.holdDown) {
            this.interval = setInterval(this.addTime, 7);
        }
    },

    releaseAdd: function() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    setAlarm: function() {
        this.DOM.set.off('click').click(this.set).text("Set");
        $('#ind-alarm').show();
        this.armed = false;
        this.clock.stop();
        this.timeChange();
        this.DOM.add.mousedown(this.holdAdd).mouseup(this.releaseAdd);
        this.DOM.remove.click(this.removeTime);
    },

    set: function() {
        this.DOM.set.off('click').click(this.cancel).text("Cancel Alarm");
        $('#ind-alarm').hide();
        $('#ind-on').show();
        this.armed = true;
        this.clock.start();
        this.DOM.add.off('mousedown mouseup');
        this.DOM.remove.off('click');
    },

    cancel: function() {
        this.stop();
        $('#ind-on').hide();
        this.DOM.set.off('click').click(this.setAlarm).text("Set Alarm");
        this.armed = false;
    },

    timeChange: function() {
        $(this).trigger('timechange', this.time);
    }

};