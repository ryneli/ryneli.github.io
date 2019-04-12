const EPSILON = 1E-3;
function closeEnough(n1, n2) {
    return Math.abs(n1-n2) < EPSILON;
}

module.exports = {closeEnough};
