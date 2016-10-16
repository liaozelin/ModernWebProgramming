'use strict';

var MyFlag = {
    time: 30,
    _score: 0,
    random_num: 0,
    _timer_status: undefined,
    start_or_not: false
};

window.onload = function() {
    initial();
    var start_button = document.getElementById('start_button');
    var score = document.getElementById('score');
    var buttons = document.getElementsByTagName('button');

    start_button.addEventListener('click', start);
    for (var x of buttons) {
        x.addEventListener('click', function() {
            if (!MyFlag.start_or_not) return;
            if (this.id === 'radio-' + parseInt(MyFlag.random_num).toString()) {
                this.className = '';
                MyFlag._score += 1;
                resetMole();
            } else {
                MyFlag._score -= 1;
            }
            score.value = MyFlag._score;
        });
    }
};

function initial() {
    var _moles = document.getElementById('moles');
    var fram = document.createDocumentFragment();
    for (var i = 0; i < 6; ++i) {
        for (var j = 0; j < 10; ++j) {
            var mole = document.createElement('button');
            mole.id = 'radio-' + (i * 10 + j).toString();
            fram.appendChild(mole);
        }
        var new_line = document.createElement('br');
        fram.appendChild(new_line);
    }
    _moles.appendChild(fram);
}
// time counter
function timer() {
    if (MyFlag.time === 0) {
        end();
        MyFlag.time = 30;
        MyFlag._score = 0;
        return;
    }
    MyFlag.time -= 1;
    document.getElementById('time').value = MyFlag.time;
    MyFlag._timer_status = setTimeout(timer, 1000);
}
// set moles
function resetMole() {
    var t = document.getElementsByClassName('radio-input-chose');
    if (t[0]) return;
    MyFlag.random_num = Math.random() * 60;
    var t2 = document.querySelectorAll('#radio-' + parseInt(MyFlag.random_num).toString())[0];
    t2.setAttribute('class', 'radio-input-chose');
}

function start() {
    if (!MyFlag.start_or_not) {
        document.getElementById('status').value = 'Playing';
        document.getElementById('time').value = MyFlag.time;
        document.getElementById('score').value = MyFlag._score;
        MyFlag._timer_status = setTimeout(timer, 1000);
        resetMole();
        MyFlag.start_or_not = true;
    } else {
        document.getElementById('status').value = 'Stop';
        clearTimeout(MyFlag._timer_status);
        MyFlag.start_or_not = false;
    }
}

function end() {
    document.getElementById('status').value = 'Game Over!';
    var t2 = document.querySelectorAll('#radio-' + parseInt(MyFlag.random_num).toString())[0];
    t2.setAttribute('class', '');
    MyFlag.start_or_not = false;
    window.alert('Game Over.' + '\n' + 'Your score is: ' + MyFlag._score.toString());
}