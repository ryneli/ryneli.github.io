const Geometry = require('../geometry');
const Model = require('../model');

describe('model test suite', function() {
    it ("Point init", function() {
        const p = new Model.Point(0, 1);
        expect(true).toBe(0 === p.x && 1 === p.y);
    });
    it("Point to point plus/minus", function () {
        const p1 = new Model.Point(0,0);
        const p2 = new Model.Point(1,0);
        expect(true).toBe(p1.minus(p1).equal(new Model.Point(0, 0)));
        expect(true).toBe(p1.minus(p2).equal(new Model.Point(-1, 0))); 
        expect(true).toBe(p1.plus(p2).equal(new Model.Point(1, 0)));
    });

    it("Point to point distance", function() {
        const p1 = new Model.Point(0,0);
        const p2 = new Model.Point(2,2);
        expect(true).toBe(Geometry.closeEnough(p1.distanceToPoint(p2), 8^2));
    });
});
