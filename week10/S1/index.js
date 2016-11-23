$(function() {

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

    function init() {
        $("span[class!='options']").each(function() {
            $(this).removeClass('show').addClass('hide');
        });
        $('.button').each(function() {
            $(this).addClass('active').removeClass('inactive').removeClass('clicked');
        });
        $('.info').each(function() {
            $(this).addClass('inactive').removeClass('active');
        });
    }

    function reset() {
        $('.button').each(function() {
            $(this).removeClass('clicked').addClass('active').removeClass('inactive');
        });
    }

    function sendAjaxReq(target) {
        $.ajax('/', {}).done(function(data) {
            $(target).find('.random-number').text(data);
        }).always(function() {
            activateButtons();
            if(ifResultButtonIsActive()) activeteResultButton();
        });
    }

    function activateButtons() {
        $('.button').each(function() {
            if (!!!$(this).hasClass('clicked')) $(this).addClass('active').removeClass('inactive');
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
