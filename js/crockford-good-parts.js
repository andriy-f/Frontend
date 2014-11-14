(function(){
    // ==========================================================
    // Book

    // Throughout the book, a method method is used to define new methods.
    // It will be explained in Chapter 4.
    Function.prototype.method = function (name, func) {
       this.prototype[name] = func;
        return this;
    };

    // When you make a new object, you can select the object that should be its prototype.
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

    // The pseudoclassical pattern was intended to look sort of object-oriented, but it is
    // looking quite alien. We can hide some of the ugliness by using the method method
    // and defining an inherits method:
    Function.method('inherits', function (Parent) {
        this.prototype = new Parent();
        return this;
    });

    // Set up
    var Mammal = function (name) {
        this.name = name;
    };

    Mammal.prototype.get_name = function () {
        return this.name;
    };

    Mammal.prototype.says = function () {
        return this.saying || '';
    };

    function samples() {
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

        // My stuff
        function MyObjecto(data) {
            this.status = 'active';
            this.data = data;
            this[''] = 'empty string value';
        }


        var myObjecto1 = new MyObjecto();
        //console.log(myObjecto1);
        delete myObjecto1;
    }
    
    jQuery(function($){
        $('input[name="throw-ex"]').click(function(){
            throw { name: 'textEx', message: 'test-ex-message' };
            //throw 'test-ex-message';
        });

        $('#createObject').click(function () {
            // Set up
            var Animal = function (name) {
                this.name = name;
            };

            Animal.prototype.getName = function() {
                return this.name;
            };

            // Usage
            var animal = new Animal('Herb the Mammal');
            console.log('Animal name: ' + animal.getName());
        });

        $('#inheritanceSample1').click(function() {
            var stooge = {
                "first-name": "Jerome",
                "last-name": "Howard"
            };
            var another_stooge = Object.create(stooge);
            stooge.dao = { cs: 'localhost' };

            // The prototype link has no effect on updating. When we make changes to an object,
            // the object’s prototype is not touched:
            another_stooge['first-name'] = 'Harry';
            another_stooge['middle-name'] = 'Moses';
            another_stooge.nickname = 'Moe';

            console.log('This shows how change of "stooge" object also changes "another_stooge" - prototyped from "stooge" (memo field)');
            stooge.memo = 'our memo';
            console.log('stooge: ');
            console.log(stooge);
            console.log('another_stooge: ');
            console.log(another_stooge);

            delete another_stooge.nickname;
            //console.log(another_stooge);
        });

        $('#inheritanceSample2').click(function () {
            // We can make another pseudoclass that inherits from Mammal by defining its
            // constructor function and replacing its prototype with an instance of Mammal:
            var Cat = function (name) {
                this.name = name;
                this.saying = 'meow';
            };

            // Replace Cat.prototype with a new instance of Animal
            Cat.prototype = new Mammal();

            // Augment the new prototype with
            // purr and getName methods.
            Cat.prototype.purr = function(n) {
                var i, s = '';
                for (i = 0; i < n; i += 1) {
                    if (s) {
                        s += '-';
                    }
                    s += 'r';
                }
                return s;
            };

            Cat.prototype.get_name = function () {
                return this.says() + ' ' + this.name + ' ' + this.says();
            };

            // Usage
            var myCat = new Cat('Henrietta');
            var says = myCat.says(); // 'meow'
            console.log(says);
            var purr = myCat.purr(5); // 'r-r-r-r-r'
            console.log(purr);
            var name = myCat.get_name(); // 'meow Henrietta meow'
            console.log(name);
        });

        $('#inheritanceSimplerSample').click(function () {

            var Cat = function(name) {
                    this.name = name;
                    this.saying = 'meow';
                }.
                inherits(Mammal).
                method('purr', function(n) {
                    var i, s = '';
                    for (i = 0; i < n; i += 1) {
                        if (s) {
                            s += '-';
                        }
                        s += 'r';
                    }
                    return s;
                }).
                method('get_name', function() {
                    return this.says() + ' ' + this.name + ' ' + this.says();
                });

            // Usage
            var myCat = new Cat('Henrietta');
            var says = myCat.says(); // 'meow'
            console.log(says);
            var purr = myCat.purr(5); // 'r-r-r-r-r'
            console.log(purr);
            var name = myCat.get_name(); // 'meow Henrietta meow'
            console.log(name);
        });
    });
})();