$(document).ready(function () {
    "use strict";

    $('#btn-cf').on('click', painter.toggleCF);

    var cb = {
    	onSuccess: painter.showWeather,
    	locationSucceed: painter.locationSucceed,
    	locationErrored: painter.locationErrored,
    	weatherErrored: painter.weatherErrored
    }

    weather.getWeather(cb);
});