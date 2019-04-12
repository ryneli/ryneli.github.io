const Geometry = require('../geometry');

describe('geometry test suite', function() {
    it("test close enough", function () {
        const n1 = 1000.001;
        const n2 = 1000.002;
        const n3 = 1200;
        expect(true).toBe(Geometry.closeEnough(n1, n2));
        expect(false).toBe(Geometry.closeEnough(n1, n3));
    });
});
