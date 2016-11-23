$(function() {
    var robot = {  // manager robot's status
        status: false,
        'work': function() {
            status = true;
        },
        'stop': function() {
            status = false;
        },
        'getStatus': function() {
            return status;
        }
    };

    var randomArray = {  // manager the random number array
        cur: 0,
        array: [],
        'init': function() {
            this.array = _.shuffle(_.range(5));
            this.cur = 0;
        },
        'get': function() {
            return this.array[this.cur++];
        },
        'getSequence': function() {
            var sequence = [];
            for (var i = 0; i < 5; ++i)
                sequence.push($($('.button')[this.array[i]]).attr('title'));
            return sequence.join(',');
        }
    }

    var jqxhr = null;

    var timerstamp;

    $('#button').mouseout(function() {
        timerstamp = setTimeout(init, 800);
    });
    $('#button').mouseover(function() {
        clearTimeout(timerstamp);
    });

    $('.button').each(function() {
        $(this).click(function(event) {
            if ($(event.target).hasClass('clicked')) return false;
            $(event.target).find('.random-number').addClass('show').removeClass('hide').text("...");
            $(event.target).addClass('clicked');
            inactivateButtons();
            sendAjaxReq(event.target);
        });
    });

    $('.info').click(function() {
        if ($(this).hasClass('inactive')) return false;
        var sum = 0;
        $('.button').each(function() {
            sum += parseInt($(this).find('.random-number').text());
        });
        $(this).find('span').addClass('show').removeClass('hide').text(sum.toString());
        inactiveteResultButton();
        reset();
    });

    $('.icon').click(function() {  // robot's button
        init();
        robot.work();
        randomArray.init();
        $('.random-sequence').addClass('show').removeClass('hide').text(randomArray.getSequence());
        $($('.button')[randomArray.get()]).click();
    });

    function init() {
        robot.stop();
        if (!!jqxhr) jqxhr.abort();
        $("span[class!='options']").each(function() {
            $(this).removeClass('show').addClass('hide');
        });
        $('.button').each(function() {
            $(this).addClass('active').removeClass('inactive').removeClass('clicked');
        });
        $('.info').each(function() {
            $(this).addClass('inactive').removeClass('active');
        });
        $('.random-sequence').addClass('hide').removeClass('show');
    }

    function reset() {
        robot.stop();
        $('.button').each(function() {
            $(this).removeClass('clicked').addClass('active').removeClass('inactive');
        });
    }

    function sendAjaxReq(target) {
        jqxhr = $.ajax('/', {}).done(function(data) {
            $(target).find('.random-number').text(data);
            if (ifResultButtonIsActive()) activeteResultButton();
        }).always(function() {
            activateButtons();
            if (robot.getStatus() !== 'false') {
                var i = randomArray.get();
                if (i !== undefined) $($('.button')[i]).click();
                if (i === undefined) $('.info').click();
            }
        });
    }

    function activateButtons() {
        $('.button').each(function() {
            if (!!!$(this).hasClass('clicked') && $(this).find('.random-number').text() !== '...')
                $(this).addClass('active').removeClass('inactive');
        });
    }

    function inactivateButtons() {
        $('.button').each(function() {
            $(this).addClass('inactive').removeClass('active');
        });
    }

    function activeteResultButton() {
        $('.info').addClass('active').removeClass('inactive');
    }

    function inactiveteResultButton() {
        $('.info').addClass('inactive').removeClass('active');
    }

    function ifResultButtonIsActive() {
        return _.every($('.button'), (x) => $(x).hasClass('clicked'));
    }
});
