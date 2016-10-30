var rangeInterval = null,
orderPriceInterval = null,
orderNewPriceInterval = null;
instant = null;


function calcPnL(active, direction, openValue, bid, ask, amount) {
    var pnl = 0;
    if (bid == '---') bid = 0;
    if (ask == '---') ask = 0;
    openValue = parseFloat(openValue);
    switch (direction) {
        case "SELL":

            if (active.substring(3, 6) == AccountCurrency) {
                pnl = -(ask - openValue) * amount;
            } else if (active.substring(0, 3) == AccountCurrency) {
                pnl = -(ask - openValue) * amount / ((bid + ask) / 2);
            } else {
                var val1 = active.substring(0, 3);
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    pnl = -(ask - openValue) * amount / parseFloat(crossUSD);
                } else {
                    pnl = -(ask - openValue) * amount * parseFloat(-crossUSD);
                }
            }
            break;
        case "BUY":
            if (active.substring(3, 6) == AccountCurrency) {
                pnl = (bid - openValue) * amount;
            } else if (active.substring(0, 3) == AccountCurrency) {
                pnl = (bid - openValue) * amount / ((ask + bid) / 2);
            } else {
                var val1 = active.substring(0, 3);
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    pnl = (bid - openValue) * amount / parseFloat(crossUSD);
                } else {
                    pnl = (bid - openValue) * amount * parseFloat(-crossUSD);
                }
            }
            break;
    }
    return pnl;

}

function calcPnLRange(active, direction, openValue, value, bid, ask, amount) {
    var pnl = 0;
    if (bid == '---') bid = 0;
    if (ask == '---') ask = 0;
    openValue = parseFloat(openValue);
    switch (direction) {
        case "SELL":
            if (active.substring(3, 6) == AccountCurrency) {
                pnl = -(value - openValue) * amount;
            } else if (active.substring(0, 3) == AccountCurrency) {
                pnl = -(value - openValue) * amount / ((bid + ask) / 2);
            } else {
                var val1 = active.substring(0, 3);
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    pnl = -(value - openValue) * amount / parseFloat(crossUSD);
                } else {
                    pnl = -(value - openValue) * amount * parseFloat(-crossUSD);
                }
            }
            break;
        case "BUY":
            if (active.substring(3, 6) == AccountCurrency) {
                pnl = (value - openValue) * amount;
            } else if (active.substring(0, 3) == AccountCurrency) {
                pnl = (value - openValue) * amount / ((ask + bid) / 2);
            } else {
                var val1 = active.substring(0, 3);
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    pnl = (value - openValue) * amount / parseFloat(crossUSD);
                } else {
                    pnl = (value - openValue) * amount * parseFloat(-crossUSD);
                }
            }
            break;
    }
    return pnl;

}

function getPNL(active, amount, price, startval, bid, ask) {
    price = parseFloat(price);
    startval = parseFloat(startval);
    bid = parseFloat(bid);
    ask = parseFloat(ask);
    amount = parseFloat(amount);
    var pnl = 0;
    if (active.substring(3, 6) == AccountCurrency) {
        pnl = -(price - startval) * amount;
    } else if (active.substring(0, 3) == AccountCurrency) {
        pnl = -(price - startval) * amount / ((bid + ask) / 2);
    } else {
        var val1 = active.substring(0, 3);
        var val2 = active.substring(3, 6);
        var crossUSD = getCrossCourse(val2);
        if (crossUSD > 0) {
            pnl = -(price - startval) * amount / parseFloat(crossUSD);
        } else {
            pnl = -(price - startval) * amount * parseFloat(-crossUSD);
        }
    }
    return pnl;
}

function getCrossCourse(currency) {
    var mid = 1;
    var bid, ask;

    if (LoadedRates.length > 0) {
        $.each(LoadedRates, function(index) {
            if (AccountCurrency == LoadedRates[index][1].substring(0, 3) && currency == LoadedRates[index][1].substring(3, 6)) {
                bid = parseFloat(LoadedRates[index][3]) || 0;
                ask = parseFloat(LoadedRates[index][4]) || 0;

                mid = (bid + ask) / 2;
                return false;
            }
            if (AccountCurrency == LoadedRates[index][1].substring(3, 6) && currency == LoadedRates[index][1].substring(0, 3)) {
                bid = parseFloat(LoadedRates[index][3]) || 0;
                ask = parseFloat(LoadedRates[index][4]) || 0;
                mid = -(bid + ask) / 2;
                return false;
            }
        });
    }
    return mid.toFixed(5);
}

function removeInterval(interval) {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function calculateOpenRange(id,instant,operation) {
    isCalculate = true;
    removeInterval(rangeInterval);
    rangeInterval = setInterval(function () {
        calcDealRange(id, instant, operation);
    }, 500);
}

function calculateOrderRange(id) {
    removeInterval(orderPriceInterval);
    orderPriceInterval = setInterval('calcOrderRange(' + id + ')', 500);
}

function checkStopLossRangeInstant
(direction, price, dindex, stopRangeEl, inputStop, enteredVal, rangeType,
                                   active, openPrice, bid, ask, amount, currPnl, isOrder, instant) {

    var stopRangeSlInstant = $('#dealRangeInstant')[0];
    var inputStop = $("#enteredStopLoss");
    var lossMin, lossMax;
    appendRemoveButtonListener(hadValidGlobal, "sl");
    if (rangeType == 'rate') {
        var st = getPriceStopTakeRange(direction, price, dindex);
        if (st.length > 1) {
            lossMin = st[0][0];
            lossMax = st[0][1];
        }

        if (stopRangeSlInstant)
        {
            stopRangeSlInstant.innerHTML = lossMin + " - " + lossMax;
            $("#stopRangeSlInstant").attr("class","dealRangeInstant");
        }

        var r = (checkStopTake(enteredVal, 0, st));

        if (r[0][0]) {
            inputStop.attr('class', 'instantInput');
            return true;
        } else {
            inputStop.attr('class', 'instantInput error');
            return false;
        }
    }

    else 
    {
        st = getAmountStopTakeRange(active, direction, openPrice, bid, ask, amount, currPnl, isOrder);
        if (st.length > 1) {
            lossMin = st[0][0];
            lossMax = st[0][1];

            if (parseFloat(lossMin) == 0 && parseFloat(lossMax) == 0) {
                if (stopRangeSlInstant) {
                    stopRangeSlInstant.innerHTML = 'N/A';
                    $("#stopRangeSlInstant").attr("class","dealRangeInstant");
                }

            } else {
                if (stopRangeSlInstant) {
                    if(lossMin == 0)
                    {
                        lossMin = 0.01;
                    }
                    stopRangeSlInstant.innerHTML = lossMin + " - " + lossMax;
                    $("#stopRangeSlInstant").attr("class","dealRangeInstant");
                }
            }
        }

        if(st[0][0] == 0){
            st[0][0] = 0.01;
        }
        var r = (checkStopTake(enteredVal, 0, st));
        if (r[0][0]) {
            inputStop.attr('class', 'instantInput');
            return true;
        } else {
            inputStop.attr('class', 'instantInput error');
            return false;
        }
    }

}

function checkStopLossRange
(direction, price, dindex, stopRangeEl, inputStop, enteredVal, rangeType,
 active, openPrice, bid, ask, amount, currPnl, isOrder, instant) {
    var lossMin, lossMax;

    if (rangeType == 'rate') {
        st = getPriceStopTakeRange(direction, price, dindex);
        if (st.length > 1) {
            lossMin = st[0][0];
            lossMax = st[0][1];
            stopRangeEl.innerHTML = '[' + lossMin + '-' + lossMax + ']';

        } else {
            stopRangeEl.innerHTML = '';
            return true;
        }
        var r = (checkStopTake(enteredVal, 0, st))
        if (r[0][0]) {
            inputStop.attr('class', 'dlgInput');
            return true;
        } else {
            inputStop.attr('class', 'dlgInput error');
            return false;
        }
    }
    else {
        st = getAmountStopTakeRange(active, direction, openPrice, bid, ask, amount, currPnl, isOrder);
        if (st.length > 1) {
            lossMin = st[0][0];
            lossMax = st[0][1];
            if (parseFloat(lossMin) == 0 && parseFloat(lossMax) == 0) {
                stopRangeEl.innerHTML = '[not allowed]';
            } else {
                stopRangeEl.innerHTML = '[' + lossMin + '-' + lossMax + ']';
            }

        } else {
            stopRangeEl.innerHTML = '';
            return true;
        }
        var r = (checkStopTake(enteredVal, 0, st));
        if (r[0][0]) {
            inputStop.attr('class', 'dlgInput');
            return true;
        } else {
            inputStop.attr('class', 'dlgInput error');
            return false;
        }
    }

}

function checkTakeProfitRangeInstant(direction, price, dindex, takeRangeEl, inputTake, enteredVal, rangeType,
    active, openPrice, bid, ask, amount, currPnl, isOrder) {

    var takeRangeTpInstant = $('#dealTakeRangeInstant')[0];
    var inputTake = $("#enteredTakeProfit");
    var takeMin, takeMax;
    appendRemoveButtonListener(hadValidGlobal, "tp");
    if (rangeType == 'rate') {
        st = getPriceStopTakeRange(direction, price, dindex);
        if (st.length > 1) {
            takeMin = st[1][0];
            takeMax = st[1][1];
        }

        if (takeRangeTpInstant)
        {
            takeRangeTpInstant.innerHTML = takeMin + " - " + takeMax;
            $("#dealTakeRangeInstant").attr("class","dealRangeInstant");
        }

        var rr = (checkStopTake(0, enteredVal, st));
        if (rr[0][1])  {
            inputTake.attr('class', 'instantInput');
            return true;
        } else {
            inputTake.attr('class', 'instantInput error');
            return false;
        }

    }

    else
    {
        st = getAmountStopTakeRange(active, direction, openPrice, bid, ask, amount, currPnl, isOrder);
        if (st.length > 1) {
            takeMin = st[1][0];
            takeMax = st[1][1];

            if (parseFloat(takeMin) == 0 && parseFloat(takeMax) == 0) {

                if (takeRangeTpInstant) {
                    takeRangeTpInstant.innerHTML = 'N/A';
                    $("#dealTakeRangeInstant").attr("class","dealRangeInstant");
                }
            } else {

                if (takeRangeTpInstant) {
                    if(takeMin == 0)
                    {
                        takeMin = 0.01;
                    }
                    takeRangeTpInstant.innerHTML = takeMin + " - " + takeMax;
                    $("#dealTakeRangeInstant").attr("class","dealRangeInstant");
                }
            }

        }

         if(st[1][0] == 0){
             st[1][0] = 0.01;
         }
        var r = (checkStopTake(0, enteredVal, st));
        if (r[0][1]) {
            inputTake.attr('class', 'instantInput');
            return true;
        } else {
            inputTake.attr('class', 'instantInput error');
            return false;
        }
    }

}

function checkTakeProfitRange
(direction, price, dindex, takeRangeEl, inputTake, enteredVal, rangeType,
 active, openPrice, bid, ask, amount, currPnl, isOrder, instant) {
    var takeMin, takeMax;

    if (rangeType == 'rate') {
        st = getPriceStopTakeRange(direction, price, dindex);
        if (st.length > 1) {
            takeMin = st[1][0];
            takeMax = st[1][1];
            takeRangeEl.innerHTML = '[' + takeMin + '-' + takeMax + ']';
        } else {
            takeRangeEl.innerHTML = '';
            return true;
        }
        var r = (checkStopTake(0, enteredVal, st));
        if (r[0][1]) {
            inputTake.attr('class', 'dlgInput');
            return true;
        } else {
            inputTake.attr('class', 'dlgInput error');
            return false;
        }
    } else {
        st = getAmountStopTakeRange(active, direction, openPrice, bid, ask, amount, currPnl, isOrder);
        if (st.length > 1) {
            takeMin = st[1][0];
            takeMax = st[1][1];

            if (parseFloat(takeMin) == 0 && parseFloat(takeMax) == 0) {
                takeRangeEl.innerHTML = '[not allowed]';
            } else {
                (parseFloat(takeMin)==0)?takeMin=0.01:takeMin;
                takeRangeEl.innerHTML = '[' + takeMin + '-' + takeMax + ']';
            }
        } else {
            takeRangeEl.innerHTML = '';
            return true;
        }
        var r = (checkStopTake(0, enteredVal, st));
        if (r[0][1]) {
            inputTake.attr('class', 'dlgInput');
            return true;
        } else {
            inputTake.attr('class', 'dlgInput error');
            return false;
        }
    }
}

function calcDealRange(id,instant,operation) {

    var stopIsValid = false;
    var takeIsValid = false;
    var active, amount, currPnl, direction;

    $.each(OpenDeals, function(index) {
        if (OpenDeals[index][0] == id) {
            active = OpenDeals[index][1];
            amount = parseInt(OpenDeals[index][11]);
            openPrice = parseFloat(OpenDeals[index][7]);
            currPnl = parseFloat(OpenDeals[index][8]);
            direction = OpenDeals[index][4];

            return false;
        }
    });

    $('#editPnl').prop('class', currPnl < 0 ? 'formPriceRed' : 'formPrice');

    if(currPnl!=undefined)
    {
        $('#editPnl')[0].textContent = currPnl.toFixed(2);
    }

    var bid, ask;


    var btSave = $('#btSave');
    var stopRangeEl = $('#DealStopRange')[0];
    var takeRangeEl = $('#DealTakeRange')[0];
    var inputStop = $('#enteredStopLoss');
    var inputTake = $('#enteredTakeProfit');
    var price;

    var currentSlVal = null;
    var currentTpVal = null;

    $.each(LoadedRates, function(index) {
        if (LoadedRates[index][1] == active) {
            bid = parseFloat(LoadedRates[index][3]);
            ask = parseFloat(LoadedRates[index][4]);
            return false;
        }
    });
    var enteredDealStop = parseFloat(inputStop[0].value);
    var enteredDealStopShow = parseFloat(inputStop[0].value.replace(/,/g , ''));
    var enteredDealTake = parseFloat(inputTake[0].value);
    var enteredDealTakeShow = parseFloat(inputTake[0].value.replace(/,/g , ''));

    direction == 'SELL' ? price = bid : price = ask;
    var dindex = getTickSize(active);
    var stopLossMin, stopLossMax, takeProfitMin, takeProfitMax, stopRange, takeRange;

    if (UserSettings != null) {

        if (instant)
        {


            if (direction == undefined) {

                removeAllSlTpDivs;
                return;
            }

            switch (operation)
            {
                case "sl":
                    if ($("input[name='chInstant']:checked").val() == 'rate')
                    {
                        stopIsValid = checkStopLossRangeInstant(direction, (direction=="BUY") ? bid : ask , dindex, stopRangeEl, inputStop, enteredDealStop, 'rate',
                        null, null, null, null, null, null, null);
                        currentSlVal = $("#enteredStopLoss").val();
                    }
                    else
                    {
                        stopIsValid = checkStopLossRangeInstant(direction, (direction=="BUY") ? bid : ask, dindex, stopRangeEl, inputStop, enteredDealStopShow, 'amount',
                            active, openPrice, bid, ask, amount, currPnl, false);
                        currentSlVal = $("#enteredStopLoss").val().replace(/,/g , '');
                    }

                    if (currentSlVal == "")  {
                        stopIsValid = true ;
                    }

                    if (stopIsValid && currentSlVal > -1) {
                        $("#linkSetBtn").prop("disabled", false);

                    } else {
                        $("#linkSetBtn").prop("disabled", true);
                    }

                    break;


                case "tp":
                    if ($("input[name='chInstant']:checked").val() == 'rate')
                    {
                        takeIsValid = checkTakeProfitRangeInstant(direction, (direction=="BUY") ? bid : ask, dindex, stopRangeEl, inputStop, enteredDealTake, 'rate',
                            null, null, null, null, null, null, null);
                        currentTpVal = $("#enteredTakeProfit").val();
                    }
                    else
                    {
                        takeIsValid = checkTakeProfitRangeInstant(direction, (direction=="BUY") ? bid : ask, dindex, stopRangeEl, inputStop, enteredDealTakeShow, 'amount',
                            active, openPrice, bid, ask, amount, currPnl, false);
                        currentTpVal = $("#enteredTakeProfit").val().replace(/,/g , '');

                    }

                    if (takeIsValid && (currentTpVal > -1)) {
                        $("#linkSetBtn").prop("disabled", false);

                    } else {
                        $("#linkSetBtn").prop("disabled", true);
                    }

                    break;

                default: alert("Command is undefined");
            }
            return;
        }

        else {
            switch (direction) {
                case 'SELL':

                    var lossMin, lossMax, takeMin, takeMax;
                    if ($("input[name='ch03']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, ask, dindex, stopRangeEl, inputStop, enteredDealStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, price, dindex, stopRangeEl, inputStop, enteredDealStopShow, 'amount', active, openPrice, bid, ask, amount, currPnl, false)
                    }

                    if ($("input[name='ch04']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, ask, dindex, takeRangeEl, inputTake, enteredDealTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, price, dindex, takeRangeEl, inputTake, enteredDealTakeShow, 'amount', active, openPrice, bid, ask, amount, currPnl, false)
                    }

                    break;

                case 'BUY':

                    var lossMin, lossMax, takeMin, takeMax;
                    if ($("input[name='ch03']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, bid, dindex, stopRangeEl, inputStop, enteredDealStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, price, dindex, stopRangeEl, inputStop, enteredDealStopShow, 'amount', active, openPrice, bid, ask, amount, currPnl, false)
                    }

                    if ($("input[name='ch04']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, bid, dindex, takeRangeEl, inputTake, enteredDealTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, price, dindex, takeRangeEl, inputTake, enteredDealTakeShow, 'amount', active, openPrice, bid, ask, amount, currPnl, false)
                    }

                    break;
            }

            if (stopIsValid && takeIsValid) {
                btSave.button("option", "disabled", false);
            } else {
                btSave.button("option", "disabled", true);
            }
        }
    }
}

function switchOrderRange(priceIsValid) {
    if (priceIsValid) {
        $('#enteredOrderStopLoss').prop("disabled", false);
        $('#enteredOrderTakeProfit').prop("disabled", false);
    } else {
        $('#enteredOrderStopLoss').prop("disabled", true);
        $('#enteredOrderTakeProfit').prop("disabled", true);
        $('#OrderStopRange')[0].textContent = '';
        $('#OrderTakeRange')[0].textContent = '';
    }
}

function switchNewOrderRange(priceIsValid) {
    if (priceIsValid) {
        $('#enteredNewOrderStopLoss').prop("disabled", false);
        $('#enteredNewOrderTakeProfit').prop("disabled", false);
    } else {
        $('#enteredNewOrderStopLoss').prop("disabled", true);
        $('#enteredNewOrderTakeProfit').prop("disabled", true);
        $('#NewOrderStopRange')[0].textContent = '';
        $('#NewOrderTakeRange')[0].textContent = '';
    }
}

function calcOrderRange(id) {
    var stopIsValid = false,
        takeIsValid = false;
    priceIsValid = false;
    var active, amount, openPrice, direction;
    var limitEdit = null;

    direction = $("input[name=d-radio]:checked").val();
    active = $('#editActiveOrder')[0].textContent;

    if (id != null) {
        for(var i=0; i<LimitDeals.length; i++){
            if(LimitDeals[i][10] === id){
                amount = parseInt(LimitDeals[i][14]);
                openPrice = parseFloat(LimitDeals[i][7]);
            }
        }
        limitEdit = $('#orderType')[0].textContent;
    } else {
        amount = $('#amountOrder')[0].value.replace(/,/g, '');
    }
    var bid, ask;

    var btSave = $('#btOSave');
    var priceRangeEl = $('#OrderPriceRange')[0];
    var stopRangeEl = $('#OrderStopRange')[0];
    var takeRangeEl = $('#OrderTakeRange')[0];
    var inputPrice = $('#enteredPrice');
    var inputStop = $('#enteredOrderStopLoss');
    var inputTake = $('#enteredOrderTakeProfit');
    var price;

    $.each(LoadedRates, function(index) {
        if (LoadedRates[index][1] == active) {
            bid = parseFloat(LoadedRates[index][3]);
            ask = parseFloat(LoadedRates[index][4]);
            return false;
        }
    });
    var enteredOrderPrice = parseFloat(inputPrice[0].value);

    var enteredOrderStop = parseFloat(inputStop[0].value);
    var enteredOrderTake = parseFloat(inputTake[0].value);
    var dindex = getTickSize($('#editActiveOrder')[0].textContent);
    var stopLossMin, stopLossMax, takeProfitMin, takeProfitMax, stopRange, takeRange;

    direction == 'SELL' ? price = bid : price = ask;
    var p = getPriceRange(direction, price, dindex);
    var st;
    var limitMin, limitMax, stopMin, stopMax;
    if (p.length > 0) {
        limitMin = p[0][0];
        limitMax = p[0][1];
        stopMin = p[1][0];
        stopMax = p[1][1];
        if (limitEdit != null && limitEdit != "") {
            switch (limitEdit) {
                case 'Limit':
                    priceRangeEl.innerHTML = '[' + limitMin + '-' + limitMax + ']';
                    stopMin = 0;
                    stopMax = 0;
                    break;
                case 'Stop':
                    priceRangeEl.innerHTML = '[' + stopMin + '-' + stopMax + ']';
                    limitMin = 0;
                    limitMax = 0;
                    break;
            }
        } else {
            priceRangeEl.innerHTML = '[' + limitMin + '-' + limitMax + '] ' + dialogresources['rangeor'] + ' [' + stopMin + '-' + stopMax + ']';
        }
        switch (direction) {
            case 'SELL':
                var lossMin, lossMax, takeMin, takeMax;
                if (enteredOrderPrice >= parseFloat(limitMin) && enteredOrderPrice <= parseFloat(limitMax)) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderType')[0].textContent = 'Limit';
                    switchOrderRange(true);


                    if ($("input[name='ch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    if ($("input[name='ch02']:checked").val() == 'rate')

                    {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }


                    priceIsValid = true;
                } else if (enteredOrderPrice <= stopMax && enteredOrderPrice >= stopMin) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderType')[0].textContent = 'Stop';
                    switchOrderRange(true);
                    if ($("input[name='ch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    if ($("input[name='ch02']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    priceIsValid = true;
                } else {

                    inputPrice.attr('class', 'dlgInput error');
                    if (id == null) {
                        $('#orderType')[0].textContent = '';
                    }
                    switchOrderRange(false);
                    stopIsValid = false;
                    takeIsValid = false;
                    priceIsValid = false;
                }

                break;

            case 'BUY':
                var lossMin, lossMax, takeMin, takeMax;
                if (enteredOrderPrice >= parseFloat(limitMin) && enteredOrderPrice <= parseFloat(limitMax)) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderType')[0].textContent = 'Limit';
                    switchOrderRange(true);
                    if ($("input[name='ch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    if ($("input[name='ch02']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    priceIsValid = true;
                } else if (enteredOrderPrice <= stopMax && enteredOrderPrice >= stopMin) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderType')[0].textContent = 'Stop';
                    switchOrderRange(true);
                    if ($("input[name='ch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }
                    if ($("input[name='ch02']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }


                    priceIsValid = true;
                } else {
                    inputPrice.attr('class', 'dlgInput error');
                    if (id == null) {
                        $('#orderType')[0].textContent = '';
                    }
                    switchOrderRange(false);
                    stopIsValid = false;
                    takeIsValid = false;
                    priceIsValid = false;
                }

                break;
        }

    }

    if (priceIsValid && stopIsValid && takeIsValid) {
        btSave.button("option", "disabled", false);
    } else {
        btSave.button("option", "disabled", true);
    }
}

function calcNewOrderRange(id) {
    var stopIsValid = false,
        takeIsValid = false;
    priceIsValid = false;
    var active, amount, openPrice, direction;
    var limitEdit = null;

    direction = $("input[name=nd-radio]:checked").val();
    active = $('#editActiveOrderNew')[0].textContent;

    if (id != null) {
        amount = parseInt(LimitDeals[id][14]);
        openPrice = parseFloat(LimitDeals[id][7]);
        limitEdit = $('#orderNewType')[0].textContent;
    } else {
        amount = $('#amountOrderNew')[0].value.replace(/,/g, '');
    }
    var bid, ask;

    var btSave = $('#btOSave');
    var priceRangeEl = $('#NewOrderPriceRange')[0];
    var stopRangeEl = $('#NewOrderStopRange')[0];
    var takeRangeEl = $('#NewOrderTakeRange')[0];
    var inputPrice = $('#enteredNewPrice');
    var inputStop = $('#enteredNewOrderStopLoss');
    var inputTake = $('#enteredNewOrderTakeProfit');
    var price;

    $.each(LoadedRates, function(index) {
        if (LoadedRates[index][1] == active) {
            bid = parseFloat(LoadedRates[index][3]);
            ask = parseFloat(LoadedRates[index][4]);
            return false;
        }
    });
    var enteredOrderPrice = parseFloat(inputPrice[0].value);

    var enteredOrderStop = parseFloat(inputStop[0].value);
    var enteredOrderTake = parseFloat(inputTake[0].value);



    var dindex = getTickSize($('#editActiveOrderNew')[0].textContent);
    var stopLossMin, stopLossMax, takeProfitMin, takeProfitMax, stopRange, takeRange;

    direction == 'SELL' ? price = bid : price = ask;
    var p = getPriceRange(direction, price, dindex);
    var st;
    var limitMin, limitMax, stopMin, stopMax;
    if (p.length > 0) {
        limitMin = p[0][0];
        limitMax = p[0][1];
        stopMin = p[1][0];
        stopMax = p[1][1];

        if (limitEdit != null && limitEdit != "") {
            switch (limitEdit) {
                case 'Limit':
                    priceRangeEl.innerHTML = '[' + limitMin + '-' + limitMax + ']';
                    stopMin = 0;
                    stopMax = 0;
                    break;
                case 'Stop':
                    priceRangeEl.innerHTML = '[' + stopMin + '-' + stopMax + ']';
                    limitMin = 0;
                    limitMax = 0;
                    break;
            }
        } else {
            priceRangeEl.innerHTML = '[' + limitMin + '-' + limitMax + '] ' + dialogresources['rangeor'] + ' [' + stopMin + '-' + stopMax + ']';
        }
        switch (direction) {
            case 'SELL':
                var lossMin, lossMax, takeMin, takeMax;
                if (enteredOrderPrice >= parseFloat(limitMin) && enteredOrderPrice <= parseFloat(limitMax)) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderNewType')[0].textContent = 'Limit';
                    switchNewOrderRange(true);


                    if ($("input[name='nch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    if ($("input[name='nch02']:checked").val() == 'rate')

                    {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }


                    priceIsValid = true;
                } else if (enteredOrderPrice <= stopMax && enteredOrderPrice >= stopMin) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderNewType')[0].textContent = 'Stop';
                    switchNewOrderRange(true);
                    if ($("input[name='nch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    if ($("input[name='nch02']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    priceIsValid = true;
                } else {

                    inputPrice.attr('class', 'dlgInput error');
                    if (id == null) {
                        $('#orderNewType')[0].textContent = '';
                    }
                    switchNewOrderRange(false);
                    stopIsValid = false;
                    takeIsValid = false;
                    priceIsValid = false;
                }

                break;

            case 'BUY':
                var lossMin, lossMax, takeMin, takeMax;
                if (enteredOrderPrice >= parseFloat(limitMin) && enteredOrderPrice <= parseFloat(limitMax)) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderNewType')[0].textContent = 'Limit';
                    switchNewOrderRange(true);
                    if ($("input[name='nch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    if ($("input[name='nch02']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }

                    priceIsValid = true;
                } else if (enteredOrderPrice <= stopMax && enteredOrderPrice >= stopMin) {
                    inputPrice.attr('class', 'dlgInput');
                    $('#orderNewType')[0].textContent = 'Stop';
                    switchNewOrderRange(true);
                    if ($("input[name='nch01']:checked").val() == 'rate') {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'rate');
                    } else {
                        stopIsValid = checkStopLossRange(direction, enteredOrderPrice, dindex, stopRangeEl, inputStop, enteredOrderStop, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }
                    if ($("input[name='nch02']:checked").val() == 'rate') {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'rate');
                    } else {
                        takeIsValid = checkTakeProfitRange(direction, enteredOrderPrice, dindex, takeRangeEl, inputTake, enteredOrderTake, 'amount', active, enteredOrderPrice, bid, ask, amount, null, true)
                    }


                    priceIsValid = true;
                } else {
                    inputPrice.attr('class', 'dlgInput error');
                    if (id == null) {
                        $('#orderNewType')[0].textContent = '';
                    }
                    switchNewOrderRange(false);
                    stopIsValid = false;
                    takeIsValid = false;
                    priceIsValid = false;
                }

                break;
        }

    }

    if (priceIsValid && stopIsValid && takeIsValid) {
        btSave.button("option", "disabled", false);
    } else {
        btSave.button("option", "disabled", true);
    }
}

function checkStopTake(stopVal, takeVal, range) {
    var stopIsValid, takeIsValid;
    var valResult = new Array();
    var lossMin, lossMax, takeMin, takeMax;

    lossMin = range[0][0];
    lossMax = range[0][1];
    takeMin = range[1][0];
    takeMax = range[1][1];

    (parseFloat(takeMin)==0)?takeMin=0.01:takeMin;

    if (stopVal >= 0) {
        if (stopVal >= lossMin && stopVal <= lossMax) {
            stopIsValid = true;
        } else {
            stopIsValid = false;
        }
    } else {
        stopIsValid = true;
    }

    if (takeVal >= 0) {
        if (takeVal >= takeMin && takeVal <= takeMax) {
            takeIsValid = true;
        } else {
            takeIsValid = false;
        }
    } else {
        takeIsValid = true;
    }

    var res = [stopIsValid, takeIsValid];
    valResult.push(res);
    return valResult;
}

function getPriceRange(direction, price, dindex) {
    var prices = new Array();
    var flfix = 0;
    if (dindex == 3) {
        flfix = 0.001;
    }
    if (dindex == 5) {
        flfix = 0.00001;
    }
    switch (direction) {

        case 'SELL':

            limitMin = (price * (100 + (UserSettings.limitPriceMinPercent / 1000000)) / 100) + flfix;
            limitMax = (price * (100 + (UserSettings.limitPriceMaxPercent / 1000000)) / 100) - flfix;
            stopMin = (price * (100 - (UserSettings.stopPriceMaxPercent / 1000000)) / 100) + flfix;
            stopMax = (price * (100 - (UserSettings.stopPriceMinPercent / 1000000)) / 100) - flfix;

            var range = [limitMin.toFixed(dindex), limitMax.toFixed(dindex)];
            prices.push(range);
            range = [stopMin.toFixed(dindex), stopMax.toFixed(dindex)];
            prices.push(range);


            break;
        case 'BUY':


            limitMin = (price * (100 - (UserSettings.limitPriceMaxPercent / 1000000)) / 100) + flfix;
            limitMax = (price * (100 - (UserSettings.limitPriceMinPercent / 1000000)) / 100) - flfix;
            stopMin = (price * (100 + (UserSettings.stopPriceMinPercent / 1000000)) / 100) + flfix;
            stopMax = (price * (100 + (UserSettings.stopPriceMaxPercent / 1000000)) / 100) - flfix;


            var range = [limitMin.toFixed(dindex), limitMax.toFixed(dindex)];
            prices.push(range);
            range = [stopMin.toFixed(dindex), stopMax.toFixed(dindex)];
            prices.push(range);

            break;
    }
    return prices;
}

function getPriceStopTakeRange(direction, price, dindex) {
    var stopLossMin, stopLossMax, takeProfitMin, takeProfitMax, stopRange, takeRange;
    var rangesPrice = new Array();
    var flfix = 0;
    if (dindex == 3) {
        flfix = 0.001;
    }
    if (dindex == 5) {
        flfix = 0.00001;
    }
    switch (direction) {
        case 'SELL':
            takeProfitMin = (price * (100 - (UserSettings.takeProfitMaxPercent / 1000000)) / 100) + flfix;
            takeProfitMax = (price * (100 - (UserSettings.takeProfitMinPercent / 1000000)) / 100) - flfix;

            stopLossMin = (price * (100 + (UserSettings.stopLossMinPercent / 1000000)) / 100) + flfix;
            stopLossMax = (price * (100 + (UserSettings.stopLossMaxPercent / 1000000)) / 100) - flfix;

            var rangeS = [stopLossMin.toFixed(dindex), stopLossMax.toFixed(dindex)];
            rangesPrice.push(rangeS);
            rangeS = [takeProfitMin.toFixed(dindex), takeProfitMax.toFixed(dindex)];
            rangesPrice.push(rangeS);
            break;
        case 'BUY':

            takeProfitMin = (price * (100 + (UserSettings.takeProfitMinPercent / 1000000)) / 100) + flfix;;
            takeProfitMax = (price * (100 + (UserSettings.takeProfitMaxPercent / 1000000)) / 100) - flfix;;

            stopLossMin = (price * (100 - (UserSettings.stopLossMaxPercent / 1000000)) / 100) + flfix;;
            stopLossMax = (price * (100 - (UserSettings.stopLossMinPercent / 1000000)) / 100) - flfix;;

            var rangeS = [stopLossMin.toFixed(dindex), stopLossMax.toFixed(dindex)];
            rangesPrice.push(rangeS);
            rangeS = [takeProfitMin.toFixed(dindex), takeProfitMax.toFixed(dindex)];
            rangesPrice.push(rangeS);
            break;
    }
    return rangesPrice
}

function getAmountStopTakeRange(active, direction, price, bid, ask, amount, curPnl, isOrder) {
    var stopLossMin, stopLossMax, takeProfitMin, takeProfitMax, stopRange, takeRange;
    var rangesAmount = new Array();
    if (curPnl == null) curPnl = 0;
    switch (direction) {
        case 'SELL':

            if (!isOrder) {
                takeProfitMax = (ask * (100 - (UserSettings.takeProfitMinPercent / 1000000)) / 100);
                takeProfitMin = (ask * (100 - (UserSettings.takeProfitMaxPercent / 1000000)) / 100);


                stopLossMin = (ask * (100 + (UserSettings.stopLossMinPercent / 1000000)) / 100);
                stopLossMax = (ask * (100 + (UserSettings.stopLossMaxPercent / 1000000)) / 100);
            } else {
                takeProfitMax = (price * (100 - (UserSettings.takeProfitMinPercent / 1000000)) / 100);
                takeProfitMin = (price * (100 - (UserSettings.takeProfitMaxPercent / 1000000)) / 100);


                stopLossMin = (price * (100 + (UserSettings.stopLossMinPercent / 1000000)) / 100);
                stopLossMax = (price * (100 + (UserSettings.stopLossMaxPercent / 1000000)) / 100);
            }


            var sMin = calcPnLRange(active, 'SELL', price, stopLossMin, bid, ask, amount);
            var sMax = calcPnLRange(active, 'SELL', price, stopLossMax, bid, ask, amount);


            var tMin = calcPnLRange(active, 'SELL', price, takeProfitMax, bid, ask, amount);
            var tMax = calcPnLRange(active, 'SELL', price, takeProfitMin, bid, ask, amount);

            if (!isOrder) {
                if (curPnl < 0)

                {
                    sMin = sMin < 0 ? sMin = sMin * (-1) : sMin;
                    sMax = sMax < 0 ? sMax = sMax * (-1) : sMax;

                    if (tMin < 0 && tMax < 0) {
                        tMin = 0;
                        tMax = 0;

                    } else {
                        tMin = tMin < 0 ? tMin = 0 : tMin;
                        tMax = tMax < 0 ? tMax = tMax * (-1) : tMax;
                    }
                } else {
                    if (sMin > 0 && sMax > 0) {
                        sMin = 0;
                        sMax = 0;

                    } else {
                        sMin = sMin > 0 ? sMin : sMin < 0 ? sMin * (-1) : sMin;
                        sMax = sMax < 0 ? sMax = sMax * (-1) : sMax;
                    }

                    tMin = tMin < 0 ? tMin = tMin * (-1) : tMin;
                    tMax = tMax < 0 ? tMax = tMax * (-1) : tMax;
                }
            } else {
                tMin = tMin < 0 ? tMin = 0 : tMin;
                sMin = sMin < 0 ? sMin = sMin * (-1) : sMin;
                sMax = sMax < 0 ? sMax = sMax * (-1) : sMax;
            }

            var rangeA = [sMin.toFixed(2), sMax.toFixed(2)];
            rangesAmount.push(rangeA);
            rangeA = [tMin.toFixed(2), tMax.toFixed(2)];
            rangesAmount.push(rangeA);
            break;

        case 'BUY':

            if (!isOrder) {
                takeProfitMin = (bid * (100 + (UserSettings.takeProfitMinPercent / 1000000)) / 100);
                takeProfitMax = (bid * (100 + (UserSettings.takeProfitMaxPercent / 1000000)) / 100);

                stopLossMin = (bid * (100 - (UserSettings.stopLossMaxPercent / 1000000)) / 100);
                stopLossMax = (bid * (100 - (UserSettings.stopLossMinPercent / 1000000)) / 100);
            } else {
                takeProfitMin = (price * (100 + (UserSettings.takeProfitMinPercent / 1000000)) / 100);
                takeProfitMax = (price * (100 + (UserSettings.takeProfitMaxPercent / 1000000)) / 100);

                stopLossMin = (price * (100 - (UserSettings.stopLossMaxPercent / 1000000)) / 100);
                stopLossMax = (price * (100 - (UserSettings.stopLossMinPercent / 1000000)) / 100);
            }

            var sMin = calcPnLRange(active, 'BUY', price, stopLossMax, bid, ask, amount);
            var sMax = calcPnLRange(active, 'BUY', price, stopLossMin, bid, ask, amount);


            var tMin = calcPnLRange(active, 'BUY', price, takeProfitMin, bid, ask, amount);
            var tMax = calcPnLRange(active, 'BUY', price, takeProfitMax, bid, ask, amount);

            if (!isOrder) {
                if (curPnl < 0) {
                    sMin = sMin < 0 ? sMin = sMin * (-1) : sMin;
                    sMax = sMax < 0 ? sMax = sMax * (-1) : sMax;

                    if (tMin < 0 && tMax < 0) {
                        tMin = 0;
                        tMax = 0;

                    } else {
                        tMin = tMin < 0 ? tMin = 0 : tMin;
                        tMax = tMax < 0 ? tMax = tMax * (-1) : tMax;
                    }
                } else {
                    if (sMin > 0 && sMax > 0) {
                        sMin = 0;
                        sMax = 0;

                    } else {
                        sMin = sMin > 0 ? sMin : sMin < 0 ? sMin * (-1) : sMin;
                        sMax = sMax < 0 ? sMax = sMax * (-1) : sMax;
                    }

                    tMin = tMin < 0 ? tMin = tMin * (-1) : tMin;
                    tMax = tMax < 0 ? tMax = tMax * (-1) : tMax;
                }
            } else {
                tMin = tMin < 0 ? tMin = 0 : tMin;
                sMin = sMin < 0 ? sMin = sMin * (-1) : sMin;
                sMax = sMax < 0 ? sMax = sMax * (-1) : sMax;
            }


            var rangeA = [sMin.toFixed(2), sMax.toFixed(2)];
            rangesAmount.push(rangeA);
            rangeA = [tMin.toFixed(2), tMax.toFixed(2)];
            rangesAmount.push(rangeA);
            break;
    }
    return rangesAmount;
}


function formatMoney(num, fix) {
    var minusSign = "";
    if (isNaN(num) || num === "NaN") {
        return "";
    }
    if (num < 0) {
        minusSign = "-";
        num = -num;
    }
	if (typeof(num) == "number") {
		num = num.toFixed(fix);
	}
	var p = num.split(".");
    var res =  p[0].split("").reduceRight(function(acc, num, i, orig) {
        if ("-" === num && 0 === i) {
            return num + acc;
        }
        var pos = orig.length - i - 1;
        return num + (pos && !(pos % 3) ? "," : "") + acc;
    }, "") + (p[1] ? "." + p[1] : "");
    return minusSign + AccountCurrencySym() + res;
}

function formatInteger(num, fix) {
    var minusSign = "";
    if (num < 0) {
        minusSign = "-";
        num = -num;
    }
    var p = num.toFixed(fix).split(".");
    var res =  p[0].split("").reduceRight(function(acc, num, i, orig) {
        if ("-" === num && 0 === i) {
            return num + acc;
        }
        var pos = orig.length - i - 1;
        return num + (pos && !(pos % 3) ? "," : "") + acc;
    }, "") + (p[1] ? "." + p[1] : "");
    return minusSign + res;
}

function formatMoneyK(num, fix) {
    var isK = false;

    if (isNaN(num) || num === "NaN") {
        return "";
    }

    if (num >= 1000 || num <= -1000) {
        isK = true;
        num = num / 1000;
        fix = 0;
    }


    var p = num.toFixed(fix).split(".");
    var res = p[0].split("").reduceRight(function(acc, num, i, orig) {
        if ("-" === num && 0 === i) {
            return num + acc;
        }
        var pos = orig.length - i - 1;
        return num + (pos && !(pos % 3) ? "," : "") + acc;
    }, "") + (p[1] ? "." + p[1] : "");

    if (isK) {
        res = res + "K";
    }
    return res;
}

function formatMoneyKNew(num, fix) {
    var isK = false;

    if (isNaN(num) || num === "NaN") {
        return "";
    }

    if (num >= 1000 || num <= -1000) {
        isK = true;
        num = num / 1000;
    }

    return num.toFixed(fix) + (isK ? "K" : "");
}

function convertRateToAmount (rate, active, direction, openValue, openAmount) {
    var amount = 0;
    openValue = parseFloat(openValue);
    switch (direction) {
        case "SELL":
            var bid = 0;
            if (active.substring(3, 6) == AccountCurrency) {
                amount = -(rate - openValue) * openAmount;
            } else if (active.substring(0, 3) == AccountCurrency) {
                amount = -(rate - openValue) * openAmount / ((bid + rate) / 2);
            } else {
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    amount = -(rate - openValue) * openAmount / parseFloat(crossUSD);
                } else {
                    amount = -(rate - openValue) * openAmount * parseFloat(-crossUSD);
                }
            }
            break;
        case "BUY":
            var ask = 0;
            if (active.substring(3, 6) == AccountCurrency) {
                amount = (rate - openValue) * openAmount;
            } else if (active.substring(0, 3) == AccountCurrency) {
                amount = (rate - openValue) * openAmount / ((ask + rate) / 2);
            } else {
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    amount = (rate - openValue) * openAmount / parseFloat(crossUSD);
                } else {
                    amount = (rate - openValue) * openAmount * parseFloat(-crossUSD);
                }
            }
            break;
    }
    return amount;
}

function convertAmountToRate (amount, active, direction, openValue, openAmount) {
    var rate = 0;
    openValue = parseFloat(openValue);
    switch (direction) {
        case "SELL":
            var bid = 0;
            if (active.substring(3, 6) == AccountCurrency) {
                rate =  openValue - (amount / openAmount);
            } else if (active.substring(0, 3) == AccountCurrency) {
                rate = (2 * openValue * openAmount - amount * bid) / (amount + 2 * openAmount);
            } else {
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    rate = openValue - (amount * parseFloat(crossUSD)/openAmount);
                } else {
                    rate = openValue - (amount / parseFloat(-crossUSD)) / openAmount;
                }
            }
            break;
        case "BUY":
            var ask = 0;
            if (active.substring(3, 6) == AccountCurrency) {
                rate = openValue + amount / openAmount;
            } else if (active.substring(0, 3) == AccountCurrency) {
                rate = - (amount * ask + 2 * openValue * openAmount) / (amount - 2 * openAmount);
            } else {
                var val2 = active.substring(3, 6);
                var crossUSD = getCrossCourse(val2);
                if (crossUSD > 0) {
                    rate = openValue + amount * parseFloat(crossUSD) / openAmount;
                } else {
                    rate =  openValue + (amount / parseFloat(-crossUSD)) / openAmount;
                }
            }
            break;
    }
    return rate;
}

function convertAmountToLot (amount, marketindex, name) {
    if(!amount || !name){
        return;
    }
    var lot;
    var coefficient;
    if(marketindex && marketindex == "Currency"){
        coefficient = 100000;
    } else {
        name = name.toUpperCase();
        switch (name){
            case "XNGUSD":
                coefficient = 10000;
                break;
            case "USOUSD":
            case "XAGUSD":
            case "UKOUSD":
                coefficient = 1000;
                break;
            case "XPDUSD":
            case "XAUUSD":
            case "XPTUSD":
            case "NKYJPY":
                coefficient = 100;
                break;
            case "NSQUSD":
            case "DOWUSD":
            case "DAXEUR":
            case "CACEUR":
            case "SP5USD":
            case "E50EUR":
            case "SPIAUD":
            case "HSIHKD":
            case "FTSGBP":
            case "IBXEUR":
                coefficient = 100;
                break;
        }
        if(!coefficient){
            coefficient = getCorfficientForCurrency(name);
            if(!coefficient){
                return false;
            }
        }
    }

    lot = parseFloat(amount) / coefficient;
    return lot;
}

function convertLotToAmount (lot, marketindex, name) {
    if(!lot || !name){
        return;
    }
    var amount;
    var coefficient;
    if(!marketindex){
        coefficient = 100000;
    }
    if(marketindex && marketindex == "Currency"){
        coefficient = 100000;
    } else {
        name = name.toUpperCase();
        switch (name) {
            case "CURRENCY":
                coefficient = 100000;
                break;
            case "XNGUSD":
                coefficient = 10000;
                break;
            case "USOUSD":
            case "XAGUSD":
            case "UKOUSD":
                coefficient = 1000;
                break;
            case "XPDUSD":
            case "XAUUSD":
            case "XPTUSD":
            case "NKYJPY":
                coefficient = 100;
                break;
            case "NSQUSD":
            case "DOWUSD":
            case "DAXEUR":
            case "CACEUR":
            case "SP5USD":
            case "E50EUR":
            case "SPIAUD":
            case "HSIHKD":
            case "FTSGBP":
            case "IBXEUR":
                coefficient = 100;
                break;
        }
        if(!coefficient){
            coefficient = getCorfficientForCurrency(name);
            if(!coefficient){
                return false;
            }
        }
    }

    amount = parseFloat(lot) * coefficient;
    return amount;
}

function getCorfficientForCurrency(name) {
    if(!name){
        return false;
    }
    var coefficient;
    switch (name) {
        case "AUDCAD":
        case "AUDCHF":
        case "AUDJPY":
        case "AUDNZD":
        case "AUDUSD":
        case "CADCHF":
        case "CADJPY":
        case "CHFJPY":
        case "EURAUD":
        case "EURCAD":
        case "EURCHF":
        case "EURDKK":
        case "EURGBP":
        case "EURHUF":
        case "EURJPY":
        case "EURMXN":
        case "EURNOK":
        case "EURNZD":
        case "EURPLN":
        case "EURRUB":
        case "EURSEK":
        case "EURTRY":
        case "EURUSD":
        case "EURZAR":
        case "GBPAUD":
        case "GBPCAD":
        case "GBPCHF":
        case "GBPJPY":
        case "GBPNZD":
        case "GBPUSD":
        case "GBPZAR":
        case "NOKJPY":
        case "NOKSEK":
        case "NZDCAD":
        case "NZDCHF":
        case "NZDJPY":
        case "NZDUSD":
        case "SGDJPY":
        case "USDCAD":
        case "USDCHF":
        case "USDCNH":
        case "USDCNY":
        case "USDDKK":
        case "USDHKD":
        case "USDHUF":
        case "USDINR":
        case "USDJPY":
        case "USDKRW":
        case "USDMXN":
        case "USDNOK":
        case "USDPLN":
        case "USDRUB":
        case "USDSEK":
        case "USDSGD":
        case "USDTHB":
        case "USDTRY":
        case "USDTWD":
        case "USDZAR":
        case "ZARJPY":
            coefficient = 100000;
            break;
    }
    return coefficient;
}