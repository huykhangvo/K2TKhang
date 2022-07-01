$(document).ready(function(){

    $.each( $('.menu-cat-left a'), function( key, value ) {
        // get a's href
        var aHref = $(this).attr('href') ;
        // if current url as same as a's href
        if(aHref == document.URL)
        {
            var _grand_parent = $(this).closest('.menu-list');
            $(_grand_parent).addClass('in');
        }
    });

    $('#but_subscribe').click(function(){
        var email = $('#txt_subscribe_email').val();
        if (email == '' || !validateEmail(email))
        {
            p_message('#subscribe_error', '<p class="required">Vui lòng nhập địa chỉ email hợp lệ</p>');
        }else{
            subscribe_email(email);
        }
    });

    $('#txt_subscribe_email').keypress(function (e) {

        var email = $('#txt_subscribe_email').val();
        if (e.which == 13) {
            subscribe_email(email);
            return false;
        }
    });

    $(".filter_show").click(function(){
        $(".filter_hide").toggle();
    });

    $(".filter_products_size li a").click(function() {
        $(".filter_products_size li").removeClass('selected');
        $(this).parent().addClass('selected');
    });

    $(".filter_products_color li a").click(function() {
        $(".filter_products_color li").removeClass('selected');
        $(this).parent().addClass('selected');
    });

    $('#but_filter_product').click(function(){
        var size = $('.filter_products_size').find('li.selected').data('size');
        var color = $('.filter_products_color').find('li.selected').data('color');
        var att_chat_lieu = $('#att_chat_lieu').val();

        if (typeof (size) == 'undefined' && typeof (color) == 'undefined' && typeof (att_chat_lieu) == 'undefined')
        {
            p_message('#msg_error_size_color', 'Vui lòng chọn kích cỡ, màu sắc hoặc thuộc tính để lọc')


        }else{

            if (typeof (size) != 'undefined')
            {
                $('#hid_size').val(size);
            }

            if (typeof (color) != 'undefined')
            {
                $('#hid_color').val(color);
            }

            $('#frm_cat').submit();
        }
    });

    $('#but_filter_remove').click(function(){
        var link = $('#frm_cat').data('slug');
        if(link == '' || link == undefined)
        {
            link = 'tim-kiem';
        }

        document.location.href = base_url+link;;
    });

    $('#sel_order').change(function(){
        $('#frm_cat').submit();
    });

    $('.show-product-color').click(function(){

        var el =  $(this);
        var image_color = el.data('image-color');
        var el_demo = $('#demo4');
        $('#hid_color_text').val(el.data('color-text'));

        //reset zoom image
        if(image_color != '')
        {
            el_demo.attr('src', image_color);
        }

        el_demo.ImageZoom({type:'standard',zoomSize:[480,300],bigImageSrc:image_color,zoomViewerClass:'standardViewer'});

        //size active
        var size_active = String(el.data('size-active'));
        $('.bg_x_size').show();

        if (size_active != ''  && size_active != null)
        {
            if (size_active.indexOf(',') != -1)
            {
                //set active
                var bg_size = size_active.split(',');
                for (var i=0; i<bg_size.length; i++)
                {
                    $('#product_size_'+bg_size[i]).find('.bg_x_size').hide();
                }
            }else{
                $('#product_size_'+size_active).find('.bg_x_size').hide();
            }
        }

        //change active color
        $('.show-product-color').removeClass('active-color');
        el.addClass('active-color');

        var text_color = el.data('color-text');
        $('#product-color-text').html(text_color+'<label class="required"><em>*</em></label>');

        //trigger size color
        check_product(false);
    });

    $('.show-product-size').click(function(){
        var el = $(this);
        var text_size = el.data('size-text');
        $('#product-size-text').html(text_size);
        $('#hid_size_text').val(el.data('size-text'));

        //remove class
        $('.show-product-size').removeClass('active-size');
        //set class active
        el.addClass('active-size');

        //color active
        var color_active = String(el.data('color-active'));
        $('.bg_x_color').show();
        if (color_active != ''  && color_active != null)
        {
            //show all
            if (color_active.indexOf(',') != -1)
            {
                //set active
                var bg_color = color_active.split(',');
                for (var i=0; i<bg_color.length; i++)
                {
                    $('#product_color_'+bg_color[i]).find('.bg_x_color').hide();
                }
            }else{
                $('#product_color_'+color_active).find('.bg_x_color').hide();
            }

        }

        //trigger size color
        check_product(false);
    });

    $(document).ready(function() {
        $("#owl-demo_1").owlCarousel({
            loop:false,
            margin:10,
            nav:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            }

        });

        $("#owl-demo_2").owlCarousel({
            loop:false,
            nav:true,
            margin:10,
            navText : ['<i class="fa fa-angle-left fa-5x" aria-hidden="true"></i>','<i class="fa fa-angle-right fa-5x" aria-hidden="true"></i>'],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            }

        });

        var viewport = jQuery(window).width();
        if(viewport < 479) //mobile
        {
            $('.owl-next').attr('style','right: 16px !important');
            $('.owl-prev').attr('style','left: 31px !important');
        }
    });

    $(document).on('click', '#but_choose_product', function(){
        var el = $(this);
        var  product_sub_id = el.attr('data-product-sub-id');
        var  product_sub_status = el.attr('data-product-sub-status');

        //console.log(product_sub_id+'---'+product_sub_status);

        if (product_sub_id != '' && product_sub_id != 0 && product_sub_status == 1)
        {
            //fbq('track', 'AddToCart');
            var product_sub_sku = $('#hid_product_key').val();
            fbq("track", "AddToCart", {contents:[{"id":product_sub_sku,"quantity":1,"item_price":product_price}],
                content_name: product_name,
                content_ids: product_sub_sku,
                content_type: "product",
                currency: "VND",
                value: product_price,
                num_items: 1,
                title_category: cat_name
            });

            // console.log('ok:'+product_sub_sku+'-'+product_name+'-'+product_price+'-'+cat_name);
            //submit form
            $('#hid_product_sub_id').val(product_sub_id);
            $('#frm_product_sub').submit();
        }else{
            check_product(false);
        }
    });

    $(".holine_show").click(function(){
        $(".holine_hide").toggle();
    });

    $('.number_price').format_number_price();

    var pay_d = new Date();
    var year = pay_d.getFullYear() - 35;
    var max_year = pay_d.getFullYear() - 10;
    pay_d.setFullYear(year);

    $('.datepicker').datepicker({
        yearRange: "1950:"+max_year,
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        defaultDate: pay_d,
    });

    $(document).on('change', '#register_region_id', function(){
        show_city('#register_region_id', '#register_city_id');
        show_text_address('#register_region_id', '', '');
        $('#vnward_id').html('')
    });

    $('#register_region_id_other').change(function(){
        show_city('#register_region_id_other', '#register_city_id_other');
    });

    $(document).on('change', '#register_city_id', function(){
        show_vnward('#register_region_id', '#register_city_id', '#vnward_id');
        show_text_address('', '#register_city_id', '');
    });

    $(document).on('change', '#vnward_id', function(){
        show_text_address('', '', '#vnward_id');
    });

    $('#register_city_id_other').change(function(){
        show_vnward('#register_region_id_other', '#register_city_id_other', '#vnward_id_other');
    });

    $('#card_number').change(function(){
        change_price();
    });

    $('#card_cash').change(function(){
        change_price();
    });

    $(document).on('click', '.card-detail', function(){
        var transid = $(this).data('transid');
        var data_send = 'transid='+transid;

        $.ajax({
            type: 'post',
            url: base_url+'ajax/card_detail',
            dataType: 'json',
            data: data_send
        }).done(function(data){
            if(data.status == 1)
            {
                $('#box_card_detail').html(data.data_html);
                $('#box_card_detail').modal();
            }
            remove_loading();

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });
    });

    function change_price()
    {
        var card_cash = $('#card_cash').val();
        var card_number = $('#card_number').val();
        var price_need = card_cash*card_number;
        $('#price_need').val(price_need);
        $('#price_need').format_number_price();
    }

    function show_city(register_id_in,  city_id_out)
    {
        var region_id = $(register_id_in).val();

        if (region_id != '' && region_id != -1)
        {
            $.ajax({
                type: 'post',
                url: base_url+'ajax/getCity',
                dataType: 'json',
                data: {'region_id':region_id}
            }).done(function(data){
                $(city_id_out).html(data.city_html);
            }).fail(function () {
                //console.log('error-connection');
            });
        }
    }

    function show_vnward(register_id_in,  city_id_out, vnward_out)
    {
        var region_id = $(register_id_in).val();
        var city_id = $(city_id_out).val();

        if (region_id != '' && region_id != -1 && city_id != '-1')
        {
            $.ajax({
                type: 'post',
                url: base_url+'ajax/getVnward',
                dataType: 'json',
                data: {'region_id':region_id,'city_id':city_id}
            }).done(function(data){
                $(vnward_out).html(data.vnward_html);
            }).fail(function () {
                //console.log('error-connection');
            });
        }
    }

    function show_text_address(region_id, city_id, vnward_id)
    {
        if(region_id != '')
        {
            var region_text = $(region_id+' option:selected').text();
            $('.address_text_region_name').text(region_text);
        }

        if(city_id != '')
        {
            var city_text = $(city_id+' option:selected').text();
            $('.address_text_city_name').text(city_text+',');
        }

        if(vnward_id != '')
        {
            var vnward_text = $(vnward_id+' option:selected').text();
            $('.address_text_vnward_name').text(vnward_text+',');
        }


    }

    $("#user_register").click(function(){
        $(".pay_hidden_ts_1").show();
    });

    $("#user_bt").click(function(){
        $(".pay_hidden_ts_1").hide();
    });

    $("#checkbox_id").click(function(){
        var check_address_other = $(this).is(':checked');
        if (check_address_other)
        {
            $(".pay_hidden_ts_main").hide();
            $(".pay_hidden_ts").show();
        }else{
            $(".pay_hidden_ts_main").show();
            $(".pay_hidden_ts").hide();
        }
    });

    $(document).on('click', 'input[name="shipping_method"]', function(){
        var type = 'ship';
        changeInfoCheckout(type);
    });

    $(document).on('click', 'input[name="payment_method"]', function(){
        var type = 'payment';
        changeInfoCheckout(type);
    });

    $(document).on('click', '#but_coupon_code', function(){
        var type = 'coupon_add';
        changeInfoCheckout(type);
    });

    $(document).on('click', '#but_order_ctv', function(){
        var type = 'order_ctv_add';
        changeInfoCheckout(type);
    });

    $(document).on('click', '#but_order_ctv_delete', function(){
        var type = 'order_ctv_remove';
        changeInfoCheckout(type);
    });

    // $(document).on('click', '.but_call_checkout', function(){
    //     var type = $(this).data('type');
    //     changeInfoCheckout(type);
    // });

    $(document).on('change', '#order_account_code', function(){
        var type = $(this).data('type');
        changeInfoCheckout(type);
    });

    $(document).on('click', '#but_coupon_delete', function(){
        var type = 'coupon_remove';
        changeInfoCheckout(type);
    });

    $('#btn-facebook-login').on('click', function () {

        FB.login(function (response) {
            if (response.authResponse) {
                $.ajax({
                    url: base_url + 'ajax/user_login_facebook',
                    type: 'POST',
                    dataType: 'json',
                    data: response.authResponse
                }).done(function (data) {
                    if (data.status == 1) {
                        window.location.reload();
                    } else {
                        $('#msg_login').html(data.message).show();
                    }
                }).fail(function (msg) {
                    // console.log('loi:');
                    // console.log(msg);
                });
            }
        }, {scope: 'email,public_profile', auth_type: 'rerequest'});

    });

    $('#btn-google-login').on('click', function () {
        gapi.auth2.getAuthInstance().signIn().then(function (e) {
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                $.ajax({
                    url: base_url + 'ajax/user_login_google',
                    type: 'POST',
                    dataType: 'json',
                    data: e.getAuthResponse()
                }).done(function (data) {
                    if (data.status == 1) {
                        window.location.reload();
                    } else {
                        $('#msg_login').html(data.message).show();
                    }
                }).fail(function (msg) {
                    //console.log(msg);
                });
            }
        });
    });

    $(document).on('click', '#but_customer_pay', function(){
        var customer_cash = $(this).data('customer-cash');
        var customer_cash_out = $('#customer_cash_out').val().replace('.', '');
        var product_sub_total_end = $('#product_sub_total_end').data('total-end');
        customer_cash_out = customer_cash_out.trim();
        var type = 'cash_out';

        console.log('cash_out:'+customer_cash_out);
        console.log('cash:'+customer_cash);
        console.log('end:'+product_sub_total_end);

        if (customer_cash_out > customer_cash || customer_cash_out > product_sub_total_end || customer_cash_out < 1000 || customer_cash_out == '')
        {
            p_message('#p_msg_alert', 'Vui lòng nhập số tiền hợp lệ (>= 1000 vnđ)');
            return false;
        }else{
            p_message('#p_msg_alert', '');
            //send cash out
            cashOut('cash_out', customer_cash_out);
        }
    });

    $('#che_pay_milys').click(function(){
        if($(this).prop('checked')){
            // $('#box_pay_milys').show();
            // var product_price_not_cash= $(this).data('product-price-not-cash');
            // cashOut('cash_out',product_price_not_cash);
            show_modal_pin();
        }else{
            $('#box_pay_milys').hide();
            //$('#customer_cash_out').val('');
            cashOut('cash_out', 0);
            $('input[name="payment_method"]').prop("disabled", false); // Element(s) are now enabled.
        }
    });

    $('#but_send_pin').click(function(){
        var pin_code = $('#pin_code').val();
        var data_send = 'pin_code='+pin_code;

        $.ajax({
            type: 'post',
            url: base_url+'ajax/check_pin',
            dataType: 'json',
            data: data_send
        }).done(function(data){
            if(data.status == 1)
            {
                document.location.reload();
            }else{
                p_message('#pin_msg', data.message);
            }

            remove_loading();

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });
    });

    $('#but_close_pin').click(function(){
        //document.location.reload();
        $('#payment_method_3').click();
        var type = 'payment';
        changeInfoCheckout(type);
    });

    $('#but_customer_pay_delete').click(function(){
        $('#box_pay_milys').hide();
        $('#che_pay_milys').attr('checked', false);
        cashOut('cash_out', 0);
    });

    $('#but_cart_send').on('click', function(){
        var check = true;
        $('#frm_cart_mail input').each(function(){
            var el = $(this).val();
            if (el == '')
            {
                p_message('#p_cart_mail', '<span class="required">Vui lòng nhập đầy đủ các thông tin yêu cầu</span>');
                check = false;
                return false;
            }
        });

        if (check)
        {
            var data_send = $('#frm_cart_mail').serialize();
            add_loading();
            $.ajax({
                type: 'post',
                url: base_url+'ajax/cart_mail',
                dataType: 'json',
                data: data_send
            }).done(function(data){
                if(data.status == 1)
                {
                    p_message('#p_cart_mail', '<span class="msg_success">'+data.msg+'</span>');
                    window.setTimeout(function(){
                        $("#myModal_mail .close").click();
                    }, 1000);
                }else{
                    p_message('#p_cart_mail', '<span class="required">'+data.msg+'</span>');
                }

                remove_loading();

            }).fail(function () {
                //console.log('error-connection');
                remove_loading();
            });
        }
    });

    $("#menu_fixed").affix({
        offset: {
            top : 40,
            bottom: 340,
        }
    });

    $('#but_step2').click(function () {
        $('#but_step2').prop("disabled", true);
        $('#frm_step2').submit();
    });

    $('.but_order_cancel').click(function(){
        if (confirm('Bạn chắn chắn muốn huỷ đơn hàng này?')){
            var invoice_no = $(this).data('invoice-no');
            document.location.href = base_url+'customer/order_cancel/'+invoice_no;
        }

        return false;
    });

    $(document).on('click', '#view_showroom', function(){
        check_product(true);
    });

    $('#but-landing').click(function(){
        add_loading();
        $.ajax({
            type: 'post',
            url: base_url+'ajax/landing_voucher',
            dataType: 'json',
            data: $('#frm_landing').serialize()
        }).done(function(data){
            if(data.status == 1)
            {
                p_message('#subscribe_error', data.message);
                remove_loading();
            }else{
                p_message('#subscribe_error', data.message);
                remove_loading();
            }

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });

    });

    $('#but-nano').click(function(){
        add_loading();
        $.ajax({
            type: 'post',
            url: base_url+'ajax/landing_nano',
            dataType: 'json',
            data: $('#frm_landing').serialize()
        }).done(function(data){
            if(data.status == 1)
            {
                p_message('#subscribe_error', data.message);
                remove_loading();
            }else{
                p_message('#subscribe_error', data.message);
                remove_loading();
            }

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });

    });

    $('.btn-edit-address').click(function(){
        add_loading();
        var address_id = $(this).data('address-id');
        var data_send = {address_id:address_id};

        $.ajax({
            type: 'post',
            url: base_url+'ajax/box_address',
            dataType: 'json',
            data: data_send
        }).done(function(data){
            if(data.status == 1)
            {
                $('.box-address-show').html(data.data_html);
                $('.box-address-show').show();

                $('html, body').animate({
                    scrollTop: $(".btn-add-address").offset().top-150
                }, 1000);
            }

            remove_loading();

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });
    });

    $(document).on('click', '.but-address-cancel', function(){
        $('.box-address-show').slideUp(1000);
    });

    $(document).on('click', '.btn-add-address', function(){
        add_loading();
        var address_action = 'add';
        var data_send = {address_action:address_action};

        $.ajax({
            type: 'post',
            url: base_url+'ajax/box_address',
            dataType: 'json',
            data: data_send
        }).done(function(data){
            if(data.status == 1)
            {
                $('.box-address-show').html(data.data_html);
                $('.box-address-show').show();
                $('html, body').animate({
                    scrollTop: $(".btn-add-address").offset().top-150
                }, 1000);
            }

            remove_loading();

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });
    });

    $(document).on('click', '.but-address-save', function(){
        add_loading();
        var el = $(this);
        var address_id = $(this).data('address-id');
        var data_send = el.closest('form').serialize();

        $.ajax({
            type: 'post',
            url: base_url+'ajax/address_save',
            dataType: 'json',
            data: data_send
        }).done(function(data){
            if(data.status == 1)
            {
                var new_redirect = base_url+'thanhtoan/dathang_step1?add_id='+data.add_id;
                document.location.href = new_redirect;
            }else{
                p_message('.msg-address', data.message);
            }

            remove_loading();

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });
    });

    $(document).on('click', '.address-set-default', function(){
        var el = $(this).closest('.box-address-set-default').find('input[name="address_active"]');
        if(el.is(':checked')){
            el.prop('checked', false)
        }
        else{
            el.prop('checked', true);
        }
    });

    $(document).on('click', '.but-address-choose', function(){
        add_loading();
        var el = $(this);
        var address_id = $(this).data('address-id');
        var data_send = {address_id:address_id};

        $.ajax({
            type: 'post',
            url: base_url+'ajax/address_choose',
            dataType: 'json',
            data: data_send
        }).done(function(data){
            if(data.status == 1)
            {
                // console.log(data);
                document.location.href = base_url+'thanhtoan/dathang_step2';
            }else if(data.status == -1){
                $('.box-address-show').html(data.data_html);
                $('.box-address-show').show();
                $('html, body').animate({
                    scrollTop: $(".btn-add-address").offset().top-150
                }, 1000);
                p_message('.msg-address', data.message);
            }else{
                p_message('.msg-address', data.message);
            }

            remove_loading();

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });
    });

    $('.sel_region_id').change(function(){
        var city = $(this).closest('form').find('.sel_city_id');
        var region = $(this);
        show_city(region,city);
    });

    $( ".sel_city_id" ).on( "change", function() {
        var region = $(this).closest('form').find('.sel_region_id');
        var city = $(this);
        var vnward = $(this).closest('form').find('.sel_vnward_id');
        show_vnward(region,city,vnward);
    });

    $('.panel-address').click(function(){
        var el = $(this);
        $('.panel-address').find('input[type="radio"]').prop('checked', false);
        el.find('input[type="radio"]').prop('checked', true);
        $('.address-item').removeClass('address-default');
        el.closest('.address-item').addClass('address-default');
    });

    $('.but-checkout-choose-address').click(function(){
        add_loading();

        var address_id = $('input[name="radio_address"]:checked').val();
        var data_send = {address_id:address_id};

        $.ajax({
            type: 'post',
            url: base_url+'ajax/address_choose',
            dataType: 'json',
            data: data_send
        }).done(function(data){
            if(data.status == 1)
            {
                // console.log(data);
                document.location.href = base_url+'thanhtoan/dathang_step2';
            }else if(data.status == -1){
                $('.box-address-show').html(data.data_html);
                $('.box-address-show').show();
                $('html, body').animate({
                    scrollTop: $(".btn-add-address").offset().top-150
                }, 1000);
                p_message('.msg-address', data.message);
            }else{
                p_message('.msg-address', data.message);
            }

            remove_loading();

        }).fail(function () {
            //console.log('error-connection');
            remove_loading();
        });

    });

    $('#order_cuahang').change(function(){
        var order_cuahang = $('#order_cuahang').val();
        if(order_cuahang != '')
        {
            $('#order_account_code').val('');
            $('#order_account_code').attr('disabled', true);
            $('#order_ctv').val('');
            $('#order_ctv').attr('disabled', true);
        }else{
            $('#order_account_code').attr('disabled', false);
            $('#order_ctv').val('');
            $('#order_ctv').attr('disabled', false);
        }

        changeInfoCheckout('cuahang');
    });

    $('.but-confirm-sms').click(function(){
        if($('#che_confirm').is(':checked') == false)
        {
            alert('Vui lòng tick để xác nhận đồng ý.');
            return false;
        }
    });

    $( "#box-show-support" ).click(function() {
        $( "#box-support" ).toggle();
    });

    $("#box-icon-phone" ).click(function() {
        $("#modal_phone" ).modal('show');
    });

    $('#cat_show_more').click(function(){
        var check_show = $('#cat_des_long').is(":visible");
        if(check_show)
        {
            $("#cat_des_long").hide('slow');
            $('.button-more').show();
            $('.button-less').hide();
        }else{
            $("#cat_des_long").show('slow');
            $('.button-more').hide();
            $('.button-less').show();
        }


    });
});

function process_check_showroom()
{
    var check_login = $('#hid_login').val();
    var hid_ip = $('#hid_ip').val();
    //Cookies.remove(hid_ip, { path: '' }); // removed!
    //Cookies.set(hid_ip, '{"long":123,"lat":234}', { expires: 365, path: ''});
    var real_ip_xxx = Cookies.get(hid_ip);

    if(real_ip_xxx == undefined){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showLocation, showErrorPosition);
            p_message('#msg_cuahang', 'Vui lòng cho phép chúng tôi lấy thông tin địa chỉ.');
        } else {
            p_message('#msg_cuahang', 'Trình duyệt không khỗ trợ lấy thông tin địa chỉ.');
            console.log('test-az');
        }


    }else{
        var log_info = jQuery.parseJSON(real_ip_xxx);
        showInfoShop(log_info.latitude, log_info.longitude);
    }
}

function showErrorPosition(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            showInfoShop(-1, -1);
            break;
        case error.POSITION_UNAVAILABLE:
            // console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            // console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            // console.log("An unknown error occurred.");
            break;
    }
}

function setCookieLatLong(str){
    var hid_ip = $('#hid_ip').val();
    Cookies.set(hid_ip, str, { expires: 365, path: ''});
}

function showInfoShop(lat, long, count_call)
{
    var product_key = $('#hid_product_key').val();
    if(count_call == '')
    {
        count_call = 0;
    }

    data_send = {latitude:lat, longitude:long, product_key:product_key, count_call: count_call};

    //set lai cookie
    var hid_ip = $('#hid_ip').val();
    var str = '{"latitude":'+lat+', "longitude":'+long+'}';
    Cookies.set(hid_ip, str, { expires: 365, path: ''});

    add_loading();
    $.ajax({
        type: 'post',
        url: base_url+'ajax/info_position',
        dataType: 'json',
        data: data_send
    }).done(function(data){

        if(data.status == 1)
        {
            $('.list_cuahang').html(data.box_shop);
            p_message('#msg_cuahang', '');
        }else{
            $('.list_cuahang').html('');
            p_message('#msg_cuahang', data.message);
        }

        remove_loading();
    }).fail(function () {
        //console.log('error-connection');
        remove_loading();
    });
}

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    showInfoShop(latitude, longitude);
}

function changeInfoCheckout(type)
{
    var data_send = '';
    var payment_method = '';
    var ship_checked = $('input[name="shipping_method"]:checked').val();

    switch (type)
    {
        case 'ship':
            var ship_checked = $('input[name="shipping_method"]:checked').val();
            data_send = {'ship_id': ship_checked, 'type':type};
            break;

        case 'payment':
            var payment_method = $('input[name="payment_method"]:checked').val();
            data_send = {'payment_method': payment_method, 'ship_id': ship_checked, 'type':type};

            //truong hop su dung vi ivy
            if(payment_method == 9)
            {
                show_modal_pin();
                return false;
            }

            break;

        case 'coupon_add':
            var coupon_code_text = $('#coupon_code_text').val();
            var order_ctv = $('#order_ctv').val();
            data_send = {'order_ctv': order_ctv, 'ship_id': ship_checked, 'coupon_code_text': coupon_code_text, 'type':type};
            break;

        case 'coupon_remove':
            $('#but_coupon_delete').hide();
            $('#coupon_code_text').val('');
            p_message('#p_coupon', '');
            data_send = {'type':type, 'ship_id': ship_checked};
            break;

        case 'account_code_add':
            var order_account_code = $('#order_account_code').val();
            data_send = {'order_account_code': order_account_code, 'ship_id': ship_checked, 'type':type};
            break;

        case 'account_code_remove':
            $('#but_account_code_delete').hide();
            $('#order_account_code').val('');

            data_send = {'type':type, 'ship_id': ship_checked};
            break;

        case 'cuahang':
            var order_cuahang = $('#order_cuahang').val();
            data_send = {'order_cuahang': order_cuahang, 'ship_id': ship_checked, 'type':type};
            break;

        case 'order_ctv_add':
            var order_ctv = $('#order_ctv').val();
            var coupon_code_text = $('#coupon_code_text').val();
            data_send = {'order_ctv': order_ctv, 'ship_id': ship_checked, 'coupon_code_text': coupon_code_text, 'type':type};
            break;

        case 'order_ctv_remove':
            $('#but_order_ctv_delete').hide();
            $('#order_ctv').val('');
            p_message('#p_coupon', '');

            data_send = {'type':type, 'ship_id': ship_checked};
            break;

        default:
            data_send = '';
    }

    add_loading();

    if(payment_method == 1 || payment_method == 2 || payment_method == 5 || payment_method == 8 )
    {
        $('#but_step2').text('TIẾP TỤC THANH TOÁN');
    }else{
        $('#but_step2').text('HOÀN THÀNH');
    }

    $.ajax({
        type: 'post',
        url: base_url+'ajax/info_checkout',
        dataType: 'json',
        data: data_send
    }).done(function(data){

        if(type == 'coupon_add' || type == 'order_ctv_add')
        {
            if(data.coupon == 'ok')
            {
                //coupon valid
                $('#but_coupon_delete').show();
            }

            if(data.order_ctv_status == 'ok')
            {
                //coupon valid
                $('#but_order_ctv_delete').show();
                $('#order_account_code').val('');
                $('#order_account_code').attr('disabled', true);
                $('#order_cuahang').val('');
                $('#order_cuahang').attr('disabled', true);
            }

            if(data.message != '')
            {
                p_message('#p_coupon', data.message);
            }
        }else if(type == 'order_ctv_remove')
        {
            $('#order_account_code').val('');
            $('#order_cuahang').val('');
            $('#order_account_code').attr('disabled', false);
            $('#order_cuahang').attr('disabled', false);
        }

        // if(type == 'account_code_add')
        // {
        //     if(data.status_account_code == 'ok')
        //     {
        //         p_message('#p_coupon', 'Mã nhân viên hợp lệ');
        //     }
        // }

        $('#box_product_total').html(data.box_product_total);
        $('#box_product_sub').html(data.box_product_sub);
        //$('#box_div_order').html(data.box_div_order);
        remove_loading();
    }).fail(function () {
        //console.log('error-connection');
        remove_loading();
    });



}

function cashOut(type, customer_cash_out)
{
    add_loading();
    $.ajax({
        type: 'post',
        url: base_url+'ajax/cash_out',
        dataType: 'json',
        data: {'customer_cash_out':customer_cash_out, 'type':type}
    }).done(function(data){
        $('#box_product_total').html(data.box_product_total);
        if(data.status == -2  || data.status == -3)
        {
            p_message('#p_msg_alert', data.msg);
        }

        remove_loading();
    }).fail(function () {
        //console.log('error-connection');
        remove_loading();
    });
}

function p_message(idc,msg)
{
    $(idc).html(msg);
    $(idc).show();
    $(idc).delay(50000).fadeOut(500);
}


function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function add_loading() {
    $('.modal_loading').show();
}

function remove_loading() {
    $('.modal_loading').hide();
}

function show_row(row){
    $('#hid_row').val(row);
    $('#hid_status').val('setrow');
    $('#frm_cat').submit();
}

function check_product(check_show_room)
{
    //get size, color
    var size = $('.active-size').data('size-current');
    var color = $('.active-color').data('color-current');
    //$('#frm_showrom').hide();
    $('#hid_product_key').val('');

    var product_sub_id = '';
    var product_sub_status = 0;

    //set default
    var el = $('#but_choose_product');
    el.attr('data-product-sub-id', product_sub_id);
    el.attr('data-product-sub-status', product_sub_status);

    if (typeof (size) == 'undefined')
    {
        size = '';
    }

    if (typeof (color) == 'undefined')
    {
        color = '';
    }

    if (size == '' && color == '')
    {
        $('.vuilongchon').text('Vui lòng chọn màu sắc, size');
        return false;
    }

    if (typeof (product_sub) != 'undefined')
    {
        var obj_product = eval(jQuery.parseJSON(product_sub));
        var size_color = String(size+'_'+color);

        if(typeof (obj_product[size_color]) !== 'undefined')
        {
            //console.log('hello');
            var coupon_price_sale = obj_product[size_color]['coupon_price_sale'];
            var coupon_price_org = obj_product[size_color]['product_sub_price'];
            var product_sub_sku = obj_product[size_color]['product_sub_sku'];

            //show xem cac cua hang con hang
            //$('#frm_showrom').show();

            //thay doi lai barcode
            $("#barcode").barcode(product_sub_sku, "code39", {barWidth:1, barHeight:40, showHRI:true, moduleSize:9});

            //thay doi lai product key => product sku
            $('#hid_product_key').val(product_sub_sku);

            // console.log(coupon_price_sale+'--'+coupon_price_org);

            if (coupon_price_sale !== 'undefined' && coupon_price_sale  != '' && coupon_price_sale != 0)
            {
                //change price sale
                $('#display_price_sale').text(coupon_price_sale);
            }

            if (coupon_price_org != 'undefined' && coupon_price_org  != '' && coupon_price_org  != 0)
            {
                //change price
                $('#display_price_org').text(coupon_price_org);
            }

            product_sub_status = obj_product[size_color]['product_sub_status'];
            product_sub_id = obj_product[size_color]['product_sub_id'];

            $('.vuilongchon').text('');
            if(product_sub_status == 0 || product_sub_status == '')
            {
                $('.vuilongchon').html('Sản phẩm đã hết hàng Online.<br>&nbsp;Bạn có thể "Tìm cửa hàng".');
                if(check_show_room) process_check_showroom();
                return false;
            }else{
                el.attr('data-product-sub-id', product_sub_id);
                el.attr('data-product-sub-status', product_sub_status);
                if(check_show_room) process_check_showroom();
            }


        }else{
            if( color != '' && size == '')
            {
                $('.vuilongchon').text('Vui lòng chọn size *');
            }else if (color == '' && size != ''){
                $('.vuilongchon').text('Vui lòng chọn màu *');
            }else{
                $('.vuilongchon').html('Sản phẩm đã hết hàng Online.<br>&nbsp;Bạn có thể "Tìm cửa hàng".');
                if(check_show_room) process_check_showroom();
            }

            return false;
        }
    }
}

function subscribe_email(email){
    $.ajax({
        type: 'post',
        url: base_url+'ajax/subscribe',
        dataType: 'json',
        data: {'email':email}
    }).done(function(data){
        if(data.status == 1)
        {
            p_message('#subscribe_error', '<p class="msg_success">'+data.message+'</p>');
        }else{
            p_message('#subscribe_error', '<p class="required">'+data.message+'</p>');
        }

    }).fail(function () {
        //console.log('error-connection');
    });
}

function show_modal_pin()
{
    $('#modal_pin').modal('show');
}

$(function() {
    $("img.lazy").lazyload({
        threshold : 200,
        effect : "fadeIn"
    });
});

