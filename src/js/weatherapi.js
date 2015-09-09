function weatherapi() {

    function getCurrentWeather(cb) {
        $.getJSON('http://ipinfo.io')
            .success(function(location) {
                console.log(`city got: ${location.city}`);
                var loc = location.loc.split(',');
                var lat = loc[0];
                var lon = loc[1];

                var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=e4e476fc9e6b96aae46420bd9683296d`;
                $.getJSON(url).success(function(res) {
                    console.log('weather got');
                    cb(res);
                });
            });
    }

    return {
        getCurrentWeather: getCurrentWeather
    }
}
