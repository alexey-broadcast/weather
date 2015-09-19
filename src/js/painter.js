var painter = (function () {
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
    var $btnCf = $('#btn-cf');
    var $bgImg = $('.bg-img');
    var $loader = $(".loader-background");

    function hideLoader() {
        $loader.fadeOut(500);        
    }



    function initialAnimation() {
        console.log('process Animations...');
        for(var i = 0; i < 5; ++i)
            $divHours[i].addClass('inited');
        $btnCf.addClass('inited');
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
        console.log('setBackground');
        var url = fn.iconToPic(icon, true);

        $bgImg.css('background-image', url);
        hideLoader();

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

        //Load background image, THEN do anything else
        $bgImg.append('<img/>');

        var url = fn.iconToPic(res.current.icon);
        var $tmpImg = $bgImg.find('img');

        $tmpImg.attr('src', url).load(function() {
            $tmpImg.remove(); // prevent memory leaks

            // Show current weather
            setBackground(res.current.icon);
            updateHeader(res.current);
            updateCurrentWeather(res.current);

            // Show forecast on little divs
            updateHourForecast(res.hourList);

            initialAnimation();
        });
    }



    function toggleCF() {
        //toggle format
        if(weather.format === weather.FORMAT.C)
            weather.format = weather.FORMAT.F;
        else
            weather.format = weather.FORMAT.C;

        //update data on screen
        $mainTemperature.html(fn.toTempStr(tempC.current));

        for(var i = 0; i < 5; ++i)
            $divHours[i].find('.hour-content .hour-temp').html(fn.toTempStr(tempC.hourList[i]));
    }



    return {
        showWeather: showWeather,
        toggleCF: toggleCF
    }
})();