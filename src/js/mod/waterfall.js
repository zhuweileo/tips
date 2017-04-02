/**
 * Created by 维 on 2017/4/1.
 */
var waterfall = (function(){
    function init($ct) {
        var $items = $ct.children();
        //计算有多少列
        var colNum = parseInt($(window).width()/$items.outerWidth(true));
        //为了使所有列居中，需要初始化left值
        var leftInit = parseInt(($(window).width()-colNum*$items.outerWidth(true))/2);
        //用于存储每一列的高度
        var colHeight = [];
        for(var i=0;i<colNum;i++){
            colHeight[i] = 0;
        }
        //遍历每个元素，放置它们
        $items.each(function () {
            var top;
            var left = leftInit;
            var index;
            top = Math.min.apply(null,colHeight);
            index = colHeight.indexOf(top);
            left +=$items.outerWidth(true)*index;
            colHeight[index] += $(this).outerHeight(true);
            $(this).css({
                top:top,
                left:left
            })
        })
    }
    return {
        init:init
    }
})();
module.exports = waterfall;