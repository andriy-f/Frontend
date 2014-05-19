// Closure

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
console.log(testScope2()());
//document.getElementById("output").innerHtml = testClosure();