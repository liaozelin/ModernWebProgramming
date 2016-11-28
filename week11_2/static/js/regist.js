'use strict';
/*global $:false */

$(function() {

    $('form').submit(function() {
        return _.every($('span'), (x) => $(x).hasClass('hidden'));
    });

    $('button.reset').click(clearAllErrors);

    // 在每个input失去焦点时,判断格式是否合法,若合法,通过ajax向服务器请求数据判断是否该项重复;若是有错误,则显示错误提示框
    // $('input.username').blur(function() {
    //     clearErrorOf(this);
    //     if ($(this).val() !== '') {
    //         if (!validator.username($(this).val())) fail('span.username');
    //         else sentAjaxReq($(this).val());
    //     }
    // });
    // $('input.studentID').blur(function() {
    //     clearErrorOf(this);
    //     if ($(this).val() !== '') {
    //         if (!validator.studentID($(this).val())) fail('span.studentID');
    //         else sentAjaxReq($(this).val());
    //     }
    // });
    // $('input.email').blur(function() {
    //     clearErrorOf(this);
    //     if ($(this).val() !== '') {
    //         if (!validator.email($(this).val())) fail('span.email');
    //         else sentAjaxReq($(this).val());
    //     }
    // });
    // $('input.phone').blur(function() {
    //     clearErrorOf(this);
    //     if ($(this).val() !== '') {
    //         if (!validator.phone($(this).val())) fail('span.phone');
    //         else sentAjaxReq($(this).val());
    //     }
    // });
    var items = ['username', 'studentID', 'email', 'phone'];
    for (var item of items) {
        (function(item) {
            $('input.' + item).blur(function() {
                clearErrorOf(this);
                if ($(this).val() !== '') {
                    if (!validator[item]($(this).val())) fail('span.' + item);
                    else sentAjaxReq(item, $(this).val());
                }
            });
        })(item);
    }
    $('input.password').blur(function() {
        clearErrorOf(this);
        if ($(this).val() !== '' && !validator.password($(this).val()))
            fail('span.password');
        $('input.password2').blur();
    });
    $('input.password2').blur(function() {
        clearErrorOf(this);
        if ($(this).val() !== '' && $(this).val() !== $('input.password').val())
            fail('span.password2');
        $('input.password').blur();
    });

    $('.signin').click(function() {
        window.location = '/signin';
    });

    function sentAjaxReq(item, data) {
        // var mydata = {};
        // mydata[mode] = $('input.' + mode).val();
        $.ajax('/ajax', {
            method: 'POST',
            // headers: {
            //     'accept': '/ajax' // 提供标识供服务器判断是否是ajax请求
            // },
            data: {
                type: item,
                data: data
            }
        }).done(function(data) {
            if (data.startsWith('invalid'))
                $('span.' + data.substring(8) + 'E').addClass('show').removeClass('hidden');
            else
                $('span.' + data.substring(5) + 'E').addClass('hidden').removeClass('show');
        }).fail(function(xhr, status) {
            window.alert('失败: ' + xhr.status + ', 原因: ' + status);
        });
    }

    function fail(str) { // 输入的内容格式不合法
        $(str).addClass('show').removeClass('hidden');
    }

    function clearAllErrors() { // 隐藏所有提示栏
        $('span').each(function() {
            $(this).removeClass('show').addClass('hidden');
        });
    }

    function clearErrorOf(element) { // 隐藏目标元素的所有提示栏
        $(element).parent().find('span').each(function() {
            $(this).addClass('hidden').removeClass('show');
        });
    }
});
