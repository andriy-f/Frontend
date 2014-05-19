(function(){

    function stringOrNone(something) {
        return (typeof something === "string" ? something : "");
    }

    window.HtmlLog = function (element) {        
        if (!element || !element.innerHTML) {
            throw "Invalid HTML DOM element";
        }
        
        var loggingEl = element;
        this.append = function(str) {
            loggingEl.innerHTML += stringOrNone(str);
        };
        this.appendLine = function(str) {
            loggingEl.innerHTML += stringOrNone(str) + "<br>";
        };
        this.clear = function(str) {
            loggingEl.innerHTML = "";
        };
    };
})();