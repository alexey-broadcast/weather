var weather = (function Weather() {
    "use strict" ;

    const FORMAT = {
        C: 'C',
        F: 'F',
        K: 'K'
    };
    var format = FORMAT.C;

    var callbacks = null;

    function processWeather(res) {
        // Process current weather
        var current = res.data.current_condition[0];
        var code = current.weatherCode;
        var resCurrent = {
            icon: fn.codeToIcon(code),
            temp: current.temp_C,
            description: fn.codeToDesc(code),
            wind: {
                deg: current.winddirDegree,
                speed: Math.round(current.windspeedKmph * 0.277777778) //convert km/h to m/s
            },
            location: res.data.nearest_area[0].areaName[0].value
        };

        // Prepare data for hour forecast: remove hours in the past,
        var hourList = res.data.weather[0].hourly;
        while(hourList.length > 0 && fn.toDateMs(hourList[0].time) < +(new Date()))
            hourList.shift();
        // add hours from next day if necessary
        while(hourList.length < 5) {
            hourList.push(res.data.weather[1].hourly[0]);
            res.data.weather[1].hourly.shift();
        }

        // Process hourly forecast
        var resHourlist = [];
        for(var i = 0; i < 5; ++i) {
            var timeStr = '0:00';
            if(hourList[i].time > 0)
                timeStr = hourList[i].time.slice(0, -2) + ':' + hourList[i].time.slice(-2);

            resHourlist.push({
                icon: fn.codeToIcon(hourList[i].weatherCode, hourList[i].time),
                temp: hourList[i].tempC,
                description: fn.codeToDesc(hourList[i].weatherCode),
                wind: {
                    deg: hourList[i].winddirDegree,
                    speed: Math.round(hourList[i].windspeedKmph * 0.277777778) //convert km/h to m/s
                },
                time: timeStr
            });
        }

        // Make response
        var response = {
            current: resCurrent,
            hourList: resHourlist 
        };

        callbacks.onSuccess(response);
    }



    function processLocation(loc) {
        var params = {
            'q': `${loc.coords.latitude},${loc.coords.longitude}`,
            'num_of_days': 2,
            'fx24': true,
            'key': 'e647ab75e8339699c1dc7e12fa0df',
            'format': 'json',
            'showlocaltime': 'yes',
            'includelocation': 'yes'
        };
        var url = 'https://api.worldweatheronline.com/free/v2/weather.ashx?' +
                $.param(params);
        $.getJSON(url)
            .done(processWeather)
            .fail(callbacks.weatherErrored);
    }

    function locationSucceed(loc) {
        callbacks.locationSucceed();
        processLocation(loc);
    }

    function locationErrored() {
        callbacks.locationErrored();
        processLocation(fn.randomCity());
    }

    function getWeather(cb) {
        callbacks = cb;

        navigator.geolocation.getCurrentPosition(
            locationSucceed,
            locationErrored,
            {timeout: 3000}
        );
    }



    return {
        FORMAT: FORMAT,
        format: format,
        getWeather: getWeather
    }
})();
