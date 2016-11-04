//http://www.cplusplus.com/reference/string/string/?kw=string
(function() {
    // add script
    var head = document.getElementsByTagName('head')[0];
    var jq = document.createElement('script');
    jq.type = "text/javascript";
    jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
    var lodash = document.createElement('script');
    lodash.type = "text/javascript";
    lodash.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";
    head.appendChild(jq);
    head.appendChild(lodash);
    var run = function() {
        var content = $('table').children();
        $(content).each(function() {
            var thead = $(this).children()[0];
            var tdata = $(this).children();
            tdata.splice(0, 1);
            $($(thead).children()).each(function() {
                var index = _.indexOf($(this).parent().children(), this);
                var sorted = _.sortBy(tdata, (o) => $($(o).children()[index]).text());
                var count = 0;
                $(this).click(function() {
                    if (++count % 2 === 1) $(this).parent().parent().append(sorted);
                    else $(this).parent().parent().append(sorted.reverse());
                });
            });
        });
    };
    setTimeout(run, 300);
}.call(this));
