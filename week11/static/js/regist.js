'use strict';
/*global $:false */

$(function() {
    $('form').submit(function() {
        if (!_.every($('.help-block'), (x) => $(x).hasClass('hidden')))
            return false;
    });

    var items = ['username', 'studentID', 'email', 'phone'];
    for (var item of items) {
        (function(item) {
            $('input#' + item).blur(function() {
                if ($(this).val() !== '') {
                    if (!validator[item]($(this).val())) checkFail(item);
                    else sentAjaxReq(item, $(this).val());
                } else {
                    clear(item);
                }
            });
        })(item);
    }

    $('input#password').blur(function() {
        clear('password');
        if ($(this).val() !== '') {
            if (!validator.password($(this).val())) checkFail('password');
            else success('password');
        }
        $('input#password2').blur();
    });

    $('input#password2').blur(function() {
        clear('password2');
        if ($(this).val() !== '') {
            if ($(this).val() !== $('input#password').val()) checkFail('password2');
            else success('password2');
        }
        $('input.password').blur();
    });

    $('.signin').click(function() {
        window.location = '/signin';
    });

    function sentAjaxReq(item, data) {
        $.ajax('/ajax', {
            method: 'POST',
            data: {
                type: item,
                data: data
            }
        }).done(function(data) {
            if (data.startsWith('invalid'))
                repetition(data.substring(8));
            else
                success(data.substring(6));
        }).fail(function(xhr, status) {
            window.alert('失败: ' + xhr.status + ', 原因: ' + status);
        });
    }

    function clear(item) {
        $('label.' + item).parent().removeClass('has-success').removeClass('has-error').removeClass('has-feedback');
        $('span.' + item).removeClass('show').addClass('hidden');
        $('span.' + item + 'E').removeClass('show').addClass('hidden');
    }

    function success(item) {
        clear(item);
        $('label.' + item).parent().addClass('has-success').addClass('has-feedback');
        $('label.' + item).parent().children('.glyphicon-ok').removeClass('hidden').addClass('show');
    }

    function failDriver(item) {
        clear(item);
        $('label.' + item).parent().addClass('has-error').addClass('has-feedback');
        $('label.' + item).parent().children('.glyphicon-remove').removeClass('hidden').addClass('show');
    }

    function checkFail(item) {
        failDriver(item);
        $($('label.' + item).parent().children('.help-block')[0]).removeClass('hidden').addClass('show');
    }

    function repetition(item) {
        failDriver(item);
        $('span.' + item + 'E').removeClass('hidden').addClass('show');
    }
});
