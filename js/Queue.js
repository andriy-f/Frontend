(function () {
    // Init
    window.af = window.af || {};
     
    window.af.Queue = function () {
        var stack1 = [];
        var stack2 = [];
        this.enqueue = function (el) {
            stack1.push(el);
        };
        
        this.dequeue = function (el) {
        
            if(stack1.length === 0 && stack2.length === 0) {
                return undefined;
            }
            
            if(stack2.length > 0) {
                return stack2.pop();
            }
            
            if (stack1.length > 0) {
                // Copy from stack1 to satck2
                var len1 = stack1.length;
                while(len1 > 0) {
                    stack2.push(stack1.pop());
                    len1--;
                }
                
                return stack2.pop();
            }            
        };
    };
})();