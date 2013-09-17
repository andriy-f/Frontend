// regex play
var lanidRegex = new RegExp("^(AD|ad|Ad)\([a-zA-Z]+)$");
var res = lanidRegex.test("AD\loginid");
window.console && console.log(res);