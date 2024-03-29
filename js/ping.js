/* ping.js - v0.2.2 http://github.com/alfg/ping.js */
var Ping = function(a) {
    this.opt = a || {},
    this.favicon = this.opt.favicon || "/favicon.ico",
    this.timeout = this.opt.timeout || 0,
    this.logError = this.opt.logError || !1
};
Ping.prototype.ping = function(a, b) {
    function c(a) {
        f.wasSuccess = !0,
        e.call(f, a)
    }
    function d(a) {
        f.wasSuccess = !1,
        e.call(f, a)
    }
    function e() {
        g && clearTimeout(g);
        var a = new Date - h;
        if ("function" == typeof b)
            return this.wasSuccess ? b(null, a) : (f.logError && console.error("error loading resource"),
            b("error", a))
    }
    var f = this;
    f.wasSuccess = !1,
    f.img = new Image,
    f.img.onload = c,
    f.img.onerror = d;
    var g, h = new Date;
    f.timeout && (g = setTimeout(function() {
        e.call(f, void 0)
    }, f.timeout)),
    f.img.src = a + f.favicon + "?" + +new Date
}
,
"undefined" != typeof exports ? "undefined" != typeof module && module.exports && (module.exports = Ping) : window.Ping = Ping;
