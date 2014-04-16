/**
 * Barcode scanner emulator
 *
 */
(function(){

    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    function BarcodeScannerEmu(defaultBarcode) {
        var _defaultBarcode = defaultBarcode; // || '0010000011762';
        this.scan = function(callback) {
            if(isFunction(callback)) {
                var barcode = prompt('Enter barcode', _defaultBarcode);
                callback.call(this, {
                    text: barcode,
                    format: 'emulated',
                    cancelled: barcode === null
                });
            } else {
                throw "Invalid callback function supplied to ";
            }
        };
    }

    // Init
    window.plugins = window.plugins || {};
    window.plugins.BarcodeScannerEmu = BarcodeScannerEmu;
})();
