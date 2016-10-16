'use strict';

var start_or_not = 0;
// test if the mouse through test-unit in the path, to check cheat
var through_path = 0;

window.onload = function() {
    var start = document.getElementById('start');
    var end = document.getElementById('end');
    var test = document.getElementById('test-unit');

    start.addEventListener('mouseover', function() {
        start_or_not = 1;
        document.getElementById('maze').className = 'cursor-change';
        maze_start();
    });
    end.addEventListener('mouseover', function() {
        if (start_or_not) {
            if (!through_path) {
                var res = document.getElementById('cheat');
                res.setAttribute('class', 'visual');
            } else {
                var res = document.getElementById('win');
                res.setAttribute('class', 'visual');
            }
        }
    });
    end.addEventListener('mouseout', function() {
        start_or_not = 0;
        document.getElementById('maze').className = '';
        through_path = 0;
    });
    test.addEventListener('mouseover', function() {
        if (start_or_not) through_path = 1;
    });
};
var maze_start = function() {
    // hidden the visual result
    var visual_res = document.getElementsByClassName('visual');
    if (visual_res) {
        for (var t of visual_res)
            t.className = 'not-visual';
    }

    var unable = document.getElementsByClassName('unable');
    var res = document.getElementById('lose');
    for (var x of unable) {
        x.addEventListener('mouseover', function() {
            if (start_or_not) {
                res.setAttribute('class', 'visual');
                this.setAttribute('class', 'unable-touched');
                document.getElementById('maze').className = '';
            }
        });
        x.addEventListener('mouseout', function() {
            this.setAttribute('class', 'unable');
            start_or_not = 0;
            through_path = 0;
        });
    }
};
