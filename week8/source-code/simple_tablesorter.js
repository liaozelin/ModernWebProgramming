(function() {
    'use strict';
    /*global $:false, _:false */
    // add scripts
    var jq = document.createElement('script');
    jq.type = "text/javascript";
    jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
    var lodash = document.createElement('script');
    lodash.type = "text/javascript";
    lodash.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(jq);
    head.appendChild(lodash);
    start working
    var run = function() {
        $('table').each(function() {
            var that = this;
            if (this.children.length == 2) {
                var thead = this.children[0].children;
                var tdata = this.children[1].children;
                $($(thead).children()).each(function() {
                    var count = 0;
                    $(this).click(function() {
                        var index = _.indexOf($(this).parent().children(), this);
                        var sorted = _.sortBy(tdata, (o) => $($(o).children()[index]).text());
                        if (++count % 2 === 0) sorted.reverse();
                        $(that.children[1]).append(sorted);
                    });
                });
            } else {
                var thead = this.children[0].children[0];
                var tdata = $(this.children[0]).children();
                tdata.splice(0, 1)
                $($(thead).children()).each(function() {
                    var count = 0;
                    $(this).click(function() {
                        var index = _.indexOf($(this).parent().children(), this);
                        var sorted = _.sortBy(tdata, (o) => $($(o).children()[index]).text());
                        if (++count % 2 === 0) sorted.reverse();
                        $(that.children[0]).append(sorted);
                    });
                });
            }
        });
    };

    setTimeout(run, 300);
}.call(this));
