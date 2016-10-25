'use strict';

window.onload = function() {
    initial();

    var boxes = document.getElementsByClassName('box');
    var start = document.getElementById('start');
    var hint = document.getElementById('hint');
    var MyTimer = timer();

    var filechooser = document.getElementById('filechooser');
    var ii = document.getElementById('init-image');

    for (var i = 0; i < boxes.length - 1; ++i) {
        (function(element, MyTimer) {
            element.addEventListener("click", function() {
                move(element, MyTimer);
            });
        })(boxes[i], MyTimer);
    }

    start.addEventListener("click", function() {
        restart(MyTimer);
    });
    hint.addEventListener("click", function() {
        var picture = document.getElementById('picture');
        if (picture.className === "picture-hidden")
            picture.className = "picture-show";
        else
            picture.className = "picture-hidden";
    });

    filechooser.onchange = function() {
        var files = this.files;
        var file = files[0];

        if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

        var reader = new FileReader();

        reader.onload = function(e) {
            var result = e.target.result;
            for (var x of boxes) {
                x.style.backgroundImage = 'url(' + result + ')';
                x.style.backgroundSize = "352px 352px";
            }
            filechooser.value = '';
        };

        reader.readAsDataURL(file);
    };

    ii.onclick = function() {
        for (var x of boxes) {
            (function(ele) {
                x.style.backgroundImage = 'url(panda.jpg)';
            })(x);
        }
    }
};

function initial() {
    var fram = document.createDocumentFragment();
    for (var i = 0; i < 16; ++i) {
        var t = document.createElement('div');
        t.className = "box box-bg-pos-" + i.toString();
        var row = parseInt(i / 4);
        var col = i % 4;
        t.className += (" row-" + row.toString() + " col-" + col.toString());
        t.id = "box-" + i.toString();
        fram.appendChild(t);
    }
    var parent = document.getElementById('main-body');
    parent.appendChild(fram);
}

function move(element, MyTimer) {
    var pos = getPos(element);
    var blank = document.getElementById('box-15');
    var blank_pos = getPos(blank);

    if (Math.abs(pos[0] - blank_pos[0]) === 90 && pos[1] === blank_pos[1]) { // blank box locates on top or buttom
        move_driver(element, blank, true);
        gameover(MyTimer);
    } else if (Math.abs(pos[1] - blank_pos[1]) === 90 && pos[0] === blank_pos[0]) { // blank box locates on right or left
        move_driver(element, blank, false);
        gameover(MyTimer);
    }
}

// if mode is true, exchange row- class, else exchange col- class
function move_driver(element, element2, mode) {
    var className = element.className;
    var className2 = element2.className;
    var re;
    if (mode === true) re = /row-[0-9]/;
    else re = /col-[0-9]/;
    var t = className.match(re)[0];
    var t2 = className2.match(re)[0];
    element.className = className.replace(re, t2);
    element2.className = className2.replace(re, t);
}

function getPos(element) {
    return Array(element.offsetTop, element.offsetLeft);
}

function ifComplete() {
    var boxes = document.getElementsByClassName('box');
    for (var i = 0; i < boxes.length; ++i) {
        var id = boxes[i].id;
        var className = boxes[i].className;
        var num = parseInt(id.replace("box-", ""));
        var re_row = /row-[0-9]/;
        var re_col = /col-[0-9]/;
        if (parseInt(num / 4) !== parseInt(className.match(re_row)[0][4]) || i % 4 !== parseInt(className.match(re_col)[0][4]))
            return false;
    }
    return true;
}

function gameover(MyTimer) {
    if (ifComplete()) {
        setTimeout(function() {
            showOverBox(MyTimer);
        }, 800);
    }
}

function showOverBox(MyTimer) {
    if (MyTimer.isWork()) {
        window.alert("You haven't start the game!\nPleast click the start button!");
    } else {
        window.alert("Game Over!\nYou Win!\n" + "Passing time: " + (MyTimer.getTime() - 1).toString());
        MyTimer.end();
    }
}

function restart(MyTimer) {
    var arr = [];
    for (var i = 0; i < 15; ++i)
        arr.push(i);
    var boxes = document.getElementsByClassName('box');
    do {
        arr.sort(function() {
            return Math.random() - 0.5;
        });
    } while (!A_puzzle(arr));

    for (var j = 0; j < 14; j += 2) {
        move_driver(boxes[arr[j]], boxes[arr[j + 1]], true);
        move_driver(boxes[arr[j]], boxes[arr[j + 1]], false);
    }
    move_driver(boxes[14], boxes[7], true);
    move_driver(boxes[14], boxes[7], false);

    MyTimer();
}

function A_puzzle(arr) {
    var count = 0;
    for (var i = 0; i < arr.length - 1; ++i) {
        for (var j = i + 1; j < arr.length; ++j) {
            if (arr[i] > arr[j]) count++;
        }
    }
    return (count % 2 === 0);
}

var timer = function() {
    var time = 0;
    var timer_status;
    var t = document.getElementsByClassName("time")[0];

    var inner_timer = function() { // the real timer
        t.value = time++;
        timer_status = setTimeout(inner_timer, 1000);
    };

    var work = function() {
        if (time !== 0) { // if the timer is working, then stop it first
            clearTimeout(timer_status);
            time = 0;
            t.value = time;
        }
        inner_timer(); // let it work
    };
    work.isWork = function() {
        return time === 0;
    };
    work.getTime = function() {
        return time;
    };
    work.end = function() {
        clearTimeout(timer_status);
        time = 0;
    };

    return work;
};
