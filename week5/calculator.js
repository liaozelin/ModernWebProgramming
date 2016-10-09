'use strict';

// recode if the function equal() had been done, if so,
// only divide, multiple, add, substract four function can
// be executed based on the result;
// do other operation will clear the old result.
var if_done_equal = false;

var num = function(number) {
    if (if_done_equal) {
        document.getElementById('input').innerHTML = String(number);
        if_done_equal = false;
    } else {
        document.getElementById('input').innerHTML += String(number);
    }
};
var divide = function() {
    if_done_equal = false;
    document.getElementById('input').innerHTML += "/";
};
var multiple = function() {
    if_done_equal = false;
    document.getElementById('input').innerHTML += "*";
};
var substract = function() {
    if_done_equal = false;
    document.getElementById('input').innerHTML += "-";
};
var add = function() {
    if_done_equal = false;
    document.getElementById('input').innerHTML += "+";
};
var point = function() {
    if (if_done_equal) {
        document.getElementById('input').innerHTML = ".";
        if_done_equal = false;
    } else {
        document.getElementById('input').innerHTML += ".";
    }
};
var remove = function() {
    if (if_done_equal) {
        init();
    } else {
        var t = document.getElementById('input').innerHTML;
        document.getElementById('input').innerHTML = t.substring(0, t.length - 1);
    }
};
var bracket = function(flag) {
    if (if_done_equal) {
        init();
    }
    if (flag) document.getElementById('input').innerHTML += "(";
    else document.getElementById('input').innerHTML += ")";
};
// clear the screen
var init = function() {
    if_done_equal = false;
    document.getElementById('old').innerHTML = "";
    document.getElementById('input').innerHTML = "";
};
var equal = function() {
    try {
        if (document.getElementById('input').innerHTML === "") return;

        var res = parseFloat(eval(document.getElementById('input').innerHTML));
        if (isNaN(res) || res === Infinity || res === -Infinity) {
            window.alert("Error occured! Invalid operation!");
            init();
        } else if (res === undefined) {
            init();
        } else {
            if_done_equal = true;
            document.getElementById('old').innerHTML = document.getElementById('input').innerHTML + '=';
            document.getElementById('input').innerHTML = String(res);
        }
    } catch (err) {
        window.alert("Error occured! Invalid operation!");
        init();
    }
};

window.onload = function() {
    init();

    var all = document.getElementById('buttons').children;
    for (var x of all) {
        if (x.id.substring(0, 3) === "num") { // number
            // 闭包将循环变量绑定到函数内,使其变成函数内的"私有变量"
            (function(t) {
                x.onclick = function() {
                    num(t);
                };
            })(x.id[3]);
        } else if (x.id === "divide") { // operators
            x.onclick = divide;
        } else if (x.id === "multiple") {
            x.onclick = multiple;
        } else if (x.id === "substract") {
            x.onclick = substract;
        } else if (x.id === "add") {
            x.onclick = add;
        } else if (x.id === "point") {
            x.onclick = point;
        } else if (x.id === "remove") {
            x.onclick = remove;
        } else if (x.id === "left-bracket") {
            x.onclick = function() {
                bracket(1);
            };
        } else if (x.id === "right-bracket") {
            x.onclick = function() {
                bracket(0);
            };
        } else if (x.id === "init") {
            x.onclick = init;
        } else if (x.id === "equal") {
            x.onclick = equal;
        }
    }
};