var moduleName = 'Calculate functionality';
QUnit.module(moduleName);
QUnit.test('convertAmountToLot()', function (assert) {
    var act;
    var exp;

    var amount;
    var marketindex;
    var name;

    // #1 Currency, AUDCAD
    amount = 1;
    marketindex = "Currency";
    name = "AUDCAD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 0.00001;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 258963;
    marketindex = "Currency";
    name = "AUDCAD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 2.58963;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 1000000;
    marketindex = "Currency";
    name = "AUDCAD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 10;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #2 Index, DOWUSD
    amount = 1;
    marketindex = "Index";
    name = "DOWUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 0.01;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 258963;
    marketindex = "Index";
    name = "DOWUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 2589.63;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 1000000;
    marketindex = "Index";
    name = "DOWUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 10000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #3 Commodity, DOWUSD
    amount = 1;
    marketindex = "Commodity";
    name = "XPTUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 0.01;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 258963;
    marketindex = "Commodity";
    name = "XPTUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 2589.63;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 1000000;
    marketindex = "Commodity";
    name = "XPTUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 10000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #4 NotImportant, DOWUSD
    amount = 1;
    marketindex = "NotImportant";
    name = "XNGUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 0.0001;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 258963;
    marketindex = "NotImportant";
    name = "XNGUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 25.8963;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 1000000;
    marketindex = "NotImportant";
    name = "XNGUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 100;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #5 NotImportant, UKOUSD
    amount = 1;
    marketindex = "NotImportant";
    name = "UKOUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 0.001;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 258963;
    marketindex = "NotImportant";
    name = "UKOUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 258.963;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 1000000;
    marketindex = "NotImportant";
    name = "UKOUSD";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 1000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #5 NotImportant, NKYJPY
    amount = 1;
    marketindex = "NotImportant";
    name = "NKYJPY";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 0.01;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 258963;
    marketindex = "NotImportant";
    name = "NKYJPY";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 2589.63;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 1000000;
    marketindex = "NotImportant";
    name = "NKYJPY";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 10000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #6 NotImportant, IBXEUR
    amount = 1;
    marketindex = "NotImportant";
    name = "IBXEUR";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 0.01;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 258963;
    marketindex = "NotImportant";
    name = "IBXEUR";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 2589.63;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = 1000000;
    marketindex = "NotImportant";
    name = "IBXEUR";
    act = convertAmountToLot (amount, marketindex, name);
    exp = 10000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #7 NotImportant, FromHead
    amount = 1;
    marketindex = "NotImportant";
    name = "FromHead";
    act = convertAmountToLot (amount, marketindex, name);
    exp = false;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    amount = null;
    marketindex = null;
    name = null;
    act = convertAmountToLot (amount, marketindex, name);
    exp = undefined;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;
});

QUnit.test('convertLotToAmount()', function (assert) {
    var act;
    var exp;

    var lot;
    var marketindex;
    var name;

    // #1 Currency, AUDCAD
    lot = 1;
    marketindex = "Currency";
    name = "AUDCAD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 258963;
    marketindex = "Currency";
    name = "AUDCAD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 25896300000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 1000000;
    marketindex = "Currency";
    name = "AUDCAD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100000000000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #2 Index, DOWUSD
    lot = 1;
    marketindex = "Index";
    name = "DOWUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 258963;
    marketindex = "Index";
    name = "DOWUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 25896300;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 1000000;
    marketindex = "Index";
    name = "DOWUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100000000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #3 Commodity, DOWUSD
    lot = 1;
    marketindex = "Commodity";
    name = "XPTUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 258963;
    marketindex = "Commodity";
    name = "XPTUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 25896300;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 1000000;
    marketindex = "Commodity";
    name = "XPTUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100000000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #4 NotImportant, DOWUSD
    lot = 1;
    marketindex = "NotImportant";
    name = "XNGUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 10000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 258963;
    marketindex = "NotImportant";
    name = "XNGUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 2589630000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 1000000;
    marketindex = "NotImportant";
    name = "XNGUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 10000000000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #5 NotImportant, UKOUSD
    lot = 1;
    marketindex = "NotImportant";
    name = "UKOUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 1000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 258963;
    marketindex = "NotImportant";
    name = "UKOUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 258963000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 1000000;
    marketindex = "NotImportant";
    name = "UKOUSD";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 1000000000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #5 NotImportant, NKYJPY
    lot = 1;
    marketindex = "NotImportant";
    name = "NKYJPY";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 258963;
    marketindex = "NotImportant";
    name = "NKYJPY";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 25896300;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 1000000;
    marketindex = "NotImportant";
    name = "NKYJPY";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100000000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #6 NotImportant, IBXEUR
    lot = 1;
    marketindex = "NotImportant";
    name = "IBXEUR";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 258963;
    marketindex = "NotImportant";
    name = "IBXEUR";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 25896300;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = 1000000;
    marketindex = "NotImportant";
    name = "IBXEUR";
    act = convertLotToAmount (lot, marketindex, name);
    exp = 100000000;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    // #7 NotImportant, FromHead
    lot = 1;
    marketindex = "NotImportant";
    name = "FromHead";
    act = convertLotToAmount (lot, marketindex, name);
    exp = false;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;

    lot = null;
    marketindex = null;
    name = null;
    act = convertLotToAmount (lot, marketindex, name);
    exp = undefined;
    assert.ok(act === exp, "Expected: " + exp + ", was: " + act) ;
});
