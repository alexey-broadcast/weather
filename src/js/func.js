// All ugly functions here
var fn = (function Fn() {
    "use strict";

    function weekDayName(day) {
        return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][day];
    }
    


    function monthName(month) {
        return ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
               ][month];
    }



    function dateString() {
        var d = new Date();

        var res = d.getHours() + ':';
        if(d.getMinutes() < 10)
            res += '0';
        res += d.getMinutes();

        res += ' ' +
            weekDayName(d.getDay()) + ', ' +
            monthName(d.getMonth()) + ' ' +
            d.getDate() + ' ';

        return res;
    }



    function getColors(icon) {
        switch (icon) {
            case '01d':
            case '02d':
            case '01n':
                return {
                    btnBgColor: 'rgba(0, 0, 175, 0.2)',
                    outerCircleColor: 'rgba(0, 0, 175, 0.1)',
                    outerCircleBorder: 'rgba(0, 0, 230, 0.1)',
                    innerCircleColor: 'rgba(130, 190, 220, 0.3)'
                };
            case '02n':
                return {
                    btnBgColor: 'rgba(15, 25, 34, 0.4)',
                    outerCircleColor: 'rgba(15, 25, 34, 0.5)',
                    outerCircleBorder: 'rgba(15, 25, 34, 0.4)',
                    innerCircleColor: 'rgba(30, 44, 56, 0.3)'
                };
            case '13d':
                return {
                    btnBgColor: 'rgba(43, 49, 67, 0.9)',
                    outerCircleColor: 'rgba(43, 49, 67, 0.5)',
                    outerCircleBorder: 'rgba(43, 49, 67, 0.4)',
                    innerCircleColor: 'rgba(30, 30, 30, 0.2)'
                };
            case '50d':
                return {
                    btnBgColor: 'rgba(102, 86, 80, 0.9)',
                    outerCircleColor: 'rgba(140, 101, 75, 0.5)',
                    outerCircleBorder: 'rgba(43, 49, 67, 0.4)',
                    innerCircleColor: 'rgba(30, 30, 30, 0.2)'
                };
            case '09n':
            default:
                return {
                    btnBgColor: 'rgba(32, 32, 32, 0.9)',
                    outerCircleColor: 'rgba(32, 32, 32, 0.5)',
                    outerCircleBorder: 'rgba(15, 15, 15, 0.4)',
                    innerCircleColor: 'rgba(30, 30, 30, 0.2)'
                };
        }
    }



    function codeToIcon(code, time) {
        var res = '';

        switch (parseInt(code)) {
            case 116: res = '02'; break;

            case 119: res = '03'; break;

            case 122: res = '04'; break;

            case 305:
            case 308:
            case 314:
            case 353:
            case 356:
            case 359: res = '09'; break;

            case 176:
            case 185:
            case 263:
            case 266:
            case 281:
            case 284:
            case 293:
            case 296:
            case 299:
            case 302:
            case 311: res = '10'; break;

            case 200:
            case 386:
            case 389: res = '11'; break;

            case 179:
            case 182:
            case 227:
            case 230:
            case 317:
            case 320:
            case 323:
            case 326:
            case 329:
            case 332:
            case 335:
            case 338:
            case 350:
            case 362:
            case 365:
            case 368:
            case 371:
            case 374:
            case 377:
            case 392:
            case 395: res = '13'; break;

            case 143:
            case 248:
            case 260: res = '50'; break;

            case 113:
            default:  res = '01';
        }

        var d;
        if(time)
            d = new Date(toDateMs(time));
        else
            d = new Date();

        if(d.getHours() < 6 || d.getHours() > 20)
            res += 'n';
        else
            res += 'd';
        return  res;
    }



    function codeToDesc(code) {
        switch (parseInt(code)) {
            case 113: return 'Clear/Sunny';
            case 116: return 'Partly Cloudy';
            case 119: return 'Cloudy';
            case 122: return 'Overcast';
            case 143: return 'Mist';
            case 176: return 'Patchy rain nearby';
            case 179: return 'Patchy snow nearby';
            case 182: return 'Patchy sleet nearby';
            case 185: return 'Patchy freezing drizzle nearby';
            case 200: return 'Thundery outbreaks in nearby';
            case 227: return 'Blowing snow';
            case 230: return 'Blizzard';
            case 248: return 'Fog';
            case 260: return 'Freezing fog';
            case 263: return 'Patchy light drizzle';
            case 266: return 'Light drizzle';
            case 281: return 'Freezing drizzle';
            case 284: return 'Heavy freezing drizzle';
            case 293: return 'Patchy light rain';
            case 296: return 'Light rain';
            case 299: return 'Moderate rain at times';
            case 302: return 'Moderate rain';
            case 305: return 'Heavy rain at times';
            case 308: return 'Heavy rain';
            case 311: return 'Light freezing rain';
            case 314: return 'Moderate or Heavy freezing rain';
            case 317: return 'Light sleet';
            case 320: return 'Moderate or heavy sleet';
            case 323: return 'Patchy light snow';
            case 326: return 'Light snow';
            case 329: return 'Patchy moderate snow';
            case 332: return 'Moderate snow';
            case 335: return 'Patchy heavy snow';
            case 338: return 'Heavy snow';
            case 350: return 'Ice pellets';
            case 353: return 'Light rain shower';
            case 356: return 'Moderate or heavy rain shower';
            case 359: return 'Torrential rain shower';
            case 362: return 'Light sleet showers';
            case 365: return 'Moderate or heavy sleet showers';
            case 368: return 'Light snow showers';
            case 371: return 'Moderate or heavy snow showers';
            case 374: return 'Light showers of ice pellets';
            case 377: return 'Moderate or heavy showers of ice pellets';
            case 386: return 'Patchy light rain in area with thunder';
            case 389: return 'Moderate or heavy rain in area with thunder';
            case 392: return 'Patchy light snow in area with thunder';
            case 395: return 'Moderate or heavy snow in area with thunder';
            default: return '';
        }
    }



    function iconToPic(icon, withUrl) {
        var pic = icon;
        pic = pic.replace(/0[34]/, '02');
        pic = pic.replace(/1[01]/, '09');
        pic = pic.replace('13n', '13d');
        pic = pic.replace('50n', '50d');

        if(withUrl)
            return `url(pics/${pic}.jpg)`;
        else
            return `pics/${pic}.jpg`;
    }



    function toDateMs(timeStr) {//timeStr is a 'HHmm' string
        if(timeStr.length < 4)
            timeStr = '0' + timeStr;

        var d = new Date();
        var h = parseInt(timeStr.substr(0, 2));
        var m = parseInt(timeStr.substr(2));
        d.setHours(h);
        d.setMinutes(m);
        return +d;
    }



    function toTempStr(temp) {
        //convert from Celsius to Farenheit if necessary
        if(weather.format === weather.FORMAT.F)
            temp = temp * 9 / 5 + 32;

        temp = Math.round(temp);
        return temp + '&deg;' + weather.format;
    }



    return {
        weekDayName: weekDayName,
        monthName: monthName,
        dateString: dateString,
        getColors: getColors,
        codeToIcon: codeToIcon,
        codeToDesc: codeToDesc,
        toDateMs : toDateMs,
        iconToPic: iconToPic,
        toTempStr: toTempStr
    };
})();
