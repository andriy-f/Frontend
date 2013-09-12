if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

var empty_object = {};
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};
var another_stooge = Object.create(stooge);

// regex play
var lanidRegex = new RegExp("^(AD|ad|Ad)\([a-zA-Z]+)$");
var res = lanidRegex.test("AD\loginid");
window.console && console.log(res);