$(function() {
    var btn = document.getElementById('goTop');
    var isTop = true;

    // 滚动条滚动时触发事件
    $(window).scroll(function() {
        // jQuery: scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置
        var scrollTop = $(window).scrollTop();
        var scrollHeight = $(document).height();  // 可滚动区域总高度
        var footerHeight = $('footer').height();  //
        var windowHeight = $(window).height();  // 浏览器窗口高度
        if (scrollTop > 0) {
            $(btn).removeClass('fixed-tool-item-hidden').addClass('fixed-tool-item-show');
        } else {
            $(btn).removeClass('fixed-tool-item-show').addClass('fixed-tool-item-hidden');
        };
        isTop = false;
    });

    btn.onclick = function() {
        if (!isTop) {
            goTop(400);
            isTop = true;
        };
        function goTop(speed) {
            // jQuery动画效果,滚动到顶部
            $('body').animate({scrollTop:'0'}, speed, 'swing');
        }
    }
});

// css:
// .fixed-tool-item-hidden {
//     display: none;
// }
// .fixed-tool-item-show {
//     display: block;
//     position: fixed;
//     top: auto;
//     bottom: 70px;
// }
