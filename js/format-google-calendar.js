var formatGoogleCalendar=function() {
    "use strict";
    var a,
    b=function(b) {
        var d=[];
        a=b,
        jQuery.getJSON(b.calendarUrl, function(a) {
            a.items.forEach(function(a) {
                a&&a.hasOwnProperty("status")&&"cancelled"!==a.status&&d.push(a)
            }
            ), d.sort(c).reverse();
            var e, h=0, i=0, j=[], k=[], l=[], m=jQuery(b.upcomingSelector), n=jQuery(b.pastSelector);
            -1===b.pastTopN&&(b.pastTopN=d.length), -1===b.upcomingTopN&&(b.upcomingTopN=d.length), b.past===!1&&(b.pastTopN=0), b.upcoming===!1&&(b.upcomingTopN=0);
            for(e in d)g(d[e].end.dateTime||d[e].end.date)?h<b.pastTopN&&(j.push(d[e]), h++):l.push(d[e]);
            l.reverse();
            for(e in l)i<b.upcomingTopN&&(k.push(l[e]), i++);
            for(e in j)n.append(f(j[e], b.itemsTagName, b.format));
            for(e in k)m.append(f(k[e], b.itemsTagName, b.format));
            0!==m.children().length&&jQuery(b.upcomingHeading).insertBefore(m), 0!==n.children().length&&jQuery(b.pastHeading).insertBefore(n)
        }
        )
    }
    ,
    c=function(a, b) {
        return new Date(a.start.dateTime||a.start.date).getTime()-new Date(b.start.dateTime||b.start.date).getTime()
    }
    ,
    d=function(a, b) {
        var c,
        d= {}
        ;
        for(c in a)d[c]=a[c];
        for(c in b)d[c]=b[c];
        return d
    }
    ,
    e=function(a, b) {
        var c=l(a),
        d=l(b);
        return c.getTime()===d.getTime()-864e5&&0===c.getMinutes()&&0===c.getHours()?!0: !1
    }
    ,
    f=function(b, c, d) {
        var f=h(b.start.dateTime||b.start.date),
        g=h(b.end.dateTime||b.end.date),
        i="undefined"!=typeof b.end.date,
        j=a.dayNames,
        k=e(f, g);
        i&&(g=m(g)),
        k&&(g=n(g));
        var l,
        o=s(f, g, i, k, j),
        p="<"+c+">",
        q=b.summary||"",
        r=b.description||"",
        t=b.location||"";
        for(l=0;
        l<d.length;
        l++)d[l]=d[l].toString(),
        "*summary*"===d[l]?p=p.concat('<span class="summary">'+q+"</span>"): "*date*"===d[l]?p=p.concat('<span class="date">'+o+"</span>"): "*description*"===d[l]?p=p.concat('<span class="description">'+r+"</span>"): "*location*"===d[l]?p=p.concat('<span class="location">'+t+"</span>"): ("*location*"===d[l+1]&&""!==t||"*summary*"===d[l+1]&&""!==q||"*date*"===d[l+1]&&""!==o||"*description*"===d[l+1]&&""!==r)&&(p=p.concat(d[l]));
        return p+"</"+c+">"
    }
    ,
    g=function(a) {
        var b=new Date(a),
        c=new Date;
        return c.getTime()>b.getTime()?!0: !1
    }
    ,
    h=function(a) {
        return a=new Date(a),
        [a.getDate(),
        a.getMonth(),
        a.getFullYear(),
        a.getHours(),
        a.getMinutes(),
        0,
        0]
    }
    ,
    i=function(a) {
        var b=["January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"];
        return b[a]
    }
    ,
    j=function(a) {
        var b=["Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"];
        return b[a]
    }
    ,
    k=function(a) {
        return j(l(a).getDay())+" "
    }
    ,
    l=function(a) {
        return new Date(a[2], a[1], a[0], a[3], a[4]+0, 0)
    }
    ,
    m=function(a) {
        var b=l(a);
        return b.setTime(b.getTime()-864e5),
        h(b)
    }
    ,
    n=function(a) {
        var b=l(a);
        return b.setTime(b.getTime()-6e4),
        h(b)
    }
    ,
    o=function(b, c, d, e, f) {
        var g="",
        h="";
        return f&&(h=k(b)),
        !a.sameDayTimes||d||e||(g=" from "+t(b)+" - "+t(c)),
        h+i(b[1])+" "+b[0]+", "+b[2]+g
    }
    ,
    p=function(a, b, c) {
        var d="",
        e="";
        return c&&(d=k(a), e=k(b)),
        d+i(a[1])+" "+a[0]+"-"+e+b[0]+", "+a[2]
    }
    ,
    q=function(a, b, c) {
        var d="",
        e="";
        return c&&(d=k(a), e=k(b)),
        d+i(a[1])+" "+a[0]+"-"+e+i(b[1])+" "+b[0]+", "+a[2]
    }
    ,
    r=function(a, b, c) {
        var d="",
        e="";
        return c&&(d=k(a), e=k(b)),
        d+i(a[1])+" "+a[0]+", "+a[2]+"-"+e+i(b[1])+" "+b[0]+", "+b[2]
    }
    ,
    s=function(a, b, c, d, e) {
        var f="";
        return f=a[0]===b[0]?a[1]===b[1]?a[2]===b[2]?o(a, b, c, d, e): r(a, b, e): a[2]===b[2]?q(a, b, e): r(a, b, e): a[1]===b[1]?a[2]===b[2]?p(a, b, e): r(a, b, e): a[2]===b[2]?q(a, b, e): r(a, b, e)
    }
    ,
    t=function(a) {
        var b="",
        c="AM",
        d=a[3],
        e=a[4];
        return d>=12&&(c="PM", d>=13&&(d-=12)),
        0===d&&(d=12),
        e=(10>e?"0": "")+e, b=d+":"+e+c
    }
    ;
    return {
        init:function(a) {
            var c= {
                calendarUrl: "https://www.googleapis.com/calendar/v3/calendars/milan.kacurak@gmail.com/events?key=AIzaSyCR3-ptjHE-_douJsn8o20oRwkxt-zHStY", past: !0, upcoming: !0, sameDayTimes: !0, dayNames: !0, pastTopN: -1, upcomingTopN: -1, itemsTagName: "li", upcomingSelector: "#events-upcoming", pastSelector: "#events-past", upcomingHeading: "<h2>Upcoming events</h2>", pastHeading: "<h2>Past events</h2>", format: ["*date*", ": ", "*summary*", " &mdash; ", "*description*", " in ", "*location*"]
            }
            ;
            c=d(c, a),
            b(c)
        }
    }
}

();