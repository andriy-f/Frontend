(function(){
    // Book

    // Throughout the book, a method method is used to define new methods.
    // It will be explained in Chapter 4.
    Function.prototype.method = function (name, func) {
       this.prototype[name] = func;
        return this;
    };

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
    
    
    jQuery(function($){
        $('input[name="throw-ex"]').click(function(){
            throw {name: 'textEx', message: 'test-ex-message'};
            //throw 'test-ex-message';
        });
    });
})();