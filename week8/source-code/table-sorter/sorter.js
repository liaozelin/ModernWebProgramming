'use strict';
/*global $:false, _:false */

$(function() {
    $('th').click(function() {
        sort(this);
    });
});

function sort(that) {
    setSortStyle(that); // set sort mode and change the style of thead
    var index = _.indexOf($(that).parent().children(), that); // sort the table by? get the col index
    var trs = $(that).parentsUntil('table').next().children(); // get real trs needed sorted
    var cache = clearAndGetSortedTextsCache(trs, index);
    trs.each(function() {
        setNewTdText(this, cache, ($(that).hasClass('sorted-ascend') ? false : true));
    });
}

function setSortStyle(that) {
    $(that).siblings().each(function() {
        removeClassOfSiblings(this);
    });
    if ($(that).attr('class') === undefined || $(that).attr('class') === "") {
        $(that).addClass('sorted-ascend');
    } else {
        $(that).toggleClass('sorted-ascend');
        $(that).toggleClass('sorted-descend');
    }
}

function removeClassOfSiblings(that) {
    if ($(that).hasClass('sorted-ascend'))
        $(that).removeClass('sorted-ascend');
    else if ($(that).hasClass('sorted-descend'))
        $(that).removeClass('sorted-descend');
}

function clearAndGetSortedTextsCache(trs, index) {
    var cache = [];
    trs.each(function() {
        clearTdTextAndFillCache(this, cache);
    });
    return _.sortBy(cache, function(o) { // sort cache and return
        return o.split(',')[index];
    });
}

function clearTdTextAndFillCache(that, cache) {
    var tdText = $(that).html().match(/<td>(.*?)<\/td>/g);
    $(that).children().each(function() {
        $(this).text(""); // delete old contents
    });
    cache.push($(tdText).map(function() {
        return this.match(/<td>(.*?)<\/td>/)[1];
    }).get().join(','));
}

function setNewTdText(that, cache, sortMode) {
    var m = getStrFromCache(cache, sortMode).split(',');
    $(that).children().each(function() {
        $(this).text(m[0]);
        m.shift();
    });
}

function getStrFromCache(cache, reverse) {
    if (!reverse)
        return cache.shift();
    else
        return cache.pop();
}
