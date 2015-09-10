$(document).ready(function () {
    var weather = Weather();
    var fn = Fn();

    function initialAnimation() {
        const id = '#div-time';
        const circleSize = $('.main-circle').width();
        const divTimeSize = $('.div-time').width();
        const amend = (circleSize - divTimeSize) / 2;

        const dur = 1200;
        const count = 200;
        const pi6 = -Math.PI / 6;
        const startAngle = pi6;

        function divTimeAnimation(n) {
            const endAngle = pi6 * (4 + n);
            const dAngle = (endAngle - startAngle) / count;

            var int = setInterval(() => {
                var angle = startAngle + dAngle * i++;
                $('#div-time'+n).css('right', Math.round((Math.cos(angle) * circleSize) / 2 + amend) + 'px');
                $('#div-time'+n).css('top', Math.round((Math.sin(angle) * circleSize) / 2 + amend) + 'px');
                if(angle <= endAngle)
                    clearInterval(int);
            }, dur / count);
        }

        for(var i = 0; i < 5; ++i) {
            divTimeAnimation(i);
        }
    }

    function setRotate(elem, angle) {
        if(angle === undefined) {
            elem.hide();
            return;
        }

        elem.show();
        var rotate = `rotate(${angle}deg)`;
        elem.css({
            '-webkit-transform': rotate,
            '-moz-transform': rotate,
            '-ms-transform': rotate,
            '-o-transform': rotate,
            'transform': rotate
        });
    }

    function updateHeader(res) {
        $('header .datetime').text(fn.dateString(0, true));
        $('header .location').text(res.location);
    }

    function updateWeather(res) {
        var icon = '#'+res.icon;
        $('.main-icon use').attr('xlink:href', icon);

        var weatherStr = weather.convertTemp(res.temp, weather.FORMAT.K, weather.FORMAT.C)
                         + `&deg;${weather.format}`;
        $('.main-temperature').html(weatherStr);

        $('.main-description').text(res.description);

        setRotate($('.main-wind-arrow'), res.wind.deg);
        var windStr = res.wind.speed + ' m/s';
        $('.main-wind-description').text(windStr);
    }

    function showCurrentWeather(res) {
        updateHeader(res);
        updateWeather(res);
    }

    function updateHourForecast(list) {
        for(var i in list) {
            console.log(list[i]);
            var id = '#div-time'+i;
            var icon = '#'+list[i].icon;
            var iconDiv = $(id+' .hour-icon use').attr('xlink:href', icon);

            var hourText = list[i].time + ' ' +
                weather.convertTemp(list[i].temp, weather.FORMAT.K, weather.FORMAT.C) + `&deg;${weather.format} `;
            $(id+' .hour-content').html(hourText);
        }
    }

    function showForecast(res) {
        //console.log(res);

        updateHourForecast(res.hourList);
        initialAnimation();
    }

    weather.getCurrentWeather(showCurrentWeather);
    weather.getForecast(showForecast);
});