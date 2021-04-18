(function($){

    /**
     * Initializing the component
     * @param {*} options : user's options to use
     */
    $.fn.simplePagination = function (options){
        //#region initializing the component

        try{
            const DEFAULT_OPTIONS = {
                dataSource              : [],
                maxItemsPerPage         : 1,
                callback                : function(){
                    throwError('Callback function is not specified. Please specify that what you want with paginated data in a callback function.')
                }
            }

            var OPTIONS = $.extend( 
                DEFAULT_OPTIONS, 
                options,
                {
                    mainElementId   : this.attr('id'),
                    maxBoxCount     : 9
                }
            )
        
            // pass the first part of the data (items for first page) through callback function
            let firstPartialData = OPTIONS.dataSource.slice(0, OPTIONS.maxItemsPerPage)
            OPTIONS.callback(firstPartialData)

            const numberOfPages = OPTIONS.dataSource.length % OPTIONS.maxItemsPerPage == 0 ? Math.floor(OPTIONS.dataSource.length / OPTIONS.maxItemsPerPage) : Math.floor(OPTIONS.dataSource.length / OPTIONS.maxItemsPerPage) + 1
            OPTIONS["numberOfPages"] = numberOfPages

            if(numberOfPages > 1) drawPaginationBarInitially(numberOfPages)
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
        $(document).on('click', `#${OPTIONS.mainElementId} .simple-pagination-bar .page-item[pageNumber]`, function(){
            try {
                let currentPageNumber   = +$(`#${OPTIONS.mainElementId} .simple-pagination-bar`).attr('currentPageNumber')
                let selectedPageNum     = parseInt($(this).attr('pageNumber'))
                $(`#${OPTIONS.mainElementId} .simple-pagination-bar`).remove()
    
                let dataStartIndex  = (selectedPageNum - 1) * OPTIONS.maxItemsPerPage
                let dataEndIndex    = (selectedPageNum * OPTIONS.maxItemsPerPage)
                OPTIONS.callback(OPTIONS.dataSource.slice(dataStartIndex, dataEndIndex))    // pass partial data through callback function
    
                var paginationBar = $('<ul class="pagination simple-pagination-bar justify-content-center"> </ul>');
                paginationBar.attr('currentPageNumber', selectedPageNum)
                
                // sayfa sayısı 9 veya daha az ise tüm sayfa numaraları çizdiriliyor
                if(OPTIONS.numberOfPages <= 9){
                    for(let i=0; i<OPTIONS.numberOfPages; i++){
                        paginationBar.append(`<li class="page-item clickable-page-number ${i == selectedPageNum - 1 ? 'active' : ''}" pageNumber="${i + 1}"><a class="page-link">${i + 1}</a></li>`)
                    }
                }
    
                /**
                 * sayfa sayısı 9'dan fazla ise 3 farklı durum bulunuyor:
                 * 1)   [1 ] [2 ] [3 ] [4 ] [5 ] [6 ] [7 ] [. ] [20] - ilk 5 sayfadan birine tıklanması
                 * 2)   [1 ] [. ] [7 ] [8 ] [9 ] [10] [11] [. ] [20] - ortalardaki bir sayfa numarasına tıklanması
                 * 3)   [1 ] [. ] [14] [15] [16] [17] [18] [19] [20] - son 5 sayfadan birine tıklanması
                 */
                else{
                    // ilk 5 sayfadan birine tıklanmışsa ilk 7 sayfa bar'da görünecek, sonra bir [.] ve son olarak son sayfa numarası görünecek
                    if(selectedPageNum < 6){
                        for(let i=0; i<7; i++){
                            paginationBar.append(`<li class="page-item clickable-page-number ${i == selectedPageNum - 1 ? 'active' : ''}" pageNumber="${i + 1}"><a class="page-link">${i + 1}</a></li>`)
                        }
                        paginationBar.append(`<li class="page-item"><a class="page-link not-clickable-pagination-number">...</a></li>`)
                        paginationBar.append(`<li class="page-item clickable-page-number" pageNumber="${OPTIONS.numberOfPages}"><a class="page-link">${OPTIONS.numberOfPages}</a></li>`)
                    }
                    // ortalardaki bir sayfa numarasına tıklanmışsa [1 ] [. ] [7 ] [8 ] [9 ] [10] [11] [. ] [20] şeklinde bir görüntü oluşacak
                    else if(selectedPageNum >= 6 && selectedPageNum <= OPTIONS.numberOfPages - 5){
                        paginationBar.append(`<li class="page-item clickable-page-number" pageNumber="1"><a class="page-link">1</a></li>`)
                        paginationBar.append(`<li class="page-item"><a class="page-link not-clickable-pagination-number">...</a></li>`)
                        for(let i = selectedPageNum - 3; i < selectedPageNum + 2; i++){
                            paginationBar.append(`<li class="page-item clickable-page-number ${i == selectedPageNum - 1 ? 'active' : ''}" pageNumber="${i + 1}"><a class="page-link">${i + 1}</a></li>`)
                        }
                        paginationBar.append(`<li class="page-item"><a class="page-link not-clickable-pagination-number">...</a></li>`)
                        paginationBar.append(`<li class="page-item clickable-page-number" pageNumber="${OPTIONS.numberOfPages}"><a class="page-link">${OPTIONS.numberOfPages}</a></li>`)
                    }
                    else if(selectedPageNum >= OPTIONS.numberOfPages - 4){
                        paginationBar.append(`<li class="page-item clickable-page-number" pageNumber="1"><a class="page-link">1</a></li>`)
                        paginationBar.append(`<li class="page-item"><a class="page-link not-clickable-pagination-number">...</a></li>`)
                        for(let i = OPTIONS.numberOfPages - 7; i < OPTIONS.numberOfPages; i++){
                            paginationBar.append(`<li class="page-item clickable-page-number ${i == selectedPageNum - 1 ? 'active' : ''}" pageNumber="${i + 1}"><a class="page-link">${i + 1}</a></li>`)
                        }
                    }
                }
        
                $(`#${OPTIONS.mainElementId}`).append(paginationBar)
            } 
            catch(e) {
                throwError(e)
            }    
        })

        //#endregion
    }

}(jQuery))