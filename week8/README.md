优化前代码的文件夹为week*,优化后为week*-optimize,其中都只有js文件做了改动.

LoC:   优化前  优化后
week6  62,89   52,79
week7  201     169
(ps:优化前文件以本次提交为准)
(一些函数嵌套在了另外的函数里面,我认为这不违反'每个方法不超过10行'的原则,
因为完全可以把里面函数的代码抽离出来作为一个函数以控制代码不超过10行,但我认
为这没有意义,因为它们是一个整体.)

Toolkits使用心得:
    用jquery确实能省下很多时间,敲击键盘的次数减少了很多，而且也简洁明了，
如$('button').click(function(){}),一看便知是加了点击的时间处理器，比用
addEventListener('click', )简洁许多.
    lodash也极大化简了代码,比如得到一个乱序数组,用lodash,一句话就可以:
arr = _.shuffle(_.range(0, 15)), 而如果不用lodash,则需要好几行代码;lodash
有许多方法在编程过程中有很好的作用,我目前了解的也还比较少,会继续学习使用
lodash.使用lodash,可以用简短的代码实现一些复杂的功能.