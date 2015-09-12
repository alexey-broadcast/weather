function Weather() {
    var fn = Fn();

    const FORMAT = {
        C: 'C',
        F: 'F',
        K: 'K'
    };
    var format = FORMAT.C;

    //convert from K to 'to'
    function convertTemp(t, to) {
        if(to === FORMAT.F)
            t = t * 9 / 5 + 32;

        return Math.round(t);
    }

    function getWeather(cb) {
        $.getJSON('http://ipinfo.io')
            .success(function(location) {
                var loc = location.loc.split(',');
                var lat = loc[0];
                var lon = loc[1];

                var params = {
                    'q': `${lat},${lon}`,
                    'num_of_days': 2,
                    'fx24': true,
                    'key': 'e647ab75e8339699c1dc7e12fa0df',
                    'format': 'json',
                    'showlocaltime': 'yes',
                    'includelocation': 'yes'
                };
                var url = `https://api.worldweatheronline.com/free/v2/weather.ashx?` + $.param(params);
                $.getJSON(url).success(function(res) {
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

                    var hourList = res.data.weather[0].hourly;
                    while(fn.toDateMs(hourList[0].time) < +(new Date()))
                        hourList.shift();
                    while(hourList.length < 5) {
                        hourList.push(res.data.weather[1].hourly[0]);
                        res.data.weather[1].hourly.shift();
                    }

                    var resHourlist = [];
                    for(var i = 0; i < 5; ++i) {
                        var timeStr = hourList[i].time.slice(0, -2) + ':' + hourList[i].time.slice(-2);
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

                    var response = {
                        current: resCurrent,
                        hourList: resHourlist
                    };

                    cb(response);
                });
            });
    }

    return {
        FORMAT: FORMAT,
        format: format,
        convertTemp: convertTemp,
        getWeather: getWeather
    }
};
