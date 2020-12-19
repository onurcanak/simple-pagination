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
                throwError('Callback function is not specified.')
            }
        }

        const OPTIONS = $.extend({}, DEFAULT_OPTIONS, options)
        console.log(OPTIONS)
        OPTIONS.callback.call(this, OPTIONS.dataSource)

        /**
         * Function to throw an error
         * @param {*} errMsg : Error message to throw
         */
        var throwError = (errMsg) => { throw new Error(errMsg) }

    }

}(jQuery))