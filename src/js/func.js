function Fn() {

    function weekDayName(day) {
        return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][day];
    }
    
    function monthName(month) {
        return ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
               ][month];
    }

    function dateString(unixtime, withDate) {
        var d;
        if(unixtime === 0)
            d = new Date();
        else
            d = new Date(unixtime * 1000);

        var res = d.getHours() + ':' + d.getMinutes();
        if(d.getMinutes() < 10)
            res += '0';
        if(withDate)
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

    return {
        weekDayName: weekDayName,
        monthName: monthName,
        dateString: dateString,
        getColors: getColors
    };
}
