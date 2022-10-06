var RENDERER = {
        INIT_CHERRY_BLOSSOM_COUNT: 30,
        MAX_ADDING_INTERVAL: 10,
        init: function() { this.setParameters(), this.reconstructMethods(), this.createCherries(), this.render() },
        setParameters: function() { this.$container = $("#jsi-cherry-container"), this.width = this.$container.width(), this.height = this.$container.height(), this.context = $("<canvas />").attr({ width: this.width, height: this.height }).appendTo(this.$container).get(0).getContext("2d"), this.cherries = [], this.maxAddingInterval = Math.round(1e3 * this.MAX_ADDING_INTERVAL / this.width), this.addingInterval = this.maxAddingInterval },
        reconstructMethods: function() { this.render = this.render.bind(this) },
        createCherries: function() { for (var t = 0, h = Math.round(this.INIT_CHERRY_BLOSSOM_COUNT * this.width / 1e3); t < h; t++) this.cherries.push(new CHERRY_BLOSSOM(this, !0)) },
        render: function() {
            requestAnimationFrame(this.render), this.context.clearRect(0, 0, this.width, this.height), this.cherries.sort((function(t, h) { return t.z - h.z }));
            for (var t = this.cherries.length - 1; t >= 0; t--) this.cherries[t].render(this.context) || this.cherries.splice(t, 1);
            0 == --this.addingInterval && (this.addingInterval = this.maxAddingInterval, this.cherries.push(new CHERRY_BLOSSOM(this, !1)))
        }
    },
    CHERRY_BLOSSOM = function(t, h) { this.renderer = t, this.init(h) };
CHERRY_BLOSSOM.prototype = {
    FOCUS_POSITION: 300,
    FAR_LIMIT: 600,
    MAX_RIPPLE_COUNT: 100,
    RIPPLE_RADIUS: 100,
    SURFACE_RATE: .5,
    SINK_OFFSET: 20,
    init: function(t) {
        this.x = this.getRandomValue(-this.renderer.width, this.renderer.width), this.y = t ? this.getRandomValue(0, this.renderer.height) : 1.5 * this.renderer.height, this.z = this.getRandomValue(0, this.FAR_LIMIT), this.vx = this.getRandomValue(-2, 2), this.vy = -2, this.theta = this.getRandomValue(0, 2 * Math.PI), this.phi = this.getRandomValue(0, 2 * Math.PI), this.psi = 0, this.dpsi = this.getRandomValue(Math.PI / 600, Math.PI / 300), this.opacity = 0, this.endTheta = !1, this.endPhi = !1, this.rippleCount = 0;
        var h = this.getAxis(),
            i = this.theta + Math.ceil(-(this.y + this.renderer.height * this.SURFACE_RATE) / this.vy) * Math.PI / 500;
        i %= 2 * Math.PI, this.offsetY = 40 * (i <= Math.PI / 2 || i >= 3 * Math.PI / 2 ? -1 : 1), this.thresholdY = this.renderer.height / 2 + this.renderer.height * this.SURFACE_RATE * h.rate, this.entityColor = this.renderer.context.createRadialGradient(0, 40, 0, 0, 40, 80), this.entityColor.addColorStop(0, "hsl(330, 70%, " + 50 * (.3 + h.rate) + "%)"), this.entityColor.addColorStop(.05, "hsl(330, 40%," + 55 * (.3 + h.rate) + "%)"), this.entityColor.addColorStop(1, "hsl(330, 20%, " + 70 * (.3 + h.rate) + "%)"), this.shadowColor = this.renderer.context.createRadialGradient(0, 40, 0, 0, 40, 80), this.shadowColor.addColorStop(0, "hsl(330, 40%, " + 30 * (.3 + h.rate) + "%)"), this.shadowColor.addColorStop(.05, "hsl(330, 40%," + 30 * (.3 + h.rate) + "%)"), this.shadowColor.addColorStop(1, "hsl(330, 20%, " + 40 * (.3 + h.rate) + "%)")
    },
    getRandomValue: function(t, h) { return t + (h - t) * Math.random() },
    getAxis: function() { var t = this.FOCUS_POSITION / (this.z + this.FOCUS_POSITION); return { rate: t, x: this.renderer.width / 2 + this.x * t, y: this.renderer.height / 2 - this.y * t } },
    renderCherry: function(t, h) { t.beginPath(), t.moveTo(0, 40), t.bezierCurveTo(-60, 20, -10, -60, 0, -20), t.bezierCurveTo(10, -60, 60, 20, 0, 40), t.fill(); for (var i = -4; i < 4; i++) t.beginPath(), t.moveTo(0, 40), t.quadraticCurveTo(12 * i, 10, 4 * i, 2 * Math.abs(i) - 24), t.stroke() },
    render: function(t) {
        var h = this.getAxis();
        if (h.y == this.thresholdY && this.rippleCount < this.MAX_RIPPLE_COUNT && (t.save(), t.lineWidth = 2, t.strokeStyle = "hsla(0, 0%, 100%, " + (this.MAX_RIPPLE_COUNT - this.rippleCount) / this.MAX_RIPPLE_COUNT + ")", t.translate(h.x + this.offsetY * h.rate * (this.theta <= Math.PI ? -1 : 1), h.y), t.scale(1, .3), t.beginPath(), t.arc(0, 0, this.rippleCount / this.MAX_RIPPLE_COUNT * this.RIPPLE_RADIUS * h.rate, 0, 2 * Math.PI, !1), t.stroke(), t.restore(), this.rippleCount++), (h.y < this.thresholdY || !this.endTheta || !this.endPhi) && (this.y <= 0 && (this.opacity = Math.min(this.opacity + .01, 1)), t.save(), t.globalAlpha = this.opacity, t.fillStyle = this.shadowColor, t.strokeStyle = "hsl(330, 30%," + 40 * (.3 + h.rate) + "%)", t.translate(h.x, Math.max(h.y, this.thresholdY + this.thresholdY - h.y)), t.rotate(Math.PI - this.theta), t.scale(h.rate * -Math.sin(this.phi), h.rate), t.translate(0, this.offsetY), this.renderCherry(t, h), t.restore()), t.save(), t.fillStyle = this.entityColor, t.strokeStyle = "hsl(330, 40%," + 70 * (.3 + h.rate) + "%)", t.translate(h.x, h.y + Math.abs(this.SINK_OFFSET * Math.sin(this.psi) * h.rate)), t.rotate(this.theta), t.scale(h.rate * Math.sin(this.phi), h.rate), t.translate(0, this.offsetY), this.renderCherry(t, h), t.restore(), this.y <= -this.renderer.height / 4) {
            if (!this.endTheta)
                for (var i = Math.PI / 2, e = 3 * Math.PI / 2; i <= e; i += Math.PI)
                    if (this.theta < i && this.theta + Math.PI / 200 > i) { this.theta = i, this.endTheta = !0; break }
            if (!this.endPhi) {
                var s = Math.PI / 8;
                for (e = 7 * Math.PI / 8; s <= e; s += 3 * Math.PI / 4)
                    if (this.phi < s && this.phi + Math.PI / 200 > s) { this.phi = Math.PI / 8, this.endPhi = !0; break }
            }
        }
        return this.endTheta || (h.y == this.thresholdY ? this.theta += Math.PI / 200 * (this.theta < Math.PI / 2 || this.theta >= Math.PI && this.theta < 3 * Math.PI / 2 ? 1 : -1) : this.theta += Math.PI / 500, this.theta %= 2 * Math.PI), this.endPhi ? this.rippleCount == this.MAX_RIPPLE_COUNT && (this.psi += this.dpsi, this.psi %= 2 * Math.PI) : (this.phi += Math.PI / (h.y == this.thresholdY ? 200 : 500), this.phi %= Math.PI), this.y <= -this.renderer.height * this.SURFACE_RATE ? (this.x += 2, this.y = -this.renderer.height * this.SURFACE_RATE) : (this.x += this.vx, this.y += this.vy), this.z > -this.FOCUS_POSITION && this.z < this.FAR_LIMIT && this.x < 1.5 * this.renderer.width
    }
}, $((function() { RENDERER.init() }));