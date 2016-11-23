$(function() {
    $('.icon').mouseout(init);

    $('.icon').click(function() { // robot's button
        init();
        var currentSum = 0;
        var sequence = [];
        for (var x of _.shuffle(_.range(5)))
            sequence.push($($('.button')[x]).attr('title'));
        $('.random-sequence').addClass('show').removeClass('hide').text(sequence.join(','));
        sequence.push('Bubble');
        var arrayObj = {  // the object represents for the order of events
            cur: 0,
            array: sequence,
            'A': AHandler,
            'B': BHandler,
            'C': CHandler,
            'D': DHandler,
            'E': EHandler,
            'Bubble': BubbleHandler
        };
        var next = arrayObj.array[arrayObj.cur++];
        var start_callback = function(err) {
            arrayObj.cur--;
            $('.message span').text(err.message);
            setTimeout(function() {
                arrayObj[next](err.sum, arrayObj, start_callback);
            }, 0);
        };
        setTimeout(function() {
            arrayObj[next](currentSum, arrayObj, start_callback);
        }, 0);
    });

    function AHandler(currentSum, arrayObj, callback) {
        $('.A .random-number').addClass('show').removeClass('hide').text("...");
        $('.A').addClass('inactive').removeClass('active');

        var next = arrayObj.array[arrayObj.cur++];
        var A_callback = function(err) {
            arrayObj.cur--;
            $('.message span').text(err.message);
            setTimeout(function() {
                arrayObj[next](err.sum, arrayObj, A_callback);
            }, 0);
        };

        $.ajax('/', {}).done(function(data) {
            if (Math.random() - 0.5 > 0) { // get到数据后随机异常
                var message = {
                    sum: currentSum,
                    'message': '这不是个天大的秘密',
                };
                callback(message);
            } else {
                $('.A .random-number').text(data);
                currentSum += parseInt(data);
                $('.message span').text('这是个天大的秘密');

                setTimeout(function() {
                    arrayObj[next](currentSum, arrayObj, A_callback);
                }, 0);
            }
        });
    }

    function BHandler(currentSum, arrayObj, callback) {
        $('.B .random-number').addClass('show').removeClass('hide').text("...");
        $('.B').addClass('inactive').removeClass('active');

        var next = arrayObj.array[arrayObj.cur++];
        var B_callback = function(err) {
            arrayObj.cur--;
            $('.message span').text(err.message);
            setTimeout(function() {
                arrayObj[next](err.sum, arrayObj, B_callback);
            }, 0);
        };

        $.ajax('/', {}).done(function(data) {
            if (Math.random() - 0.5 > 0) { // get到数据后随机异常
                var message = {
                    sum: currentSum,
                    'message': '我知道',
                };
                callback(message);
            } else {
                $('.B .random-number').text(data);
                currentSum += parseInt(data);
                $('.message span').text('我不知道');

                setTimeout(function() {
                    arrayObj[next](currentSum, arrayObj, B_callback);
                }, 0);
            }
        });
    }

    function CHandler(currentSum, arrayObj, callback) {
        $('.C .random-number').addClass('show').removeClass('hide').text("...");
        $('.C').addClass('inactive').removeClass('active');

        var next = arrayObj.array[arrayObj.cur++];
        var C_callback = function(err) {
            arrayObj.cur--;
            $('.message span').text(err.message);
            setTimeout(function() {
                arrayObj[next](err.sum, arrayObj, C_callback);
            }, 0);
        };

        $.ajax('/', {}).done(function(data) {
            if (Math.random() - 0.5 > 0) { // get到数据后随机异常
                var message = {
                    sum: currentSum,
                    'message': '你知道',
                };
                callback(message);
            } else {
                $('.C .random-number').text(data);
                currentSum += parseInt(data);
                $('.message span').text('你不知道');

                setTimeout(function() {
                    arrayObj[next](currentSum, arrayObj, C_callback);
                }, 0);
            }
        });
    }

    function DHandler(currentSum, arrayObj, callback) {
        $('.D .random-number').addClass('show').removeClass('hide').text("...");
        $('.D').addClass('inactive').removeClass('active');

        var next = arrayObj.array[arrayObj.cur++];
        var D_callback = function(err) {
            arrayObj.cur--;
            $('.message span').text(err.message);
            setTimeout(function() {
                arrayObj[next](err.sum, arrayObj, D_callback);
            }, 0);
        };

        $.ajax('/', {}).done(function(data) {
            if (Math.random() - 0.5 > 0) { // get到数据后随机异常
                var message = {
                    sum: currentSum,
                    'message': '他知道',
                };
                callback(message);
            } else {
                $('.D .random-number').text(data);
                currentSum += parseInt(data);
                $('.message span').text('他不知道');

                setTimeout(function() {
                    arrayObj[next](currentSum, arrayObj, D_callback);
                }, 0);
            }
        });
    }

    function EHandler(currentSum, arrayObj, callback) {
        $('.E .random-number').addClass('show').removeClass('hide').text("...");
        $('.E').addClass('inactive').removeClass('active');

        var next = arrayObj.array[arrayObj.cur++];
        var E_callback = function(err) {
            arrayObj.cur--;
            $('.message span').text(err.message);
            setTimeout(function() {
                arrayObj[next](err.sum, arrayObj, E_callback);
            }, 0);
        };

        $.ajax('/', {}).done(function(data) {
            if (Math.random() - 0.5 > 0) { // get到数据后随机异常
                var message = {
                    sum: currentSum,
                    'message': '对了',
                };
                callback(message);
            } else {
                $('.E .random-number').text(data);
                currentSum += parseInt(data);
                $('.message span').text('才怪');

                setTimeout(function() {
                    arrayObj[next](currentSum, arrayObj, E_callback);
                }, 0);
            }
        });
    }

    function BubbleHandler(currentSum, arrayObj, callback) {
        setTimeout(function() {
            $('.message span').text('楼主异步调用战斗力感人，目测不超过' + currentSum.toString());
            reset();
        }, 500);
    }

    function init() {
        $('.message span').text('');
        $("span[class!='options']").each(function() {
            $(this).removeClass('show').addClass('hide');
        });
        $('.message span').removeClass('hide');
        $('.button').each(function() {
            $(this).addClass('active').removeClass('inactive').removeClass('clicked');
        });
        $('.info').each(function() {
            $(this).addClass('inactive').removeClass('active');
        });
        $('.random-sequence').addClass('hide').removeClass('show');
    }

    function reset() {
        $('.button').each(function() {
            $(this).removeClass('clicked').addClass('active').removeClass('inactive');
        });
    }

    // function activateButtons() {
    //     $('.button').each(function() {
    //         if (!!!$(this).hasClass('clicked') && $(this).find('.random-number').text() !== '...')
    //             $(this).addClass('active').removeClass('inactive');
    //     });
    // }

    // function inactivateButtons() {
    //     $('.button').each(function() {
    //         $(this).addClass('inactive').removeClass('active');
    //     });
    // }

    // function activeteResultButton() {
    //     $('.info').addClass('active').removeClass('inactive');
    // }

    // function inactiveteResultButton() {
    //     $('.info').addClass('inactive').removeClass('active');
    // }

    // function ifResultButtonIsActive() {
    //     return _.every($('.button'), (x) => $(x).hasClass('clicked'));
    // }
});
