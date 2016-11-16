'use strict';
/*global $:false, _:false */
(function() {
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

    function run() {
        $(function() {
            new table_sorter();
        });

        // var tp = table_sorter.prototype;

        function table_sorter() {
            this.start = function() {
                $('table').each(function() {
                    new table_worker(this);
                });
            };
            this.start();
        }

        function table_worker(element) {
            this.addDatas(element);
            this.start();
        }

        var tt = table_worker.prototype;

        tt.element = undefined;
        tt.hasThead = undefined;
        tt.thead = undefined;
        tt.tdata = undefined;

        tt.addDatas = function(element) {
            this.element = element;
            this.hasThead = (this.element.children.length === 2);
            if (this.hasThead) {
                this.thead = this.children[0].children;
                this.tdata = this.children[1].children;
            } else {
                this.thead = this.children[0].children[0];
                this.tdata = $(this.children[0]).children();
                this.tdata.splice(0, 1);
            }
        };

        tt.startWork = function() {
            $($(this.thead).children()).each((function(element, hasThead) {
                sortAndFill(element, hasThead);
            })(this.element, this.hasThead, this.tdata));
        };

        function sortAndFill(element, hasThead, tdata) {
            var count = 0;
            $(this).click(function() {
                var index = _.indexOf($(this).parent().children(), this);
                var sorted = _.sortBy(tdata, (o) => $($(o).children()[index]).text());
                if (++count % 2 === 0) sorted.reverse();
                $(element.children[hasThead]).append(sorted);
            });
        }
    }

    setTimeout(run, 300);
})();
