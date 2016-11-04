(function() {
    'use strict';
    /*global $:false, _:false */

    var MyFlag = {
        time: 30,
        _score: 0,
        _timer_status: undefined,
        start_or_not: false
    };

    $(function() {
        initial();

        $('#start_button').click(start);

        $('button').each(click_event);
    });

    function initial() {
        var fram = document.createDocumentFragment();
        for (var i = 0; i < 6; ++i) {
            for (var j = 0; j < 10; ++j)
                $(fram).append($('<button></button>').attr('id', 'radio-' + (i * 10 + j).toString()));
            $(fram).append($('<br/>'));
        }
        $('#moles').append(fram);
    }
    // time counter
    function timer() {
        if (MyFlag.time === 0) {
            over();
            MyFlag.time = 30;
            MyFlag._score = 0;
            return;
        }
        $('#time').val(--MyFlag.time);
        MyFlag._timer_status = setTimeout(timer, 1000);
    }
    // set moles
    function resetMole() {
        if ($('.radio-input-chose')[0]) return;
        $('#radio-' + _.random(59)).addClass('radio-input-chose');
    }

    function start() {
        $('#status').val(MyFlag.start_or_not ? 'Stop' : 'Playing');
        if (!MyFlag.start_or_not) {
            $('#time').val(MyFlag.time);
            $('#score').val(MyFlag._score);
            MyFlag._timer_status = setTimeout(timer, 1000);
            resetMole();
        } else {
            clearTimeout(MyFlag._timer_status);
        }
        MyFlag.start_or_not = !MyFlag.start_or_not;
    }

    function over() {
        $('#status').val('Game Over!');
        $('.radio-input-chose').removeClass('radio-input-chose');
        MyFlag.start_or_not = false;
        window.alert('Game Over.' + '\n' + 'Your score is: ' + MyFlag._score.toString());
    }

    var click_event = function() {
        $(this).click(function() {
            if (!MyFlag.start_or_not) return;
            if ($(this).hasClass('radio-input-chose')) {
                $(this).removeClass('radio-input-chose');
                $('#score').val(++MyFlag._score);
                resetMole();
            } else {
                $('#score').val(--MyFlag._score);
            }
        });
    };
})();
