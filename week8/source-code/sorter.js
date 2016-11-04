//http://www.cplusplus.com/reference/string/string/?kw=string
(function() {
    jq = document.createElement('script');
    jq.type = "text/javascript";
    jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
    lodash = document.createElement('script');
    lodash.type = "text/javascript";
    lodash.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js";
    $('head').append(jq);
    $('head').append(lodash);
    var run = function() {
        content = $('table').children();
        $(content).each(function() {
            thead = $(this).children()[0];
            tdata = $(this).children();
            tdata.splice(0, 1);
            sorted1 = _.sortBy(tdata, (o) => $($(o).children()[0]).text());
            sorted2 = _.sortBy(tdata, (o) => $($(o).children()[1]).text());
            count1 = 0;
            count2 = 0;
            $(thead.children[0]).click(function() {
                if (++count1 % 2 === 1) $(this).parent().parent().append(sorted1);
                else $(this).parent().parent().append(sorted1.reverse());
            });
            $(thead.children[1]).click(function() {
                if (++count2 % 2 === 1) $(this).parent().parent().append(sorted2);
                else $(this).parent().parent().append(sorted2.reverse());
            });
        });
    };
    setTimeout(run, 300);
})
