(function(){
    // ==========================================================
    // Book

    // Throughout the book, a method method is used to define new methods.
    // It will be explained in Chapter 4.
    Function.prototype.method = function (name, func) {
       this.prototype[name] = func;
        return this;
    };

    // When youmake a new object, youcan select the object that should be its prototype.
    // The mechanism that JavaScript provides to do this is messy and complex, but it can
    // be significantly simplified. We will add a create method to the Object function. The
    // create method creates a new object that uses an old object as its prototype. There
    // will be much more about functions in the next chapter.
    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            var F = function () {};
            F.prototype = o;
            return new F();
        };
    }

    var stooge = {
        "first-name": "Jerome",
        "last-name": "Howard"
    };
    var another_stooge = Object.create(stooge);
    stooge.dao = {cs: 'localhost'};
    
    // The prototype link has no effect on updating. When we make changes to an object,
    // the object’s prototype is not touched:
    another_stooge['first-name'] = 'Harry';
    another_stooge['middle-name'] = 'Moses';
    another_stooge.nickname = 'Moe';
    
    console.log('This shows how change of "stooge" object also changes "another_stooge" - prototyped from "stooge" (memo field)' );
    stooge.memo = 'our memo';
    console.log('stooge: ');
    console.log(stooge);
    console.log('another_stooge: ');
    console.log(another_stooge);
    
    delete another_stooge.nickname;
    //console.log(another_stooge);
    
    // Features
    var status = stooge.status || "unknown"; // default value
    var nex = stooge.deo && stooge.deo.cs; // guard against 'type error'
    var ex = stooge.dao && stooge.dao.cs;
    
    console.log('nex: ' + nex + ' ex: ' + ex);
    
    var flight = {
        airline: "Oceanic",
        number: 815,
        departure: {
            IATA: "SYD",
            time: "2004-09-22 14:55",
            city: "Sydney"
        },
        arrival: {
            IATA: "LAX",
            time: "2004-09-23 10:42",
            city: "Los Angeles"
        }
    };
    // =================================
    // My stuff
    function MyObjecto(data) {
        this.status = 'active';
        this.data = data;
        this[''] = 'empty string value';
    }
    
    
    var myObjecto1 = new MyObjecto();
    //console.log(myObjecto1);
    delete myObjecto1;
    
    jQuery(function($){
        $('input[name="throw-ex"]').click(function(){
            throw {name: 'textEx', message: 'test-ex-message'};
            //throw 'test-ex-message';
        });
    });
})();