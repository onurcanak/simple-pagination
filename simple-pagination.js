(function($){

    /**
     * Initializing the component
     * @param {*} options : user's options to use
     */
    $.fn.simplePagination = function (options){

        //#region initializing the component

        const DEFAULT_OPTIONS = {
            dataSource              : [],
            maxBoxCount             : 9,
            maxItemsPerPage         : 5,
            isBackAndNextButtons    : false,
            // paginationBarClass      : '',
            // pageNumberClass         : '',
            // pageNumberActiveClass   : '',
            // pageNumberHoverClass    : '',
            callback                : function(){
                throwError('Callback function is not specified. Please specify that what you want with paginated data in a callback function.')
            }
        }

        const OPTIONS = $.extend({mainElementId : this.attr('id')}, DEFAULT_OPTIONS, options)
        
        try{
            // pass the first part of the data (items for first page) through callback function
            let firstPartialData = OPTIONS.dataSource.slice(0, OPTIONS.maxItemsPerPage)
            OPTIONS.callback(firstPartialData)

            const numberOfPages = OPTIONS.dataSource.length % OPTIONS.maxItemsPerPage == 0 ? Math.floor(OPTIONS.dataSource.length / OPTIONS.maxItemsPerPage) : Math.floor(OPTIONS.dataSource.length / OPTIONS.maxItemsPerPage) + 1
            if(numberOfPages > 1) drawPaginationBarInitially(numberOfPages, this)
        }
        catch(e){
            throwError(e)
        }

        //#endregion

        //#region functions & event handlers

        /**
         * Function to throw an error
         * @param {*} errMsg : Error message to throw
         */
        function throwError(errMsg){
            throw new Error(errMsg)
        }

        /**
         * draws the pagination bar for the first time when component initialized
         * @param {*} numberOfPages : total number of pages
         */
        function drawPaginationBarInitially(numberOfPages){
            try {
                var paginationBar = $('<ul class="pagination simple-pagination-bar justify-content-center" currentPageNumber="1"> </ul>')

                if(numberOfPages <= OPTIONS.maxBoxCount){
                    for(let i=0; i<numberOfPages; i++){
                        paginationBar.append(`<li class="page-item ${i == 0 ? 'active' : ''}" pageNumber="${i + 1}"><a class="page-link">${i + 1}</a></li>`)
                    }
                }
                else{
                    for(let i=0; i < OPTIONS.maxBoxCount-2; i++){
                        paginationBar.append(`<li class="page-item ${i == 0 ? 'active' : ''}" pageNumber="${i + 1}"><a class="page-link">${i + 1}</a></li>`)
                    }
                    paginationBar.append(`<li class="page-item"><a class="page-link">...</a></li>`)
                    paginationBar.append(`<li class="page-item" pageNumber="${numberOfPages}"><a class="page-link">${numberOfPages}</a></li>`)
                }
                $(`#${OPTIONS.mainElementId}`).append(paginationBar)
            } 
            catch (e) {
                throwError(e)
            }
        }

        /**
         *  pagination bar click event
         */
        $(document).on('click', `#${OPTIONS.mainElementId} .simple-pagination-bar .page-item`, function(){
            let selectedPageNum = parseInt($(this).attr('pageNumber'))
            $(`#${OPTIONS.mainElementId} .simple-pagination-bar`).attr('currentPageNumber', selectedPageNum)
            
            let dataStartIndex  = (selectedPageNum - 1) * OPTIONS.maxItemsPerPage
            let dataEndIndex    = (selectedPageNum * OPTIONS.maxItemsPerPage)
            OPTIONS.callback(OPTIONS.dataSource.slice(dataStartIndex, dataEndIndex))    // pass partial data through callback function

            // !!! BURADA BAR MODİFY EDİLECEK !!!

        })

        //#endregion



    }

}(jQuery))