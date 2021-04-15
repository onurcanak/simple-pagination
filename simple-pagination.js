(function($){

    //#region functions 

    /**
     * Function to throw an error
     * @param {*} errMsg : Error message to throw
     */
    var throwError = (errMsg) => { throw new Error(errMsg) }

    //#endregion

    /**
     * Initializing the component
     * @param {*} options : user's options to use
     */
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
                throwError('Callback function is not specified. Please specify that what you want with paginated data in a callback function.')
            }
        }

        const OPTIONS = $.extend({}, DEFAULT_OPTIONS, options)
        OPTIONS.callback.call(this, OPTIONS.dataSource)
        
    }

}(jQuery))