$(document).ready(function () {
    var weather = Weather();
    var fn = Fn();
    var tempK = {
        current: 0,
        hourList: []
    };

    function initialAnimation() {
        const id = '#div-time';
        const circleSize = $('.main-circle').width();
        const divTimeSize = $('.div-time').width();
        const amend = (circleSize - divTimeSize) / 2;

        const dur = 1200;
        const count = 200;
        const startAngle = -Math.PI / 6;

        function divTimeAnimation(n) {
            const endAngle = -Math.PI / 6 * (4 + n);
            const dAngle = (endAngle - startAngle) / count;

            var int = setInterval(() => {
                var angle = startAngle + dAngle * i++;
                $('#div-time'+n).css('right', Math.round((Math.cos(angle) * circleSize) / 2 + amend) + 'px');
                $('#div-time'+n).css('top', Math.round((Math.sin(angle) * circleSize) / 2 + amend) + 'px');
                if(angle <= endAngle) {
                    clearInterval(int);
                }
            }, dur / count);
        }

        function btnAnimation() {
            var pos = -6;
            const endPos = 0;
            const dPos = (endPos - pos) / count * 4;
            var btn = $('#btn-cf-toggle');
            var i = 0;
            var int = setInterval(() => {
                ++i;
                pos += dPos;
                btn.css('right', pos + 'em');
                if (pos >= endPos) {
                    clearInterval(int);
                }
            }, dur / count);
        }

        function setBackground() {
            var bg = $('.bgImgContainer');
            var circle = $('.content-circle');
            var url = 'url(pics/01d.jpg)';

            bg.css('background-image', url);

            var pos = `0 -${circle.offset().top}px`;
            circle.css('background-position', pos);
            circle.css('background-image', url);
        }

        //process Animations
        setBackground();
        btnAnimation();
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
        //var icon = '#'+res.icon;
        var icon = '#50d';
        $('.main-icon use').attr('xlink:href', icon);

        var tempStr = weather.convertTemp(res.temp, weather.format)
                         + `&deg;${weather.format}`;
        $('.main-temperature').html(tempStr);

        $('.main-description').text(res.description);

        setRotate($('.main-wind-arrow'), res.wind.deg);
        var windStr = res.wind.speed + ' m/s';
        $('.main-wind-description').text(windStr);
    }

    function showCurrentWeather(res) {
        tempK.current = res.temp;
        updateHeader(res);
        updateWeather(res);
    }

    function updateHourForecast(list) {
        for(var i in list) {
            var id = '#div-time'+i;
            var icon = (i == 0)? '#50d' : '#'+list[i].icon;
            var iconDiv = $(id+' .hour-icon use').attr('xlink:href', icon);

            id += ' .hour-content';
            $(id+' .hour-time').text(list[i].time);

            var hourTemp = weather.convertTemp(list[i].temp, weather.format) + `&deg;${weather.format} `;
            $(id+' .hour-temp').html(hourTemp);
        }
    }

    function showForecast(res) {
        tempK.hourList = res.hourList.map(item => item.temp);
        updateHourForecast(res.hourList);
        initialAnimation();
    }

    function toggleCF() {
        weather.format = weather.format === weather.FORMAT.C ? weather.FORMAT.F : weather.FORMAT.C;

        var curStr = weather.convertTemp(tempK.current, weather.format)
            + `&deg;${weather.format}`;
        $('.main-temperature').html(curStr);

        for(var i = 0; i < 5; ++i) {
            var hourStr = weather.convertTemp(tempK.hourList[i], weather.format)
                + `&deg;${weather.format}`;

            var id = `#div-time${i} .hour-content .hour-temp`;
            $(id).html(hourStr);
        }
    }

    $('#btn-cf-toggle').on('click', toggleCF);

    weather.getCurrentWeather(showCurrentWeather);
    weather.getForecast(showForecast);
});