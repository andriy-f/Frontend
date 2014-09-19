(function() {

    QUnit.test("store and retrieve string test", function (assert) {
        var testval = 'value12343';
        frontend.settings.set('test1', testval);
        assert.ok(testval === frontend.settings.get('test1'), "store and retrieve OK");
    });

    QUnit.test("store and remove string test", function (assert) {
        var testval = 'dsfdsgf34324234';
        frontend.settings.set('test2', testval);
        frontend.settings.remove('test2');
        assert.ok(null === frontend.settings.get('test2'), "store and remove OK");
    });
})();
