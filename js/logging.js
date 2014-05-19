(function(){
    var logDiv = document.getElementById('wrapper');
    var log = new HtmlLog(logDiv);
    
    log.append("Test.");
    log.append(" Test.");
    log.clear();
    log.appendLine("hello.");
    log.appendLine();
    log.appendLine("I'll be there soon.");    
})();