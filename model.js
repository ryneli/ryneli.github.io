class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(that) {
        return new Point(this.x + that.x, this.y + that.y);
    }

    minus(that) {
        return new Point(this.x - that.x, this.y - that.y);
    }

    equal(that) {
        return this.x === that.x && this.y === that.y;
    }

    distanceToPoint(that) {
        return ((this.x - that.x)**2 + (this.y - that.y)**2)^2;
    }
}

module.exports = {Point};
