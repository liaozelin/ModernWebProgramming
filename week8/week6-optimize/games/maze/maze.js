'use strict';
/*global $:false*/

var start_or_not = 0;
// test if the mouse through test-unit in the path, to check cheat
var through_path = 0;

$(function() {
    $('#start').mouseover(function() {
        start_or_not = 1;
        $('#maze').attr('class', 'cursor-change');
        // hidden the visual result
        var visual_res = $('.visual')[0];
        if (visual_res) $(visual_res).attr('class', 'not-visual');
    });

    $('#end').mouseover(function() {
        if (start_or_not) {
            if (!through_path)
                $('#cheat').attr('class', 'visual');
            else
                $('#win').attr('class', 'visual');
        }
    });

    $('#end').mouseout(function() {
        $('#maze').attr('class', '');
        start_or_not = 0;
        through_path = 0;
    });

    $('#test-unit').mouseover(function() {
        if (start_or_not) through_path = 1;
    });

    $('.unable').each(function() {
        $(this).mouseover(function() {
            if (start_or_not) {
                $('#lose').attr('class', 'visual');
                $(this).attr('class', 'unable-touched');
                $('#maze').attr('class', '');
            }
        });

        $(this).mouseout(function() {
            $(this).attr('class', 'unable');
            start_or_not = 0;
            through_path = 0;
        });
    });
});
