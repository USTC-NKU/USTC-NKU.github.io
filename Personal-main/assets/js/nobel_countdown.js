se = function() {
    var e = document.querySelectorAll(".js-countdown-content");
    Array.prototype.slice.call(e).forEach((function(e) {
        var t = e.closest(".countdown");
        if (t) {
            var n = t.dataset.due
              , r = new Date(n).toUTCString()
              , o = new Date(r).getTime()
              , i = (new Date).toUTCString()
              , a = o - new Date(i).getTime()
              , c = "Live!";
            if (a > 0) {
                e.classList.add("has-countdown");
                var l = {
                    days: Math.floor(a / 864e5),
                    hours: Math.floor(a / 36e5 % 24),
                    mins: Math.floor(a / 1e3 / 60 % 60),
                    secs: Math.floor(a / 1e3 % 60)
                };
                c = Object.keys(l).map((function(e) {
                    return '<span class="countdown-content-wrapper clock-digit">'.concat(l[e], '<span class="countdown-content-time">').concat(e, "</span></span>")
                }
                )).join(" : ").replace(/\b(\d)\b/g, "0$1"),
                e.innerHTML = c
            } else
                e.classList.remove("has-countdown"),
                e.innerHTML = document.getElementById(t.dataset.template).innerHTML.trim()
        }
    }
    ))
}
se(),
setInterval(se, 1e3)