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
        if(to === FORMAT.C)
            t -= 273.15;
        else if(to === FORMAT.F)
            t = (t - 273.15) * 9 / 5 + 32;

        return Math.round(t);
    }

    function getCurrentWeather(cb) {
        $.getJSON('http://ipinfo.io')
            .success(function(location) {
                var loc = location.loc.split(',');
                var lat = loc[0];
                var lon = loc[1];

                var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=e4e476fc9e6b96aae46420bd9683296d`;
                //var url = `http://api.openweathermap.org/data/2.5/weather?id=498817&APPID=e4e476fc9e6b96aae46420bd9683296d`;
                $.getJSON(url).success(function(res) {
                    cb({
                        icon: res.weather[0].icon,
                        temp: res.main.temp,
                        description: res.weather[0].description,
                        wind: {deg: res.wind.deg, speed: res.wind.speed},
                        location: res.name
                    });
                });
            });
    }

    function getForecast(cb) {
        $.getJSON('http://ipinfo.io')
            .success(function(location) {
                var loc = location.loc.split(',');
                var lat = loc[0];
                var lon = loc[1];

                var url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=e4e476fc9e6b96aae46420bd9683296d`;
                //var url = `http://api.openweathermap.org/data/2.5/forecast?id=498817&APPID=e4e476fc9e6b96aae46420bd9683296d`;
                $.getJSON(url).success(function(res) {
                    var hourList = [];
                    for(var i = 0; i < 5; ++i) {
                        hourList.push({
                            icon: res.list[i].weather[0].icon,
                            temp: res.list[i].main.temp,
                            description: res.list[i].weather[0].description,
                            wind: {deg: res.list[i].wind.deg, speed: res.list[i].wind.speed},
                            time: fn.dateString(res.list[i].dt)
                        });
                    }
                    cb({hourList: hourList});
                });
            });
    }

    return {
        FORMAT: FORMAT,
        format: format,
        convertTemp: convertTemp,
        getCurrentWeather: getCurrentWeather,
        getForecast: getForecast
    }
};
