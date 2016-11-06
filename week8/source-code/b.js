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
    // start working
    var run = function() {
        $('table').each(function() {
            var that = this;
            if (this.children.length == 2) {
                var thead = this.children[0];
                var tdata = this.children[1].children;
                $($(thead).children()).each(function() {
                    // var index = _.indexOf($(this).parent().children(), this);
                    // sortAndFill.bind(that)(tdata, index);
                    // var sorted = _.sortBy(tdata, (o) => $($(o).children()[index]).text());
                    // var sorted_reverse = _.cloneDeep(sorted);
                    // sorted_reverse.reverse();
                    $($(this).children()).each(function() {
                        var count = 0;
                        $(this).click(function() {
                            // if (++count % 2 === 1) $(that.children[1]).append(sorted);
                            // else $(that.children[1]).append(sorted_reverse);
                            var index = _.indexOf($(this).parent().children(), this);
                            var sorted = _.sortBy(tdata, (o) => $($(o).children()[index]).text());
                            if (++count % 2 === 0) sorted.reverse();
                            $(that.children[1]).append(sorted);
                        });
                    });
                });
            } else {
                var thead = this.children[0][0];
                var tdata = this.children[0];
                tdata.splice(0, 1);
                $($(thead).children()).each(function() {
                    sortAndFill(tdata);
                });
            }
        });
        // var thead = $('thead');
        // if (thead[0]) { // if table has the thead DOM
        //     $(thead).each(function() {
        //         var tdata = $(this).next().children(); // get the data needed sorted
        //         $(this.children).each(function() {
        //             $($(this).children()).each(function() {
        //                 var t = $(this).parentsUntil('thead');
        //                 sortAndFill.bind(t[t.length - 1])(tdata);
        //             });
        //         });
        //     });
        // } else { // only tbody
        //     var content = $('table').children();
        //     $(content).each(function() {
        //         var thead_t = $(this).children()[0]; // let the first child of tbody be "thead"
        //         var tdata = $(this).children();
        //         tdata.splice(0, 1); // get the data needed sorted
        //         $($(thead_t).children()).each(function() {
        //             sortAndFill.bind(this)(tdata);
        //         });
        //     });
        // }
    };
    // var sortAndFill = function(tdata, index) {
    //     // var index = _.indexOf($(this).parent().children(), this);
    //     var sorted = _.sortBy(tdata, (o) => $($(o).children()[index]).text());
    //     var sorted_reverse = _.cloneDeep(sorted);
    //     sorted_reverse.reverse();
    //     var count = 0;
    //     $(this).click(function() {
    //         if (++count % 2 === 1) $(this).parent().parent().append(sorted);
    //         else $(this).parent().parent().append(sorted_reverse);
    //     });
    // };
    setTimeout(run, 300);
}.call(this));
