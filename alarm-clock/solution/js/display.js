var display = {

    init: function() {

        this.render = this.render.bind(this);

        this.DOM = {
            hrs: $("#display span:nth-child(1)"),
            min: $("#display span:nth-child(2)"),
            sec: $("#display span:nth-child(3)"),
            ampm: $("#display span:nth-child(4)")
        };

        $(this).trigger('ready');
    },

    zfill: function(val) {
        return (val > 9) ? val : "0" + val;
    },

    render: function(time) {
        var hours, d = this.DOM;
        time = time || new Date();
        hours = time.getHours();
        d.hrs.text((hours === 0) ? "12" : (hours > 12) ? hours - 12 : hours);

        d.min.text(this.zfill(time.getMinutes()));
        d.sec.text(this.zfill(time.getSeconds()));
        d.ampm.text((hours >= 12) ? "PM" : "AM");
    }

};