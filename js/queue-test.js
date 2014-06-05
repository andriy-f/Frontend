(function(){
    // Init
    window.af = window.af || {};
    var promptFunc = window.af.prompt || (window.console ? console.log : function () {});
    
    /**
    * test queue (array in JS)
    **/
    window.queueNativeTest1 = function () {
        var arr = [];
        var val = null;
        promptFunc('Enter items');
        
        // Fill queue
        do {
            val = prompt('Enter item', 'something');
            if(val === null) {
                break;
            }
            
            arr.push(val);
        } while (true);
        
        promptFunc('Items in queue:');
                
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            promptFunc(arr.shift());
        }
    };
    
    window.queueNativeTest2 = function () {
        promptFunc('queueNativeTest2');
        
        var arr = [];        
        for (var i = 0; i < 50000; i++) {
            arr.push(i);
        }
                
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var val = arr.shift();
            //promptFunc(val);
        }
    };
    
    window.queueOfTwoStacksTest1 = function () {
        var queue = new window.af.Queue();
        for (var i = 0; i < 50000; i++) {
            queue.enqueue(i);
        }
                
        var item;
        do {
            item = queue.dequeue();
            if(typeof item === 'undefined') break;
            //promptFunc(item);
        } while (true);
    };
})();