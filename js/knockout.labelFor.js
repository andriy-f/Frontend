(function () {

    function hasRequiredRule(rules) {
        if (Object.prototype.toString.call(rules) !== '[object Array]') {
            return false;
        }

        var len = rules.length;
        for (var i = 0; i < len; i++) {
            if (rules[i].rule === 'required' && rules[i].params === true) {
                return true;
            }
        }

        return false;
    }

    ko.bindingHandlers.labelFor = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (!valueAccessor().rules) {
                return;
            }

            var rules = ko.unwrap(valueAccessor().rules);
            if (hasRequiredRule(rules)) {
                $(element).prepend('<span class="required-label">*</span>');
            }
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever the associated observable changes value.
            // Update the DOM element based on the supplied values here.
        }
    };
})();