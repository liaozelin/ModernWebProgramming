'use strict';
/*global $:false, _:false */

(function() {
    $(function() {
        new table_sorter();
    });

    function table_sorter() {
        this.start();
    }

    var t = table_sorter.prototype;

    t.cache = [];
    t.descend = false;

    t.start = function() {
        $('th').click(function(event) {
            this.sort(event.target);
        }.bind(this));
    };

    t.sort = function(ele) {
        this.setSortStyle(ele); // set sort mode and change the style of thead
        var index = _.indexOf($(ele).parent().children(), ele); // sort the table by? get the col index
        var trs = $(ele).parentsUntil('table').next().children(); // get real trs needed sorted
        this.clearAndGetSortedTextsCache(trs, index);
        this.descend = ($(ele).hasClass('sorted-ascend') ? true : false);
        var that = this;
        trs.each(function() {
            that.setNewTdText(this);
        });
    };

    t.setSortStyle = function(ele) {
        var that = this;
        $(ele).siblings().each(function() {
            that.removeClassOfSiblings(this);
        });
        if ($(ele).attr('class') === undefined || $(ele).attr('class') === "") {
            $(ele).addClass('sorted-ascend');
        } else {
            $(ele).toggleClass('sorted-ascend');
            $(ele).toggleClass('sorted-descend');
        }
    };

    t.removeClassOfSiblings = function(ele) {
        if ($(ele).hasClass('sorted-ascend'))
            $(ele).removeClass('sorted-ascend');
        else if ($(ele).hasClass('sorted-descend'))
            $(ele).removeClass('sorted-descend');
    };

    t.clearAndGetSortedTextsCache = function(trs, index) {
        var that = this;
        trs.each(function() {
            that.clearTdTextAndFillCache(this);
        });
        this.cache = _.sortBy(this.cache, (o) => o.split(',')[index]);
    };

    t.clearTdTextAndFillCache = function(ele) {
        var tdText = $(ele).html().match(/<td>(.*?)<\/td>/g);
        $(ele).children().each(function() {
            $(this).text(""); // delete old contents
        });
        this.cache.push($(tdText).map(function() {
            return this.match(/<td>(.*?)<\/td>/)[1];
        }).get().join(','));
    };

    t.setNewTdText = function(ele) {
        var m = this.getStrFromCache().split(',');
        $(ele).children().each(function() {
            $(this).text(m.shift());
        });
    };

    t.getStrFromCache = function() {
        if (this.descend)
            return this.cache.shift();
        else
            return this.cache.pop();
    };
})();
