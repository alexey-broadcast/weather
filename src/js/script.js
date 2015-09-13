$(window).load(function () {
    "use strict";
    $(".loader-background").fadeOut(500);
});

$(document).ready(function () {
    "use strict";

    var tempC = {
        current: 0,
        hourList: []
    };


    //  jQuery selections
    var $outerCircle = $('.outer-circle');
    var $contentCircle = $('.content-circle');
    var $innerCircle1 = $('.inner-circle1');
    var $innerCircle2 = $('.inner-circle2');

    var $mainIcon = $('.main-icon');
    var $mainTemperature = $('.main-temperature');
    var $mainDescription = $('.main-description');
    var $mainWindArrow = $('.main-wind-arrow');
    var $mainWindDescription = $('.main-wind-description');

    var $divHour = $('.div-time');

    var $divHours = [];
    var $divHourIcons = [];
    var $divHourTimes = [];
    var $divHourTemps = [];
    for(var i = 0; i < 5; ++i) {
        $divHours.push($('#div-time'+i));
        $divHourIcons.push($divHours[i].find('.hour-icon use'));
        $divHourTimes.push($divHours[i].find('.hour-content .hour-time'));
        $divHourTemps.push($divHours[i].find('.hour-content .hour-temp'));
    }

    var $headerDt = $('header .datetime');
    var $headerLoc = $('header .location');
    var $button = $('button');
    var $btnCf = $('#btn-cf-toggle');
    var $bgImgContainer = $('.bgImgContainer');



    function initialAnimation() {
        const circleSize = $outerCircle.width();
        var border = parseInt($divHour.css('borderWidth'));
        var padding = parseInt($divHour.css('padding'));
        const divHourSize = $divHour.width() + 2 * (border + padding);
        const amend = (circleSize - divHourSize) / 2;

        const dur = 2400;
        const count = 200; 
        const startAngle = -Math.PI / 6;



        function divTimeAnimation(n) {
            const endAngle = -Math.PI / 6 * (4 + n);
            const dAngle = (endAngle - startAngle) / count;

            var anim = setInterval(() => {
                var angle = startAngle + dAngle * i++;
                $divHours[n].css('right', Math.round((Math.cos(angle) * circleSize) / 2 + amend) + 'px');
                $divHours[n].css('top', Math.round((Math.sin(angle) * circleSize) / 2 + amend) + 'px');
                if(angle <= endAngle) {
                    clearInterval(anim);
                }
            }, dur / count);
        }



        function btnAnimation() {
            var pos = -6;
            const endPos = 0;
            const dPos = (endPos - pos) / count * 4;
            var anim = setInterval(() => {
                pos += dPos;

                $btnCf.css('right', pos + 'em');
                if (pos >= endPos) {
                    clearInterval(anim);
                }
            }, dur / count);
        }


        //process Animations
        btnAnimation();
        for(var i = 0; i < 5; ++i) {
            divTimeAnimation(i);
        }
    }



    function setWindArrowAngle(angle) {
        if(angle === undefined) {
            $mainWindArrow.hide();
            return;
        }

        $mainWindArrow.show();
        var rotate = `rotate(${angle}deg)`;
        $mainWindArrow.css({
            '-webkit-transform': rotate,
            '-moz-transform': rotate,
            '-ms-transform': rotate,
            '-o-transform': rotate,
            'transform': rotate
        });
    }



    function setBackground(icon) {
        var url = fn.iconToPic(icon);
        $bgImgContainer.css('background-image', url);

        var pos = `0 -${$contentCircle.offset().top}px`;
        $contentCircle.css('background-position', pos);
        $contentCircle.css('background-image', url);

        var colors = fn.getColors(icon);
        $button.css('background-color', colors.btnBgColor);
        $divHour.css('background-color', colors.btnBgColor);
        $outerCircle.css('background-color', colors.outerCircleColor);
        $outerCircle.css('border-color', colors.outerCircleBorder);
        $contentCircle.css('border-color', colors.outerCircleBorder);
        $innerCircle1.css('background-color', colors.innerCircleColor);
        $innerCircle2.css('background-color', colors.innerCircleColor);
    }



    function updateHeader(res) {
        $headerDt.text(fn.dateString());
        $headerLoc.text(res.location);
    }



    function updateCurrentWeather(res) {
        var icon = '#'+res.icon;
        $mainIcon.find('use').attr('xlink:href', icon);

        var tempStr = fn.toTempStr(res.temp);
        $mainTemperature.html(tempStr);

        $mainDescription.text(res.description);

        setWindArrowAngle(res.wind.deg);
        var windStr = res.wind.speed + ' m/s';
        $mainWindDescription.text(windStr);
    }



    function updateHourForecast(list) {
        for(var i in list) {
            var icon = '#'+list[i].icon;
            $divHourIcons[i].find('use').attr('xlink:href', icon);

            $divHourTimes[i].text(list[i].time);
            $divHourTemps[i].html(fn.toTempStr(list[i].temp));
        }
    }



    function showWeather(res) {
        tempC.current = res.current.temp;
        tempC.hourList = res.hourList.map(item => item.temp);

        // Show current weather
        setBackground(res.current.icon);
        updateHeader(res.current);
        updateCurrentWeather(res.current);

        // Show forecast on little divs
        updateHourForecast(res.hourList);

        initialAnimation();
    }



    function toggleCF() {
        //toggle format
        if(weather.format === weather.FORMAT.C)
            weather.format = weather.FORMAT.F;
        else
            weather.format = weather.FORMAT.C;

        //update data on screen
        $mainTemperature.html(curStr);

        for(var i = 0; i < 5; ++i)
            $divHours[i].find('.hour-content .hour-temp').html(fn.toTempStr(tempC.hourList[i]));
    }



    $btnCf.on('click', toggleCF);
    weather.getWeather(showWeather);
});