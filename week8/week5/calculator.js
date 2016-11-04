'use strict';

$(function() {
    // recode if the function equal() had been done, if so,
    // only divide, multiple, add, substract four function can
    // be executed based on the result;
    // do other operation will clear the old result.
    var if_done_equal = false;
    // if an operator is inputed, then the next can't be operator
    var operators_allow = true;
    // get the input DOM
    var ipt = $('#input');

    var num = function(number) {
        if (if_done_equal) {
            ipt.text(String(number));
            if_done_equal = false;
        } else {
            operators_allow = true;
            ipt.text(ipt.text() + String(number));
        }
    };

    var four_operators = {
        'divide': '/',
        'multiple': '*',
        'substract': '-',
        'add': '+'
    };
    var algorithmic = function(mode) {
        if_done_equal = false;
        if (operators_allow) {
            operators_allow = false;
            ipt.text(ipt.text() + four_operators[mode]);
        }
    };

    var point = function() {
        if (if_done_equal) {
            ipt.text(".");
            if_done_equal = false;
        } else {
            ipt.text(ipt.text() + ".");
        }
    };

    var remove = function() {
        if (if_done_equal) {
            init();
        } else {
            var t = ipt.text();
            ipt.text(t.substring(0, t.length - 1));
        }
    };

    var brackets = {
        'left-bracket': '(',
        'right-bracket': ')'
    };
    var bracket = function(mode) {
        if (if_done_equal)
            init();
        ipt.text(ipt.text() + brackets[mode]);
    };
    // clear the screen
    var init = function() {
        if_done_equal = false;
        operators_allow = true;
        $('#old').text("");
        ipt.text("");
    };

    var equal = function() {
        try {
            if (ipt.text() === "") return;

            var res = eval(ipt.text());
            if (isNaN(res) || res === Infinity || res === -Infinity) {
                window.alert("Error occured! Invalid operation!");
                init();
            } else if (res === undefined) {
                init();
            } else {
                if_done_equal = true;
                $('#old').text(ipt.text() + '=');
                ipt.text(String(res));
            }
        } catch (err) {
            window.alert("Error occured! Invalid operation!");
            init();
        }
    };

    init();
    // add events for buttons
    var all = $('#buttons > button');  // all buttons
    all.click(function() {
        if (this.id.substring(0, 3) === "num") { // number
            num(this.id[3]);
        } else if (this.id === "divide" || this.id === "multiple" || this.id === "substract" || this.id === "add") { // operators
            algorithmic(this.id);
        } else if (this.id === "point") {
            point();
        } else if (this.id === "remove") {
            remove();
        } else if (this.id === "left-bracket" || this.id === "right-bracket") {  // brackets
            bracket(this.id);
        } else if (this.id === "init") {
            init();
        } else if (this.id === "equal") {
            equal();
        }
    });
});
