(function($){
    $.fn.format_number_price = function(){
        $(this).number(true, 0, ',', '.' );
    };

}(jQuery));