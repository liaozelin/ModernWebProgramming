(function () {
    'use strict';
    /*global $:false, _:false */

    $(function() {
        initial();
        // basic requirement
        $('.box').each(function() {
            $(this).click(function() {
                move(this);
            });
        });

        $('#start').click(restart);
        // extend items
        $('#hint').click(function() {
            $('#picture').toggleClass("picture-hidden");
            $('#picture').toggleClass("picture-show");
        });

        $('#filechooser').change(function() {
            var file = this.files[0];
            if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) { // avoid invalid pectures
                window.alert('invalid picture!');
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {  // I think it's another method
                $('.box').each(function() {
                    $(this).css('background-image', 'url(' + e.target.result + ')').css('background-size', "352px 352px");
                });
            };
            reader.readAsDataURL(file);
        });

        $('#init-image').click(function() {
            $('.box').each(function() {
                $(this).css('background-image', 'url(panda.jpg)');
            });
        });
    });

    function initial() {
        var fram = document.createDocumentFragment();
        _.times(16, function() {
            var i = _.uniqueId() - 1;
            var t = $('<div></div>').attr('id', "box-" + i.toString());
            $(t).addClass('box').addClass("box-bg-pos-" + i.toString())
                .addClass("row-" + parseInt(i / 4).toString()).addClass("col-" + (i % 4).toString());
            $(fram).append(t);
        });
        $('#main-body').append(fram);
    }

    function move(element) {
        var pos = getPos(element);
        var blank = document.getElementById('box-15');
        var blank_pos = getPos(blank);
        if (Math.abs(pos[0] - blank_pos[0]) === 90 && pos[1] === blank_pos[1]) { // blank box locates on top or buttom
            move_driver(element, blank, true);
            gameover();
        } else if (Math.abs(pos[1] - blank_pos[1]) === 90 && pos[0] === blank_pos[0]) { // blank box locates on right or left
            move_driver(element, blank, false);
            gameover();
        }
    }

    // if mode is true, exchange row- class, else exchange col- class
    function move_driver(element, element2, mode) {
        var re = mode === true ? /row-[0-9]/ : /col-[0-9]/;
        var t = element.className.match(re)[0];
        var t2 = element2.className.match(re)[0];
        element.className = element.className.replace(re, t2);
        element2.className = element2.className.replace(re, t);
    }

    function getPos(element) {
        return Array(element.offsetTop, element.offsetLeft);
    }

    function ifComplete() {
        return _.every(Array().slice.call($('.box')), function(element) { // travel all boxes to tell if complete
            var num = parseInt(element.id.replace("box-", ""));
            var className = element.className;
            var re_row = /row-[0-9]/;
            var re_col = /col-[0-9]/;
            return (parseInt(num / 4) === parseInt(className.match(re_row)[0][4]) && num % 4 === parseInt(className.match(re_col)[0][4]));
        });
    }

    function gameover() {
        if (ifComplete()) _.delay(showOverBox, 800);
    }

    function showOverBox() {
        if (MyTimer.isWork()) {
            window.alert("You haven't start the game!\nPleast click the start button!");
        } else {
            window.alert("Game Over!\nYou Win!\n" + "Passing time: " + (MyTimer.getTime() - 1).toString());
            MyTimer.end();
        }
    }

    function restart() {
        var arr;
        var boxes = $('.box');
        do {
            arr = _.shuffle(_.range(0, 15)); // get a random order array
        } while (!A_puzzle(arr));

        shuffle_boxes(arr);

        MyTimer.work();
    }

    function shuffle_boxes(arr) {
        var boxes = $('.box');
        for (var j = 0; j < 14; j += 2) {
            move_driver(boxes[arr[j]], boxes[arr[j + 1]], true);
            move_driver(boxes[arr[j]], boxes[arr[j + 1]], false);
        }
        move_driver(boxes[14], boxes[7], true);
        move_driver(boxes[14], boxes[7], false);
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

    var MyTimer = (function() {
        // 'private' value of timer
        var time = 0;
        var timer_status;

        var inner_timer = function() { // the real timer
            $('.time')[0].value = time++;
            timer_status = setTimeout(inner_timer, 1000);
        };

        var timer = function() {};
        timer.work = function() {
            if (time !== 0) { // if the timer is working, then stop it first
                clearTimeout(timer_status);
                time = 0;
                $('.time')[0].value = time;
            }
            inner_timer(); // let it work
        };
        timer.isWork = function() {
            return time === 0;
        };
        timer.getTime = function() {
            return time;
        };
        timer.end = function() {
            clearTimeout(timer_status);
            time = 0;
        };

        return timer;
    })();
})();
