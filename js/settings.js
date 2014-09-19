(function() {

    function isUndef(val) {
        return typeof val === 'undefined';
    }

    function isUndefOrNull(val) {
        return typeof val === 'undefined' || val === null;
    }
    

    function isEmptyVal(val) {
        return typeof val === 'undefined' || val === null || val === '';
    }

    // All settings are currently saved on client side, in the future some may be saved on server
    var defaultSettings = {
        optionType: 'object' // possible values: bare, object, array
    };

    function getType(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function SettingsModel() {
        var self = this;

        self.set = function(key, value, specifiedType) {
            var type = specifiedType || getType(value);
            var valueToSave = isUndef(value) ? null : value;
            switch (type) {
            case 'object':
            case 'array':
                localStorage.setItem(key, valueToSave !== null ? JSON.stringify(valueToSave) : null);
                break;
            default:
                localStorage.setItem(key, valueToSave);
            }
        };

        self.get = function(key, type) {
            // localStorage.getItem returns string-like objects or null

            switch (type) {
            case 'object':
            case 'array':
                var savedData = localStorage.getItem(key);
                return (isEmptyVal(savedData) || savedData === 'undefined') ? null : JSON.parse(savedData);
            default:
                return localStorage.getItem(key);
            }
        };

        self.remove = function(key) {
            return localStorage.removeItem(key);
        };

        self.getBareComputed = function(settingName, defaultValue) {

            var initialValue = self.get(settingName);
            // If setting is not set and default value is set
            if (initialValue === null && typeof defaultValue !== 'undefined') {
                initialValue = defaultValue;
            }

            var current = ko.observable(initialValue);
            return ko.computed({
                read: function() {
                    return current();
                },
                write: function(newVal) {
                    current(newVal);
                    self.set(settingName, newVal);
                }
            });
        }

        self.getComputed = function(settingName, options, propertyName, defaultValue) {
            var isBare = isEmptyVal(propertyName);
            var currentSettingValue = self.get(settingName);
            var initialValue = null;
            if (Object.prototype.toString.call(options) === '[object Array]') {
                initialValue = options.find(function(el) {
                    var val = ko.unwrap(isBare ? el : el[propertyName]);
                    return val == currentSettingValue;
                });
            }

            // If initial value is empty and defaultValue is set -> fill initialValue with default Value
            if (isEmptyVal(initialValue) && !isEmptyVal(defaultValue)) {
                initialValue = defaultValue;
            }

            var current = ko.observable(initialValue);
            return ko.computed({
                read: function() {
                    return current();
                },
                write: function(newVal) {
                    current(newVal);
                    var newSettingValue = isBare ? newVal :
                    (newVal ? ko.unwrap(newVal[propertyName]) : null);
                    self.set(settingName, newSettingValue);
                }
            });
        }

        /*
                string settingName: setting name
                object userSettings: {
                    array options: possible options for value. initial observable's value is chosen from this set, based on propertyName
	                string|null propertyName: name of [string]property of single option which will be stored in persistent storage
                    any defaultValue: if setting is not yet stored in persistent storage, this will be observable's value
                    bool multiSelect: true if user wants to use observableArray and be able to choose multiple options simultaneously
                    string optionType: name of option's type,
                    string|null propertyName: name of [string] proprty of option which will be persisted in storage
                    bool deferEvaluation: property for computedObservable, se knockout docs
                }
            */
        self.getComputedAdvanced = function(settingName, userSettings) {
            if (isEmptyVal(settingName)) {
                throw 'settingName is required';
            }

            var settings = jQuery.extend({}, defaultSettings, userSettings);
            var itemsAreBare = isEmptyVal(settings.propertyName);

            // Determining type of value which will be persisted in settings
            var optionType;
            if (settings.optionType) {
                optionType = settings.optionType;
            } else {
                var optionSample = settings.options && settings.options.length > 0 ? settings.options[0] : (settings.defaultValue || undefined);
                var settingValueSample = itemsAreBare ? optionSample :
                (!isEmptyVal(optionSample) ? optionSample[settings.propertyName] : undefined);
                optionType = getType(settingValueSample);
            }

            var currentSettingValue = self.get(settingName, settings.multiSelect ? 'array' : optionType);
            var initialValue = null;
            // fill initialValue based on data in storage
            if (!isUndefOrNull(currentSettingValue) && Object.prototype.toString.call(settings.options) === '[object Array]') {
                if (settings.multiSelect) {
                    var savedValuesSet = {}; // object with properties equal to values in currentSettingValue array
                    currentSettingValue.forEach(function(val) {
                        savedValuesSet[val] = true;
                    });

                    // filter those options whose property values are in savedValuesSet
                    initialValue = settings.options.filter(function(el) {
                        var val = ko.unwrap(itemsAreBare ? el : el[settings.propertyName]);
                        return savedValuesSet[val] === true;
                    });
                } else {
                    initialValue = settings.options.find(function(el) {
                        var val = ko.unwrap(itemsAreBare ? el : el[settings.propertyName]);
                        return val == currentSettingValue;
                    });
                }
            }

            // If initial value is empty and defaultValue is set -> fill initialValue with default Value
            if (isEmptyVal(initialValue) && !isEmptyVal(settings.defaultValue)) {
                initialValue = settings.defaultValue;
            }

            var current = settings.multiSelect ? ko.observableArray(initialValue) : ko.observable(initialValue);
            return ko.computed({
                read: function() {
                    return current();
                },
                write: function(newVal) {
                    current(newVal);
                    if (settings.multiSelect) {
                        // newVal is array
                        var newSettingValues = newVal.map(function(el) {
                            return itemsAreBare ? el : (el ? ko.unwrap(el[settings.propertyName]) : null);
                        });
                        self.set(settingName, newSettingValues, 'array');
                    } else {
                        var newSettingValue = itemsAreBare ? newVal :
                        (newVal ? ko.unwrap(newVal[settings.propertyName]) : null);
                        self.set(settingName, newSettingValue, optionType);
                    }
                },
                deferEvaluation: settings.deferEvaluation
            });
        }
    };

    window.frontend = window.frontend || {};
    frontend.settings = new SettingsModel();
})();
