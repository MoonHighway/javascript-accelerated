$(document).ready(display.init.bind(display));
$(display).on('ready', function() {

    clock.init();
    alarm.init.call(alarm, clock);
    clock.start();

    $(clock).add(alarm).on('timechange', function(e, time) {
        display.render(time);
    });

});