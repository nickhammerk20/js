var moduleName = 'Test Number to Alphabit';
QUnit.module(moduleName);
QUnit.test('numToChar()', function (assert) {
    var act;
    var exp;

    // #1 Currency, AUDCAD
    act = numToChar (1111199);
    exp = "LLTJ";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (0);
    exp = 'A';
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (9871823);
    exp = "JIHSX";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (2410008);
    exp = "YKAAI";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (9999990);
    exp = "JJJJJJA";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // debugger;
    act = numToChar (-444410026);
    exp = "EEEEKACG";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar ("1721");
    exp = "RV";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar ();
    exp = "";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;
});

QUnit.test('numToChar2()', function (assert) {
    var act;
    var exp;

    // #1 Currency, AUDCAD
    act = numToChar (1111199);
    exp = "LLTJ";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (0);
    exp = 'A';
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (9871823);
    exp = "JIHSX";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (2410008);
    exp = "YKAAI";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar (9999990);
    exp = "JJJJJJA";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // debugger;
    act = numToChar (-444410026);
    exp = "EEEEKACG";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar ("1721");
    exp = "RV";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    act = numToChar ();
    exp = "";
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;
});
