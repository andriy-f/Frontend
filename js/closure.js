// Closure #1

// 
window.console = window.console || {};
console.log = console.log || function() {};

var scope = "global";

function testScope1() {
    var scope = "local";
    function innerScope() {
        return scope;
    }
    
    return innerScope();
}

function testScope2() {
    var scope = "local2";
    function innerScope2() {
        return scope;
    }
    
    return innerScope2;
}

var scope = "global2";

console.log(testScope1());
console.log(testScope2()()); // Function is called here but local scope is used, because function returned with it's scope.

// =======================
// Closure sample #2
// =======================
var x = 50;

function testXY() {
    var y = 100;
    return x + y;
}

x = 75;

console.log(testXY()); // Uh oh 175, not 150!
//document.getElementById("output").innerHtml = testClosure();