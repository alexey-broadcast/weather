var weatherapi = weatherapi();

$(document).ready(function () {
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

    function showCurrentWeather(res) {
        var div = $('.current-weather .content');
        div.text(res.name);
    }

    weatherapi.getCurrentWeather(showCurrentWeather);
    initialAnimation();
});