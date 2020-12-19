(function($){

    $.fn.simplePagination = function (options){

        const DEFAULT_OPTIONS = {
            dataSource              : [],
            maxNumberOfBoxes        : 9,
            isBackAndNextButtons    : true,
            paginationBarClass      : '',
            pageNumberClass         : '',
            pageNumberActiveClass   : '',
            pageNumberHoverClass    : '',
            callback                : function(){
                console.log('hello world')
            }
        }

        const OPTIONS = $.extend({}, DEFAULT_OPTIONS, options)

        console.log(OPTIONS) 

    }

}(jQuery))