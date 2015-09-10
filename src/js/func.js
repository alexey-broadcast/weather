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

    return {
        weekDayName: weekDayName,
        monthName: monthName,
        dateString: dateString
    };
}
