$(document).ready(function () {
    "use strict";

    console.log(painter);
    $('#btn-cf-toggle').on('click', painter.toggleCF);
    weather.getWeather(painter.showWeather);
});