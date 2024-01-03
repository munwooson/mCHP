var title_text = "";
var btn_left = "확인";
var btn_right = "취소";
var global_double_flag; // 두번연속터치방지
var global_double_select_flag; // 두번선택터치방지
var g_scroll_permit_flag; //infinit scroll 허용여부
var SCROLL_COUNTER = parseInt(sessionStorage.getItem('SCROLL_COUNTER'));
var MAIN_LIST_NO = 1;
var global_init_flag; //최초리스트판별
var global_login_flag = true; //최초로그인판별



        function setStartSpinner() {
        var options = { dimBackground: true };
        //SpinnerPlugin.activityStart("Loading...", options);
        window.plugins.spinnerDialog.show(null,"Loading..");

        }

        function setStopSpinner() {
        //SpinnerPlugin.activityStop();
        window.plugins.spinnerDialog.hide();
        }


        function move_page(page){
        var page_url = page + '.html';
         $.mobile.changePage( page_url, {transition: "fade", changeHash: true });
         //alterContent( data.state.url );
        }

function goMain(){
    location.replace("main.html");
    $('#main_search_popup_asset_no').val(sessionStorage.getItem("asset_no"));
    $('#main_search_popup_asset_name').val(sessionStorage.getItem("asset_name"));
    $('#main_search_popup_inspection_flag').val(sessionStorage.getItem("inspection_flag")).prop("selected", true);
    $('#main_search_popup_account_code').val(sessionStorage.getItem("account_name")).prop("selected", true);
    $('#main_order_select').val(sessionStorage.getItem("order_select")).prop("selected", true);
    $('#main_search_popup_location').val(sessionStorage.getItem("location"));
    $('#main_search_popup_counter_name').val(sessionStorage.getItem("pre_year_counter"));
    
    //$('#main_search_popup_inspection_flag').val("").prop("selected", true);
    //$('#main_search_popup_account_code').val("").prop("selected", true);
    //$('#main_order_select').val("asset_num").prop("selected", true);
}

        function move_page_no_back(page){
        var page_url = page + '.html';
         $.mobile.changePage( page_url, {transition: "fade", changeHash: false });
         //alterContent( data.state.url );
        }

        function move_refresh(){
            $.mobile.changePage(
              window.location.href,
              {
                changeHash              :false,
                allowSamePageTransition : true,
                transition              : "fade",
                showLoadMsg             : false,
                reloadPage              : true
              }
            );
         }

         function move_refresh_flip(){
             $.mobile.changePage(
               window.location.href,
               {
                 changeHash              :false,
                 allowSamePageTransition : true,
                 transition              : "flip",
                 showLoadMsg             : false,
                 reloadPage              : true
               }
             );
          }

         function move_refresh_flip_reverse(p_reverse){
             $.mobile.changePage(
               window.location.href,
               {
                 changeHash              :false,
                 allowSamePageTransition : true,
                 transition              : "flip",
                 showLoadMsg             : false,
                 reloadPage              : true,
                 reverse                 : p_reverse
               }
             );
          }

        function dialog_confirm(str, func){
        navigator.notification.confirm(
                    str, // message
                     func,            // callback to invoke with index of button pressed
                    title_text,           // title
                    [btn_left,btn_right]         // buttonLabels
                );


        }
         function dialog_alert(str) {
                navigator.notification.alert(
                    str,  // message
                    alertCallback,         // callback
                    title_text,
                    btn_right
                );
            }
         function alertCallback(){}


        function onConfirm(buttonIndex) {
                 if(buttonIndex == 2){
                   //  window.location.hash = '#/android_asset/www/html/chkList.html';
                     $.mobile.back();
                 }
             }
        function onConfirm2(buttonIndex) {
                 if(buttonIndex == 2){
                //임시저장처리
                    check_submit('TEMP');
                 }
            }

        function zoomMobile() {
                var viewport = document.querySelector('meta[name="viewport"]');
                if ( viewport ) {
                    viewport.content = "width=device-width";
                    viewport.content = "initial-scale=1.0";
                }
            }

        function soaConnecter(path, query, method, jsonData, func){

            setStartSpinner();

            mcsApp.customNotAuthApi(method, path, query, jsonData,
                function(result){
                    setStopSpinner();
                    func(result);
                },
                function(error){
                    dialog_alert(error);
                    setStopSpinner();
                }
            );

        }


         function soaResult_temp(result){   //
         if(result.rtnFlag == 'SUCCESS'){
             dialog_alert('임시저장되었습니다.');
             $.mobile.back();

          }else{
          dialog_alert("업로드가 실패했습니다.");
          }
         }




        // 오늘 일자 설정
        function todaySet(id){
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var today = year + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);

            $(id).val(today);
        }

            // 오늘 일자
            function gettoday(){
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var day = d.getDate();
                var today = year + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);
                return today;
            }


        function value_set(id, str){
                $(id).val(str);
        }




        function adjustSet(id, num){
            var now = new Date();
            var d = new Date(Date.parse(now) + num * 1000 * 60 * 60 * 24);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var today = year + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);

            $(id).val(today);
        }

         function edit_date(num){
                var now = new Date();
                var d = new Date(Date.parse(now) + num * 1000 * 60 * 60 * 24);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var day = d.getDate();
                var today = year + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);
                return today;
            }



        // 작년 오늘 일자 설정
        function todaySet_beforeYear(id){
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var today = (year-1) + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);

            $(id).val(today);
        }


        // 현재 시간
        function currHour(){
            var d = new Date();
            return (d.getHours() < 10 ? "0"+d.getHours() : d.getHours());
        }

        function htmlEntityEnc(str){
            if(str == "" || str == null){
                return str;
            }else{
                return str.replace("&", "&amp;").replace("#", "&#35;").replace("<", "&lt;").replace(">", "&gt;").replace(/"/g, "&quot;").replace('\\', "&#39;").replace('%', "&#37;").replace('(', "&#40;").replace(')', "&#41;").replace('+', "&#43;").replace('/', "&#47;").replace('.', "&#46;");
            }
        }





        function windowByMask(){
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();
            $('#mask').css({'width':maskWidth,'height':maskHeight});
            //애니메이션 효과
            $('#mask').fadeTo("fast",0.7);
        }

        function panelClose(){
            $('#mask').fadeTo('fast', 0.0, function() {
                $(this).hide();
            });
        }



    /********************** Util / Common Start **********************************************************************************/

        // NVL
        function gf_objectFilter(val){
            var rtn;
            if(typeof val === 'object'){
                rtn = "";
            }else{
                if(val == null){
                    rtn = "";
                }else{
                    rtn = val;
                }
            }
            return rtn;
        }


        // 날짜 구분값에 따른 설정
        function f_getSettingDate(order, flag){
            var tmpNum = 0;
            switch(flag){
                case 'D':
                    tmpNum = 1;
                    break;
                case 'W':
                    tmpNum = 6;
                    break;
                case 'M':
                    tmpNum = 29;
                    break;
            }

            if(order == "before"){
                tmpNum = tmpNum * (-1);
            }
            return gf_getDateAdd(tmpNum);
        }


        // 날짜 계산
        function gf_getDateAdd(num){
            var now = new Date();
            var d = new Date(Date.parse(now) + num * 1000 * 60 * 60 * 24);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var today = year + '-' + (month < 10 ? "0"+month : month) + '-' + (day < 10 ? "0"+day : day);

            return today;
        }

        function now_datetime(){
        var Now = new Date();
        var NowTime = Now.getFullYear();
        NowTime += '-' + Now.getMonth() + 1 ;
        NowTime += '-' + Now.getDate();
        NowTime += ' ' + Now.getHours();
        NowTime += ':' + Now.getMinutes();
        NowTime += ':' + Now.getSeconds();
        return NowTime;
        }


        // 현재 시간 반환 ( 09:11 )
        function gf_getCurrTime(){
            var now = new Date();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var currTime = (parseInt(hour) < 10 ? "0"+hour : hour) + ':' + (parseInt(minute) < 10 ? "0"+minute : minute);
            return currTime;
        }


        function gf_getWorkTimeFormat(wTime){
            var hh = Math.floor( parseInt(wTime) / 60 );
            var mm = parseInt(wTime) % 60;
            var rtn = hh + "시간 ";

            if(mm > 0){
                rtn += mm + "분";
            }

            return rtn;
        }

    //텍스트 사이즈 조절
        function gf_text_size_plus(){
        if(text_size < 18){
                text_size++ ;
                gf_show_text_size();
                }
            }

        function gf_text_size_minus(){
            if(text_size > 13){
                text_size-- ;
                gf_show_text_size();
                }
            }

        function gf_show_text_size(){
            $('.list-group-item-text').css('font-size', text_size);
            $('.title_text').css('font-size', text_size);
            $('.content_text').css('font-size', text_size);
            $('.box_text').css('font-size', text_size);
            $('.container .ui-btn').css('font-size', text_size);
        }



        function alerts(msg){
            navigator.notification.alert(
                                     msg,
                                     null,
                                     title_text,
                                     btn_left
                                 );
        }

          function confirms(msg, func){
            navigator.notification.confirm(
                        msg, // message
                         func,            // callback to invoke with index of button pressed
                        title_text,           // title
                        [btn_left,btn_right]         // buttonLabels
                    );

            }

            function exitApp(){
             //  navigator.app.exitApp();
             cordova.plugins.exit();
            }


            function McsConnecter(url, method, data, func){
              setStartSpinner();
            //final_data.push(data);
              console.log('●●●' + url + '●●●' + JSON.stringify(data));

                mobileBackend.customCode.invokeCustomCodeJSONRequest(url, method, data).then(
                            function(response) {
                                console.info("[" + method + ":" + url + "]", "statusCode:", response.statusCode);
                                console.info("[" + method + ":" + url + "]", "Result:", response.data);

                                if(response.statusCode != 200){
                                    navigator.notification.confirm(
                                        "처리 중 오류가 발생하였습니다. server("+response.statusCode+")",
                                        confirmIgnoreOrReload,
                                        APPLICATION_NAME,
                                        ["재시도", "무시"]
                                    );
                                }

                                //setStopSpinner();

                                func(response.data);
                            }
                        ).catch(
                            function(error) {
                                //errorCallback(error);
                                setStopSpinner();
                                console.info(JSON.stringify(error));
                                console.warn("[" + method + ":" + url + "]", "Error CustomCode " + method + " : " + url, error);

                                navigator.notification.confirm(
                                    "처리 중 오류가 발생하였습니다. out",
                                    confirmIgnoreOrReload,
                                    APPLICATION_NAME,
                                    ["재시도", "무시"]
                                );
                            }
                        );


            }

        function common_result(result){
          alerts(JSON.stringify(result));
        }



        function ajax_process(back_end, data, func){
            var urlpath = "http://203.226.64.106:8070/" + back_end + "/mobile.do?" + data;

            $.ajax({
                url : urlpath,
                type :"GET",
                cash: false,
                crossDomain:true,
                dataType: 'json',
                success : function(data) {
                    func(JSON.stringify(data));
                },
                error : function(e) {
                    console.log(e.responseText);
                }
            });
         }


        function data_sqlite_process_S(query, func){ //dataDB처리 S select

          dataDb.transaction(function(tx) {
                tx.executeSql(query, [], function(tx, rs) {
                func(rs);
                  console.log('Record count: ' + rs.rows.length);
                }, function(tx, error) {
                  console.log('SELECT error: ' + error.message);
                });
              });

        }

        function data_sqlite_process_I(query, arr){ //dataDB처리 insert

           dataDb.transaction(function(tx) {
             tx.executeSql(query, arr);
           }, function(error) {
             console.log('sqlite_process_I Transaction ERROR: ' + error.message);
           }, function() {
             console.log('sqlite_process_I OK');
           });
       }


        function data_sqlite_process_DU(query){ //dataDB처리 delete, update

           dataDb.transaction(function(tx) {
             tx.executeSql(query);
           }, function(error) {
             console.log('sqlite_process_DU Transaction ERROR: ' + error.message);
           }, function() {
             console.log('sqlite_process_DU OK');

           });
       }



    /* Null 이거나 Undefined 일 경우 "" 치환*/
        function isNullReplace(param){
            if(param == null || param == "" || param == "null" || param == "null:null" || typeof param == "undefined" ){
                return "";
            }
            return param;
        }


        /* Null 이거나 Undefined 일 경우 "&nbsp;" 치환*/
        function isNullReplaceSpace(param){
            if(param == null || param == "" || param == "null" || param == "null:null"){
                return "&nbsp;";
            }
            return param;
        }

        function logDB_input(arr){
             //var arr = [PAGE, LOG_TYPE, LOG, DATE];
             var query = "INSERT INTO LOG (PAGE, LOG_TYPE, LOG, DATE) VALUES (?, ?, ?, DATETIME('NOW', 'LOCALTIME'))";
             data_sqlite_process_I(query, arr);

        }

        function logout(){
            mcsApp.logout()
        }

        function button_effect(p_element){

            $('.main_bottom').attr("src", img_url('btn01'));
            $('.qr_bottom').attr("src", img_url('btn02'));
            $('.monitoring_bottom').attr("src", img_url('btn03'));
            $('.setting_bottom').attr("src", img_url('btn04'));
            switch (p_element) {
                case '.main_bottom':
                $('.main_bottom').attr("src", img_url('btn011'));
                break;
                    case '.qr_bottom':
                    $('.qr_bottom').attr("src", img_url('btn022'));
                    break;
                        case '.monitoring_bottom':
                        $('.monitoring_bottom').attr("src", img_url('btn033'));
                        break;
                            case '.setting_bottom':
                            $('.setting_bottom').attr("src", img_url('btn044'));
                            break;
            }
        }

        function img_url(file_name){
         return '../img/' + file_name + '.png';
        }

        //페이지 하단 버튼 동작 정의
        function bottom_btn_main(){
            move_page('main');
            button_effect('.main_bottom');
        }
        function bottom_btn_monitor(){
            move_page('monitoring');
            button_effect('.monitoring_bottom');
        }
        function bottom_btn_qr(){
            scanQR();
            button_effect('.qr_bottom');
        }
        function bottom_btn_setting(){
            move_page('setting');
            button_effect('.setting_bottom');
        }

var detail_qr_flag = 'N'; //qr 조회 인지변수
var scan_page = '';

        function scanQR(){
            QR_FLAG = true;
            cordova.plugins.barcodeScanner.scan(
               function (result) {
                    if(!result.cancelled){
                           // In this case we only want to process QR Codes
                           if(result.format == "QR_CODE"){
                           var info = result.text;
                           //alerts(info);
                            if(info.length == 6 && 0 < parseInt(info) && parseInt(info) < 999999){
                                detail_qr_flag = 'Y';
                                getAssetDetail(info);
                                scan_page = $.mobile.activePage.attr('id');


                            }else{
                                alerts('QR코드를 확인해주세요');
                            }

                           }else{
                              console.log("NOT-QR-CODE");

                           }
                           QR_FLAG = false;
                    }else{
                      console.log("스캔취소");
                      $('.qr_bottom').attr("src", img_url('btn02'));
                    }

                 },
                 function (error) {
                      console.log("Error: " + error);
                 },{
                       preferFrontCamera: false, // iOS and Android, initiate the scanner with the front facing camera.
                       showFlipCameraButton: false, // iOS and Android, add a 'flip camera' button to the scanner UI.
                       showTorchButton: true, // iOS and Android, add a 'torch/flashlight' button to the scanner UI.
                       torchOn: false, // Android, launch with the torch/flashlight switched on (if available)
                       prompt: langs(5), // Android, shown at the bottom of the camera view.
                       resultDisplayDuration: 1500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                       formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                       orientation: "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
                    }
               );
            }


        //페이지 하단 버튼 동작 정의





        function decimal3(num) {
            if(num){
                num = num.toFixed(3);
                num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }else{
                num = '·';
            }
            return num;
        }

        function isNullReplaceDot(param){
            if(param == null || param == "" || param == "null" || param == "null:null"){
                return '·';
            }
            return param;
        }

        function isNullReplaceZero(param){
            if(param == null || param == "" || param == "null" || param == "null:null"){
                return '0';
            }
            return param;
        }


        function delay_func(func, millisecond){ // 딜레이함수
            setTimeout(
               function()
               {
                 func;
               }, millisecond);
        }

        function util_change_text(){
            if(sessionStorage.getItem("lang") == 'en'){
                sessionStorage.setItem("lang", "kor");
             }else{
               sessionStorage.setItem("lang", "en");
             }
             location.reload();
        }

        function langs(index){
            var langague = '';
            if(sessionStorage.getItem("lang") == "kor"){
                langague = dialog_kor[index];
            }else if(sessionStorage.getItem("lang") == "en"){
                langague = dialog_en[index];
            }
        return langague;
        }


// ------------------------------------- main.js ---------------------------------------------------//
        function popup_main_open(){
            $( "#main_search_popup" ).popup('open');

        }
        function popup_main_close(){
             $( "#main_search_popup" ).popup('close');
             $("*").blur();
        }


        function popup_setting_open(){
            $( "#main_setting_popup" ).popup('open');

        }
        function popup_setting_close(){
             $( "#main_setting_popup" ).popup('close');
             $("*").blur();
        }

        //팝업상세조회
        function main_search_popup_search(){
              //alerts("자산번호-"  $('#main_search_popup_asset_no').val() + "\n자산명-" + $('#main_search_popup_asset_name').val() + "\n자산유형-" + $('#main_search_popup_account_code').val() + '\n로 검색합니다.');

              sessionStorage.setItem("asset_no", $('#main_search_popup_asset_no').val());
              sessionStorage.setItem("asset_name", $('#main_search_popup_asset_name').val());
              sessionStorage.setItem("inspection_flag", $('#main_search_popup_inspection_flag').val()); //실사여부
              sessionStorage.setItem("account_name", $('#main_search_popup_account_code').val());
              sessionStorage.setItem("order_select", $('#main_order_select').val());
              sessionStorage.setItem("location", $('#main_search_popup_location').val());
              sessionStorage.setItem("pre_year_counter", $('#main_search_popup_counter_name').val());


            popup_main_close();
            window.scrollTo(0,0);
            MAIN_LIST_NO = 1;
            getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), sessionStorage.getItem("inspection_flag"), localStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select"), true, sessionStorage.getItem("location"), sessionStorage.getItem("pre_year_counter"));
            //getListAsset(asset_num, asset_name, account_name, inspection_flag, dept_code, start_no, end_no, ORDER);
            $('*').blur();
        }


        //팝업초기화
        function main_search_popup_reset(){

            $('#main_search_popup_asset_no').val('');
            $('#main_search_popup_asset_name').val('');
            $('#main_search_popup_counter_name').val(''); //검수자명
            $('#main_search_popup_location').val(''); //위치
            $('#main_search_popup_inspection_flag').val("").prop("selected", true);
            $('#main_search_popup_account_code').val("").prop("selected", true);
            $('#main_order_select').val("asset_num").prop("selected", true);

        }

        //오름내림차순정렬
        function desc_sort(){
                window.scrollTo(0,0);
                MAIN_LIST_NO = 1;

                if($('#main_desc_sort_btn').attr('src') == "../img/sort_up.png") { //asc
                        $('#main_desc_sort_btn').attr('src', "../img/sort_down.png");
                        getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), sessionStorage.getItem("inspection_flag"), localStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select") + " DESC", true, sessionStorage.getItem("location"), sessionStorage.getItem("pre_year_counter"));
                    }else{ //desc
                        $('#main_desc_sort_btn').attr('src', "../img/sort_up.png");
                        getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), sessionStorage.getItem("inspection_flag"), localStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select"), true, sessionStorage.getItem("location"), sessionStorage.getItem("pre_year_counter"));
                    }
    //        if($('#main_desc_sort_btn').hasClass("ui-icon-carat-d") == true) { //asc
    //                $('#main_desc_sort_btn').removeClass("ui-icon-carat-d").addClass("ui-icon-carat-u");
    //            getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), "", sessionStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select") + " DESC", true);
    //        }else if($('#main_desc_sort_btn').hasClass("ui-icon-carat-u") == true) { //desc
    //                $('#main_desc_sort_btn').removeClass("ui-icon-carat-u").addClass("ui-icon-carat-d");
    //            getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), "", sessionStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select"), true);
    //
    //        }

        }

        function location_display(){  //위치정보 표시 스위치 - main.html

             if($('#main_location_select').attr('src') == "../img/switch_off.png") {
                $('#main_location_select').attr('src', "../img/switch_on.png")
                localStorage.setItem("location_switch", "Y");
                $('.main_location_tr').css('display', '');
            }else{
                $('#main_location_select').attr('src', "../img/switch_off.png")
                localStorage.setItem("location_switch", "N");
                $('.main_location_tr').css('display', 'none');
            }

        }

        function location_display2(){ //위치 정보 표시 스위치 - 로컬스토리지 적용
            if(localStorage.getItem("location_switch")){
                 if(localStorage.getItem("location_switch") == "Y") {
                    $('.main_location_tr').css('display', '');
                    $('#main_location_select').attr('src', '../img/switch_on.png');
                }else{
                    $('.main_location_tr').css('display', 'none');
                    $('#main_location_select').attr('src', '../img/switch_off.png');
                }
             }
            }

       function location_display3(){  //위치정보 표시 스위치 - setting.html

             if($('#setting_location_select').attr('src') == "../img/switch_off.png") {
                $('#setting_location_select').attr('src', "../img/switch_on.png")
                localStorage.setItem("location_switch", "Y");

            }else{
                $('#setting_location_select').attr('src', "../img/switch_off.png")
                localStorage.setItem("location_switch", "N");

            }

        }

       function setting_auto_scan(){  //자동스캔 스위치 - setting.html

             if($('#setting_auto_scan_select').attr('src') == "../img/switch_off.png") {
                $('#setting_auto_scan_select').attr('src', "../img/switch_on.png")
                localStorage.setItem("setting_auto_scan_switch", "Y");

            }else{
                $('#setting_auto_scan_select').attr('src', "../img/switch_off.png")
                localStorage.setItem("setting_auto_scan_switch", "N");

            }

        }

        function setting_auto_scan_display(){ //자동스캔 스위치 디스플레이 - 로컬스토리지 적용
            if(localStorage.getItem("setting_auto_scan_switch")){
                 if(localStorage.getItem("setting_auto_scan_switch") == "Y") {
                    $('#setting_auto_scan_select').attr('src', '../img/switch_on.png');
                }else{
                    $('#setting_auto_scan_select').attr('src', '../img/switch_off.png');
                }
             }
            }


  function setting_inout_user(){  //내부.외부사용자 스위치 - setting.html

             if($('#setting_inout_user_select').attr('src') == "../img/switch_user_off.png") {
                $('#setting_inout_user_select').attr('src', "../img/switch_user_on.png")
                localStorage.setItem("login_flag", "out");

            }else{
                $('#setting_inout_user_select').attr('src', "../img/switch_user_off.png")
                localStorage.setItem("login_flag", "in");

            }

        }

        function setting_inout_user_display(){ //자동스캔 스위치 디스플레이 - 로컬스토리지 적용
            if(localStorage.getItem("login_flag")){
                 if(localStorage.getItem("login_flag") == "out") {
                    $('#setting_inout_user_select').attr('src', '../img/switch_user_on.png');
                }else{
                    $('#setting_inout_user_select').attr('src', '../img/switch_user_off.png');
                }
             }
            }


        function location_display4(){ //위치 정보 표시 스위치 - 로컬스토리지 적용
            if(localStorage.getItem("location_switch")){
                 if(localStorage.getItem("location_switch") == "Y") {
                    $('.main_location_tr').css('display', '');
                    $('#setting_location_select').attr('src', '../img/switch_on.png');
                }else{
                    $('.main_location_tr').css('display', 'none');
                    $('#setting_location_select').attr('src', '../img/switch_off.png');
                }
             }
            }


        function icon_display(){ //아이콘 및 텍스트 표시 스위치 - 화면적용

             if($('#main_icon_select').attr('src') == "../img/switch_off.png") {
                $('#main_icon_select').attr('src', "../img/switch_on.png");
                localStorage.setItem("icon", "Y");
                $('.main_icon_class').css('display', '');
                $('.main_text_class').css('display', 'none');

            }else{
                $('#main_icon_select').attr('src', "../img/switch_off.png")
                localStorage.setItem("icon", "N");
                $('.main_icon_class').css('display', 'none');
                $('.main_text_class').css('display', '');
            }

            }




        function icon_display2(){ //아이콘 및 텍스트 표시 스위치 - 로컬스토리지적용
            if(localStorage.getItem("icon")) {
                 if(localStorage.getItem("icon") == 'Y') {
                    $('.main_icon_class').css('display', '');
                    $('.main_text_class').css('display', 'none');
                    $('#main_icon_select').attr('src', '../img/switch_on.png');
                }else{
                    $('.main_icon_class').css('display', 'none');
                    $('.main_text_class').css('display', '');
                    $('#main_icon_select').attr('src', '../img/switch_off.png');
               }
            }
          }

        function icon_display3(){ //아이콘 및 텍스트 표시 스위치 - 화면적용

             if($('#setting_icon_select').attr('src') == "../img/switch_off.png") {
                $('#setting_icon_select').attr('src', "../img/switch_on.png");
                localStorage.setItem("icon", "Y");
            }else{
                $('#setting_icon_select').attr('src', "../img/switch_off.png");
                localStorage.setItem("icon", "N");
            }

            }

        function icon_display4(){ //아이콘 및 텍스트 표시 스위치 - 로컬스토리지적용
            if(localStorage.getItem("icon")) {
                 if(localStorage.getItem("icon") == 'Y') {
                    $('#setting_icon_select').attr('src', '../img/switch_on.png');
                }else{
                    $('#setting_icon_select').attr('src', '../img/switch_off.png');
               }
            }
          }


        // 메인 시작
        function main_init(){
    //        $('#main_order_select').change(function(){
    //            //alerts(this.index() + '/' + this.index().val);
    //        });
    //        if(sessionStorage.getItem("location_switch") == "Y"){
    //            $("#main_location_select").prop("checked", true);
    //            $('.main_location_tr').css('display', '');
    //        }else{
    //            $("#main_location_select").prop("checked", false);
    //            $('.main_location_tr').css('display', 'none');
    //        }


            global_double_select_flag = true; // 함수 중복호출 방지 플래그
            $('#main_list_count_select').change(function(event){
            if(global_double_select_flag){
            var counter = $(this).children("option:selected").val();
                sessionStorage.setItem('SCROLL_COUNTER', counter);
                SCROLL_COUNTER = parseInt(counter) - 1;
                global_login_flag = true;
                MAIN_LIST_NO = 1;
                window.scrollTo(0,0);
                getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), sessionStorage.getItem("inspection_flag"), localStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select"), true, sessionStorage.getItem("location"), sessionStorage.getItem("pre_year_counter"));
                global_double_select_flag = false;
                }
            });


    //
    //        $("#main_location_select").change(function(){
    //            if($(this).is(":checked")){
    //            sessionStorage.setItem("location_switch", "Y");
    //            $('.main_location_tr').css('display', '');
    //            }else{
    //            sessionStorage.setItem("location_switch", "N");
    //            $('.main_location_tr').css('display', 'none');
    //            }
    //        });


            $( "#main_search_popup" ).bind({
               popupafterclose: function(event, ui) {
                panelClose();

                g_scroll_permit_flag = true; //팝업닫힐때 스크롤활성화
               }
            }).bind({
               popupbeforeposition: function(event, ui){
                windowByMask();
                g_scroll_permit_flag = false; //팝업열릴때 스크롤비활성
                }
            });
            //var path = "mDAI/getListAsset?ad_user_id=" + userId.toUpperCase();
            window.scrollTo(0,0);
            MAIN_LIST_NO = 1;
                                
            if(global_login_flag){
                                
                setTimeout(function() {
                getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), sessionStorage.getItem("inspection_flag"), localStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select"), true, sessionStorage.getItem("location"), sessionStorage.getItem("pre_year_counter"));
                //getListAsset(asset_num, asset_name, account_name, inspection_flag, dept_code, start_no, end_no, ORDER);
                }, 500);
                global_login_flag = false;
            }else{
                                
                getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), sessionStorage.getItem("inspection_flag"), localStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select"), true, sessionStorage.getItem("location"), sessionStorage.getItem("pre_year_counter"));
                                           
            }
        }

        //자산리스트 가져오기
        function getListAsset(asset_num, asset_name, account_name, inspection_flag, dept_code, start_no, end_no, ORDER, init_flag, p_location, pre_year_counter){
            //alertMCSresult(start_no + '/' + end_no);
            //console.info("★★★★★★★★★" + start_no + '/' + end_no);

            var url = "mDAI/getListAsset?asset_num=" + asset_num + "&asset_name=" + asset_name + "&account_name=" + account_name + "&inspection_flag=" + inspection_flag + "&dept_code=" + dept_code + "&start_no=" + start_no + "&end_no=" + end_no + "&order=" + ORDER + "&location=" + p_location + "&pre_year_counter=" + pre_year_counter;
            var method = "GET";
            var data = "";
                                
            //console.info("*** getListAsset ==> " + url);

             McsConnecter(url, method, data, main_result_display);
             global_init_flag = init_flag;

        }

        function alertMCSresult(result){
            alerts(JSON.stringify(result));
            console.info(JSON.stringify(result));
            setStopSpinner();
        }

        //리스트 아이콘
        function make_icon(str){
            var pre_url = "../img/spec/";
            var pre_url2 = "../img/text/";
            var text_compare_array = ["건", "구", "기", "중", "차", "공", "비"];
            var index = text_compare_array.indexOf(str.substring(0,1));
            var icon_text_array = ["icon01.png", "icon02.png", "icon03.png", "icon04.png", "icon05.png", "icon06.png", "icon07.png"];
            var img_url = pre_url + icon_text_array[index];
            var img_url2 = pre_url2 + icon_text_array[index];
            var pre_icon = "<tr><td rowspan='3' width='10%' align='center'><div style='padding:10px 5px;margin:5px;font-size:20px;text-shadow:none;font-weight:normal;display:none;' class='main_icon_class'><img class='lazy' src='" + img_url + "' width='30px'></div><div style='padding:10px 5px;margin:5px;font-size:20px;text-shadow:none;font-weight:normal;display:none;' class='main_text_class'><img src='" + img_url2 + "' width='30px'></div></td>";
            return pre_icon;
        }


        //자산리스트 결과 셋팅
        function main_result_display(p_result){
        //MAIN_LIST_NO = SCROLL_COUNTER + MAIN_LIST_NO;
                var temp = '';
             //   alertMCSresult(p_result);

            if(p_result.db_getListAssetOutput){
                   p_result = p_result.db_getListAssetOutput;
                  if(p_result.length > 0){
                         for(var i = 0; i < p_result.length ; i++){
                                //console.log("*** getListAsset ***" + i);
                            var list =  p_result[i];
//                                if (text.indexOf(findStr) != -1) {
//
//                                }
                            temp += "<li style='border-bottom:1px solid #E0E0E0;box-shadow:none !important' onclick='getAssetDetail(" + list.asset_num + ")'>";
                            if(list.asset_num == p_asset_num){
                                temp += "<table style='background:#E1F5FE !important'>";
                            }else{
                                temp += "<table>";
                            }
                            temp += make_icon(list.account_name);
    //                        temp += "<tr><td rowspan='2' width='20%'><img src='../img/img04.png'></td>";  //아이템유형이미지
                            temp += "<td colspan='2' width='40%'>" + list.asset_num + "</td>"; //아이템번호

                            if(list.inspection_flag == "Y"){
                                 temp += "<td rowspan='3' width='10%' align='center'><img src='../img/check_circle.png' width='20px'></td>"; //red
                                 //temp += "<td rowspan='2' width='10%' align='center'><div style='width:20px;height:20px;background:#69F0AE;border-radius:20px;'></div></td>"; //그린
                            }else{
                                 temp += "<td rowspan='3' width='10%' align='center'>" + list.check_quantity + "/" + list.asset_quantity + "</td>"; // 실사수량/전체수량
                            }
                            temp += "</tr>";
                            temp += "<tr>";
                            temp += "<td colspan='2'>" + list.asset_name + "</td>"; //아이템명
                            temp += "</tr>";

                            temp += "<tr class='main_location_tr' style='display:none'>";
                            temp += "<td colspan='2'>" + isNullReplace(list.location) + "</td>"; //장소
                            temp += "</tr>";

                            temp += "</table>";
                            temp += "</li>";

                            }

                    }
                        global_double_flag = true;
                  }else{
                         temp += "<div style='background:#fff;text-align:center;padding:10px 10px;border-top:1px solid #ccc'><div class='ui-grid-solo'><div class='ui-block-a'>";
                         temp += "검색 결과가 없습니다.";
                         temp += "</div></div></div>";
                         global_double_flag = false;
                  }
                        global_double_select_flag = true;
                         if(global_init_flag){ //데이터를 처음부터 혹은 이어붙이기 여부 판단
                            $('#main_list').empty().append(isNullReplace(temp));
                             scroll_end_process('#main_list'); //scroll 로딩
                         }else{
                            $('#main_list').append(isNullReplace(temp));

                         }
                                

    //			var textareaLineHeight=parseInt($("#main_list").css("line-height"));
    //
    //				$("#main_list").mCustomScrollbar({
    //					scrollInertia:0,
    //					theme:"dark-3",
    //					advanced:{autoScrollOnFocus:false},
    //					mouseWheel:{disableOver:["select","option","keygen","datalist",""]},
    //					keyboard:{enable:false},
    //					snapAmount:textareaLineHeight
    //				});
                        icon_display2();
                        location_display2();
                        MAIN_LIST_NO = MAIN_LIST_NO + SCROLL_COUNTER;

                        setStopSpinner();

        }



          //INFINITY SCROLL
         function scroll_end_process(id){

               $(window).scroll( function() {
                if(g_scroll_permit_flag){
                  if($(window).scrollTop() >= $(id).offset().top + $(id).outerHeight() - window.innerHeight) {
                  console.info('scroll out work! :' + global_double_flag);
                    if(global_double_flag){
                    console.info('scroll global_double_flag work!');
                    if(MAIN_LIST_NO != 1){
                        MAIN_LIST_NO ++;
                    }
                        getListAsset(sessionStorage.getItem("asset_no"), sessionStorage.getItem("asset_name"), sessionStorage.getItem("account_name"), sessionStorage.getItem("inspection_flag"), localStorage.getItem("usr_dept_code"), MAIN_LIST_NO, MAIN_LIST_NO + SCROLL_COUNTER, sessionStorage.getItem("order_select"), false, sessionStorage.getItem("location"), sessionStorage.getItem("pre_year_counter"));
                         //log_init(log_end_no, log_increase_no, false);
                         global_double_flag = !global_double_flag;
                     }
                    }
                    }
                 });
                 global_init_flag = !global_init_flag;

         }

          //main_result_display(test_result);

            function submit_keyboard(event, func){
              if(event.keyCode == 13){
              $('input').blur();

              }
//              $("#main_search_popup").on("keypress", "input", function(e) {
//                  //check for enter key
//
//                  if(e.which === 13) {
//                  main_search_popup_search();
//                      //check for empty input
////                      if($("input:empty").length === 0) {
////
////                      }
//                  }
//              });
//              $("#setting").on("keypress", "input", function(e) {
//                  if(e.which === 13) {
//                  getListTeam();
//                  }
//              });
//
//              $("#detail").on("keypress", "input", function(e) {
//                  if(e.which === 13) {
//                  detail_location_select();
//                  }
//              });

            }

// ------------------------------------- detail.js ---------------------------------------------------//

            //특수문자 제거
            function remove_special_char(str){
                var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
                if(regExp.test(str)){
                var t = str.replace(regExp, "");
                return t;
                }else{
                return str;
                }
             }

var p_asset_num; //터치시 자산번호
var getAssetDetail_result; //상세정보

        //자산상세 가져오기
          function getAssetDetail(asset_num){
                    p_asset_num = asset_num;


                  //var url = "mDAI/getAssetDetail?&dept_code=" + sessionStorage.getItem("usr_dept_code") + "&asset_num=" + asset_num;
                  var url = "mDAI/getAssetDetail?&dept_code=&asset_num=" + asset_num;
                  var method = "GET";
                  var data = "";
                   McsConnecter(url, method, data, getAssetDetail_result_func);

              }


            //자산상세 결과처리
           function getAssetDetail_result_func(result){
               if(result){
                    getAssetDetail_result = ""; //초기화
                    getAssetDetail_result = result;
                if(scan_page == 'detail'){
                    move_refresh();
                }else{
                    move_page('detail');
                }



                 //   alertMCSresult(result);
                 }else{
                    alerts('실사 대상이 아닙니다.');
                 }
                    setStopSpinner();
            }



var detail_location_select_01_text = '';
            //자산상세 초기 셋팅
            function detail_init(){
                detail_result_display(getAssetDetail_result); //자산상세정보
                getListSurvay(p_asset_num);
                console.log('detail_init');
                $('input:radio[name =detail_location_01]').change(function() {
                    detail_location_select_01_text = $(this).val();
                    getAssetLocation($(this).val());

                    $('#radio01_img').attr('src', '../img/radio00.png');
                    $('#radio02_img').attr('src', '../img/radio00.png');
                            if(detail_location_select_01_text == '공장'){
                                $('#radio01_img').attr('src', '../img/radio01.png');
                                detail_location_all_remove();
                            }else{
                                $('#radio02_img').attr('src', '../img/radio01.png');
                                detail_location_all_remove();
                            }
                 $("*").blur();
                });
                detail_location_02_flag = true; //location flag 활성화
            }
            //자산상세위치 가져오기
            function getAssetLocation(p_location){
                  var url = "mDAI/getAssetLocation?&location=" + p_location;
                  var method = "GET";
                  var data = "";
                   McsConnecter(url, method, data, getAssetLocation_result_func);
            }

var detail_location_02_flag = true; //중복호출 방지
var location_case = '';

            //자산상세위치 보여주기
            function getAssetLocation_result_func(result){

                if(result){
                var temp = '';
                    var list = result.db_getAssetLocationOutput;
                    temp += "<option value=''>위치 선택</option>";
                    for(var i = 0; i < list.length; i++){
                    temp += "<option value='" + list[i].meaning + "'>" + list[i].meaning + "</option>";
                    }
                    $('#detail_location_02').empty().append(temp);
                    //$('#detail_location_02').css('display', '');


                    if(detail_location_02_flag){
                        $('#detail_location_02').change(function(event){
                        var counter = $(this).children("option:selected").val();
                        detail_location_02_flag = false;
                            detail_location_all_remove();
                            if(counter != ''){
                                console.log('★' + detail_location_select_01_text + '/' + counter);
                                if(detail_location_select_01_text != '공장'){

                                    switch(counter){
                                    case '옥외':
                                        $('#detail_location_select_factory_else2_tr').css('display', '');
                                        location_case = 'C';
                                    break;
                                    case '기타':
                                        $('#detail_location_select_factory_else3_tr').css('display', '');
                                        location_case = 'D';
                                    break;
                                    default:
                                        $('#detail_location_select_factory_else_tr').css('display', '');
                                        location_case = 'B';
                                    break;

                                }
                            }else{
                                $('#detail_location_select_factory_tr').css('display', '');
                                location_case = 'A';
                            }
                        }
                        });
                    }
                }
                $("*").blur();
                setStopSpinner();

            }
            //자산상세위치 초기화
            function detail_location_all_remove(){
                $('#detail_location_select_factory_tr').css('display', 'none');
                $('#detail_location_select_factory_else_tr').css('display', 'none');
                $('#detail_location_select_factory_else2_tr').css('display', 'none');
                $('#detail_location_select_factory_else3_tr').css('display', 'none');
            }




var IMG_FLAG = '';
var detail_asset_complete_flag = 'N'; //실사완료여부
var global_photo_year = '';

            //자산상세 결과 처리
            function detail_result_display(result){
               // console.log(JSON.stringify(result));
                var info = result.db_getAssetDetailOutput;



                if(parseInt(info[0].asset_quantity) == parseInt(info[0].check_quantity) + parseInt(info[0].lack_quantity) + parseInt(info[0].disuse_quantity)){
                    alerts('실사 완료된 대상입니다.');
                    detail_asset_complete_flag = 'Y';
                  //  $('#detail_complete_btn').css({'background':'#EEEEEE','color':'#BDBDBD', 'border':'none'});
                    $('#detail_survay_btn').css({'background':'#EEEEEE','color':'#BDBDBD', 'border':'none'});

                    //실사완료된 경우 입력폼 disable
                    $('#detail_check_quantity_td').attr('disabled','disabled');
                    $('#detail_lack_quantity_td').attr('disabled','disabled');
                    $('#detail_lack_reason_ta').attr('disabled','disabled');
                    $('#detail_fire_dragon_quantity_td').attr('disabled','disabled');
                    $('#detail_fire_dragon_condition_st').attr('disabled','disabled');
                    $('#detail_fire_dragon_ta').attr('disabled','disabled');
                    $('#detail_etc_ta').attr('disabled','disabled');
                    //$('#detail_LOCATION_td').attr('disabled','disabled'); //자산위치


                }else{
                    detail_asset_complete_flag = 'N';



                }

                    if(detail_qr_flag == 'Y'){ //QR로 조회할 경우
                        if(parseInt(info[0].asset_quantity) > parseInt(isNullReplaceZero(info[0].check_quantity))){ // 전체자산수량보다 실사수량이 작을 경우만 1추가
                            $('#detail_check_quantity_td').val(parseInt(isNullReplaceZero(info[0].check_quantity)) + 1); //qr로 체크할 경우 실사수량 1증가
                        }else{
                            $('#detail_check_quantity_td').val(isNullReplaceZero(info[0].check_quantity));
                        }
                    }else{
                        $('#detail_check_quantity_td').val(isNullReplaceZero(info[0].check_quantity));
                    }
//                if(detail_qr_flag == 'Y'){ //QR로 조회할 경우
//                        if(scan_page != 'detail'){
//
//
//                        }else{
//                            if(parseInt(info[0].asset_quantity) > parseInt($('#detail_check_quantity_td').val())){ //
//
//                                    $('#detail_check_quantity_td').val(parseInt($('#detail_check_quantity_td').val()) + 1); //qr로 체크할 경우 실사수량 1증가
//                                    detail_qr_flag = 'N';
//
//                            }
//                        }
//                }else{
//                    $('#detail_check_quantity_td').val(isNullReplaceZero(info[0].check_quantity));
//                }

                $('#detail_asset_num_td').text(info[0].asset_num);
                $('#detail_asset_name_td').text(info[0].asset_name);
            //    $('#detail_bu_td').text('');
                $('#detail_dept_name_td').text(info[0].dept_name);
                $('#detail_asset_date_td').text(info[0].asset_date.substring(0,10));

                $('#detail_asset_quantity_td').text(info[0].asset_quantity);


                $('#detail_lack_quantity_td').val(isNullReplaceZero(info[0].lack_quantity)); //부족수량
                $('#detail_lack_reason_ta').val(isNullReplace(info[0].lack_reason)); //부족사유
                $('#detail_fire_dragon_quantity_td').val(isNullReplaceZero(info[0].disuse_quantity)); //불용수량
                //detail_fire_dragon_condition_st 불용상태
                $('#detail_fire_dragon_condition_st').val(isNullReplace(info[0].disuse_status));

                $('#detail_fire_dragon_ta').val(isNullReplace(info[0].disuse_reason)); //불용사유

                $('#detail_etc_ta').val(isNullReplace(info[0].remark)); //불용사유



                $('#detail_LOCATION_td').val(isNullReplace(info[0].LOCATION));
                //실사정보
                $('#detail_counter_td').text(isNullReplace(info[0].counter));
                global_photo_year = info[0].year;
                IMG_FLAG = info[0].IMAGE_FLAG;
                console.log('IMAGE_FLAG' + info[0].IMAGE_FLAG);
                if(info[0].IMAGE_FLAG == 'Y'){
                $('#detail_img_confirm_tr').css('display','');
                }

            }

            //자산상세 숨겨진 수량 처리
            function detail_open_inner_table(){

                if($('#detail_inner_table').css('display') == "none"){
                    $("#detail_inner_table").slideDown("slow");
                    $('#detail_plus_btn').attr('src', '../img/minus.png');
                } else {
                    $("#detail_inner_table").slideUp("slow");
                    $('#detail_plus_btn').attr('src', '../img/plus.png');

                }

            }

            //자산상세 실사 사진 가져오기
            function getAssetPhoto(p_year){
                if(p_year == 'NEW'){
                    p_year = global_photo_year;
                }

               var url = "mDAI/getAssetPhoto?&asset_num=" + p_asset_num + "&year=" + p_year;
               var method = "GET";
               var data = "";
               McsConnecter(url, method, data, getAssetPhoto_result_func);
            }

            //자산상세 실사 사진 처리
            function getAssetPhoto_result_func(result){
                var info = result.db_getAssetPhotoOutput;

               $('#detail_img_confirm_tr').css('display','none');
               $('#detail_img_tr').css('display', '');
               $('#detail_img_screen').attr('src', 'data:image/png;base64,' + info[0].asset_image);
               imgURI = info[0].asset_image;
               setStopSpinner();
            }

            function getAssetPhoto_list(p_year){
                if(p_year == 'NEW'){
                    p_year = global_photo_year;
                }

               var url = "mDAI/getAssetPhoto?&asset_num=" + p_asset_num + "&year=" + p_year;
               var method = "GET";
               var data = "";
               McsConnecter(url, method, data, getAssetPhoto_list_result_func);
            }

            //자산상세 실사 사진 처리
            function getAssetPhoto_list_result_func(result){
               var info = result.db_getAssetPhotoOutput;
               PhotoViewer.show('data:image/png;base64,' + info[0].asset_image, '실사사진');
               setStopSpinner();
            }

            //자산상세 실사이력 리스트 가져오기
           function getListSurvay(asset_num){

                  var url = "mDAI/getListSurvay?&dept_code=" + localStorage.getItem("usr_dept_code") + "&asset_num=" + asset_num;
                  var method = "GET";
                  var data = "";
                  McsConnecter(url, method, data, getListSurvay_result_func);

              }

            //자산상세 실사이력 리스트 결과 처리
            var count = 0;
           function getListSurvay_result_func(p_result){
               var temp = '';

               if(p_result){
               if(p_result.db_getListSurvayOutput){
               p_result = p_result.db_getListSurvayOutput;
              if(p_result.length > 0){

                     for(var i = 0; i < p_result.length ; i++){
                        var list =  p_result[i];
                        temp += "<tr colspan='2'>";
                        temp += "<td align='center' width='15%'>" + list.YEAR + "</td>";
                        temp += "<td align='center' width='15%'>" + list.check_quantity + "</td>";
                        if(isNullReplace(list.img_flag) == 'Y'){
                        temp += "<td align='center' width='15%' onclick='getAssetPhoto_list(" + list.YEAR + ")'><div style='padding:2px 5px;border:1px solid #000'>+</div></td>";
                        }else{
                        temp += "<td align='center' width='15%'></td>";
                        }
                        temp += "<td width='55%'>" + isNullReplace(list.location) + "</td>";

                        temp += "<tr>";

                        }

                  }
                }
              }else{
                     temp += "<div style='background:#fff;text-align:center;padding:10px 10px;border-top:1px solid #ccc'><div class='ui-grid-solo'><div class='ui-block-a'>";
                     temp += "검색 결과가 없습니다.";
                     temp += "</div></div></div>";
              }

              $('#detail_survay_table').append(isNullReplace(temp));

                setStopSpinner();
            }

            //validate 자산수량 수량계산
            function calcul_quantity(str){

                if($(str).attr('id') == 'detail_fire_dragon_quantity_td' && $(str).val() == 0){
                   $('#detail_fire_dragon_condition_st').val(''); //불용셀렉지움
                   $('#detail_fire_dragon_ta').val(''); //불용사유 지움

                }
                if($(str).attr('id') == 'detail_lack_quantity_td' && $(str).val() == 0){
                   $('#detail_lack_reason_ta').val(''); //부족사유 지움
                }
                var total_count = $('#detail_asset_quantity_td').text();
                var num01 = $('#detail_check_quantity_td').val();
                var num02 = $('#detail_lack_quantity_td').val();
                var num03 = $('#detail_fire_dragon_quantity_td').val();
                var result = 0;
                if(num01 && num02 && num03){
                    result = parseInt(num01) + parseInt(num02) + parseInt(num03);
                    if(parseInt(total_count) < result){
                     alerts('자산 수량보다 실사+부족+불용 수량이 더 많습니다.');
                     $(str).val(0);

                    }
                }
                var result = '';
                var text = $(str).val();
                result = text.replace('.', ''); //.제거
                result = result.replace(/(^0+)/, ''); //왼쪽 0 제거

                if(result == ''){
                    result = '0';
                }
                $(str).val(result);
            }

            //자산 수량 닷(.) 제거
            function remove_dot(text){
                var result = '';
                result = text.replace('.', ''); //.제거
                result = result.replace(/(^0+)/, ''); //왼쪽 0 제거
                if(result == ''){
                    result = '0';
                }
                return result;
            }

            //자산 수량 불용선택 처리
            function detail_fire_dragon_select_func(str){
                if($('#detail_fire_dragon_quantity_td').val() == 0){
                $(str).val('');
                }
            }

            //자산 수량 blank 처리(0)
            function input_zero(str){
                var text = $(str).val();
                if(text == ''){
                    $(str).val(0);
                }
            }
            //자산 reason, 비고 등 textarea 1000byte 입력제한 처리
            function text_area_calcul(str){
                var text = $(str).val();
                var text = $(str).val();
                var max_length = 1000;
                var codeByte = 0;
                var rlen = 0;
                for (var idx = 0; idx < text.length; idx++) {
                    var oneChar = escape(text.charAt(idx));
                    if ( oneChar.length == 1 ) {
                        codeByte ++;
                    } else if (oneChar.indexOf("%u") != -1) {
                        codeByte += 2;
                    } else if (oneChar.indexOf("%") != -1) {
                        codeByte ++;
                    }
                    if(codeByte <= max_length){
                        rlen = idx + 1;                                          //return할 문자열 갯수
                    }

                }
                if(codeByte > max_length){
                    alerts('1000byte까지 입력할 수 있습니다.');
                    $(str).val(text.substr(0, rlen));
                }

            }

            //자산 위치 선택시 상세입력란 처리 1463
            function detail_location_select(){

                var detail_location_02_text = $('#detail_location_02').val();
                if(detail_location_02_text == ''){
                    alerts('세부 항목을 입력해주세요');
                    $('#detail_location_02').focus();
                }else{
                var result_text = '';
                    switch(location_case){
                    case 'A': //공장
                        if($('#detail_location_select_factory_Bay').val().trim() != '' && $('#detail_location_select_factory_Col').val().trim() != ''){
                            result_text += detail_location_02_text + ' ' + $('#detail_location_select_factory_Bay').val().trim() + 'Bay ' + $('#detail_location_select_factory_Col').val().trim() + 'Col ' + $('#detail_location_select_factory_etc').val().trim();
                        }else{
                            alerts('세부 항목을 입력해주세요');
                            $('#detail_location_select_factory_Bay').focus();
                            return;
                        }
                    break;
                    case 'B': //공장외
                        if($('#detail_location_select_factory_else_floor').val().trim() != ''){
                        result_text += detail_location_02_text + ' ' + $('#detail_location_select_factory_else_floor').val().trim() + '층';
                        }else{
                            alerts('세부 항목을 입력해주세요');
                            $('#detail_location_select_factory_else_floor').focus();
                            return;
                        }
                    break;
                    case 'C': //공장외 옥외
                        if($('#detail_location_select_factory_else_block').val().trim() != '' && $('#detail_location_select_factory_else_sector').val().trim() != ''){
                        result_text += detail_location_02_text + ' ' + $('#detail_location_select_factory_else_block').val().trim() + 'Block ' + $('#detail_location_select_factory_else_sector').val().trim() + '구간';
                        }else{
                            alerts('세부 항목을 입력해주세요');
                            $('#detail_location_select_factory_else_block').focus();
                            return;
                        }
                    break;
                    case 'D': //공장외 기타
                        if($('#detail_location_select_factory_else_free').val().trim() != ''){
                        result_text += $('#detail_location_select_factory_else_free').val().trim();
                        }else{
                            alerts('세부 항목을 입력해주세요');
                            $('#detail_location_select_factory_else_free').focus();
                            return;
                        }
                    break;
                    }
                $('#detail_LOCATION_td').val(result_text.trim());
                detail_location_popup_close();
                 }

            }


            //자산 실사 완료 및 취소 처리
            function detail_submit(){
                //if(detail_asset_complete_flag == 'Y'){
                    //alerts('실사가 완료되었습니다.');
                //}else{
                    dialog_confirm('실사 결과를 저장하시겠습니까?', confirm_func);
                //}

            }

            function detail_cancel(){
                dialog_confirm('실사를 취소하시겠습니까?', confirm_func2);
            }


var put_flag = '';

            function confirm_func(buttonIndex){
                if(buttonIndex == 1){
                    putSavePhoto();
                    $("*").blur();
                }
            }

            function confirm_func2(buttonIndex){
                if(buttonIndex == 1){

                    if(IMG_FLAG == 'Y'){
                        DelAssetPhoto();
                    }else{
                        putAssetSurvey('cancel');
                    }
                    $("*").blur();
                }
            }

            //자산 실사 사진 처리
            function putSavePhoto(){ //사진이 있으면 사진전송후 데이터전송 없으면 데이터 전송만
               if(imgURI != '' && CAMERA_FLAG){
                    file_transfer(imgURI);
                    }else{
                    putAssetSurvey('submit');
                    }


            }

            //자산 실사 입력 처리, validation
            var global_Asset_complete = false;
            function putAssetSurvey(str){

              put_flag = str;
              var url = "mDAI/putAssetSurvey";
              var method = "PUT";
              if(str == 'submit'){

                      //validation

                      if($('#detail_LOCATION_td').val().trim() == ''){
                      alerts('위치를 입력해주세요');
                      return;
                      }
                      var total_count = parseInt($('#detail_asset_quantity_td').text());
                      var num01 = parseInt($('#detail_check_quantity_td').val()); //실사수량
                      var num02 = parseInt($('#detail_lack_quantity_td').val());    //부족수량
                      var num03 = parseInt($('#detail_fire_dragon_quantity_td').val()); //불용수량
                      var result = num01 + num02 + num03;

                    if(total_count == result){
                        global_Asset_complete = true;
                    }else{
                        global_Asset_complete = false;
                    }
                    //불용 or 부족수량 있을 경우.. 불용사유, 부족사유 공백 x validation
                    if(num02 > 0 && $('#detail_lack_reason_ta').val() == ''){
                        alerts('부족사유를 입력해주세요.');
                        return;
                    }
                    if(num03 > 0 && $('#detail_fire_dragon_ta').val() == ''){
                        alerts('불용사유를 입력해주세요.');
                        return;
                    }


                    //불용, 실사, 부족 수량은 0이상, 음수x
                    if(num01 < 0 || num02 < 0 || num03 < 0){
                    alerts('수량은 0보다 작을 수 없습니다.');
                    return;
                    }

                    //자산수량 => 불용 + 실사 + 부족
                    if(total_count < result){
                    alerts('수량에 오류가 있습니다.');
                    return;
                    }

                    //불용수량 0 -> 불용사유 및 상태 초기화
                    if(num03 == 0){
                      $('#detail_fire_dragon_condition_st').val('');
                      $('#detail_fire_dragon_ta').val('');
                    }

                    //부족수량 0 -> 부족사유 초기화
                    if(num02 == 0){
                      $('#detail_lack_reason_ta').val('');
                    }


                  var data = {
                    "check_quantity":remove_dot($('#detail_check_quantity_td').val()),
                    "lack_quantity":remove_dot($('#detail_lack_quantity_td').val()),
                    "lack_reason":$('#detail_lack_reason_ta').val(),
                    "disuse_quantity":remove_dot($('#detail_fire_dragon_quantity_td').val()),
                    "disuse_status":$('#detail_fire_dragon_condition_st').val(),
                    "disuse_reason":$('#detail_fire_dragon_ta').val(),
                    "remark":$('#detail_etc_ta').val(),
                    "counter": sessionStorage.getItem("usr_id"),
                    "location":$('#detail_LOCATION_td').val(),
                    "asset_num":$('#detail_asset_num_td').text()
                  };
              }else if(str == 'cancel'){
                  var data = {
                      "check_quantity":0,
                      "lack_quantity":0,
                      "lack_reason":"",
                      "disuse_quantity":0,
                      "disuse_status":"",
                      "disuse_reason":"",
                      "remark":"",
                      "counter":"",
                      "location":"",
                      "asset_num":$('#detail_asset_num_td').text()
                    };
              }
              console.log($('#detail_check_quantity_td').val() + '\n' + $('#detail_lack_quantity_td').val() + '\n' + $('#detail_lack_reason_ta').val() + '\n' + $('#detail_fire_dragon_quantity_td').val() + '\n'
              + $('#detail_fire_dragon_condition_st').val() + '\n' + $('#detail_fire_dragon_ta').val() + '\n' + $('#detail_etc_ta').val() + '\n' + $('#detail_LOCATION_td').val() + '\n' + sessionStorage.getItem("usr_id")
              + '\n' + $('#detail_asset_num_td').text());

               McsConnecter(url, method, data, putAssetSurvey_response);

            }

            //자산 실사 입력 후 결과 처리
            function putAssetSurvey_response(result){
                if(result.result == 'Y'){
                    if(put_flag == 'submit'){
                            //$('#detail_counter_td').text(sessionStorage.getItem("usr_id"));
                            move_page('main');
                            if(localStorage.getItem("setting_auto_scan_switch") != "Y"){
                                if(global_Asset_complete){
                                    alerts('실사가 완료되었습니다.');
                                 }else{
                                    alerts('실사 결과가 저장되었습니다.');
                                 }
                             }else{
                                scanQR();
                             }

                    }else{
                        alerts('실사가 취소되었습니다.');
                        move_page('main');
                    }
                    $('#detail_check_quantity_td').val(0);
                    $('#detail_lack_quantity_td').val(0);
                    $('#detail_lack_reason_ta').val('');
                    $('#detail_fire_dragon_quantity_td').val(0);
                    $('#detail_fire_dragon_condition_st').val('');
                    $('#detail_fire_dragon_ta').val('');
                    $('#detail_etc_ta').val('');
                    $('#detail_counter_td').text('');


                 }else{
                    navigator.notification.confirm(
                        "처리 중 오류가 발생하였습니다.",
                        confirmIgnoreOrReload,
                        APPLICATION_NAME,
                        ["재시도", "무시"]
                    );
                 }
                 setStopSpinner();
            }


            //카메라 촬영
            function take_picture(str){
                if(str == 'camera'){
                    if(detail_asset_complete_flag == 'Y'){
                    }else{
                        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions(Camera.PictureSourceType.CAMERA));
                    }
                }else if(str == 'album'){
                navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions(Camera.PictureSourceType.PHOTOLIBRARY));
                }
            }


            //카메라 옵션
            function cameraOptions(srcType) {
                var options = {
                    // Some common settings are 20, 50, and 100
                    quality: 20,
                    destinationType: Camera.DestinationType.DATA_URL, // FILE_URI
                    // In this app, dynamically set the picture source, Camera or photo gallery
                    sourceType: srcType,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    targetWidth: 800,
                    allowEdit: false,
                    correctOrientation: true  //Corrects Android orientation quirks
                }
                return options;
            }

var imgURI = '';
var CAMERA_FLAG = false;
            //카메라 촬영성공 처리
           function cameraSuccess(imageURI) {

           $('#detail_img_tr').css('display', '');
           $('#detail_img_screen').attr('src', 'data:image/png;base64,' + imageURI);
           imgURI = imageURI;
           CAMERA_FLAG = true;

            }

            //촬영 사진 터치 처리
            function img_onclick(){
             PhotoViewer.show('data:image/png;base64,' + imgURI, '실사사진');
            }


            function cameraError(message) {
                console.log('err: ' + JSON.stringify(message));
            }

            //촬영 사진 불량처리
            function detail_img_error(){
                $('#detail_img_tr').css('display', 'none');
                $('#detail_img_screen').attr('src', '');
            }

                //★★★★★★★★★★★★★★★이미지서버전송★★★★★★★★★★★★★★★★★★★★
var serverURL = encodeURI('http://dherp.doosanheavy.com:8018/OA_HTML/dhi/zscm/fileLoad/attach_acct.jsp');
//var Now = new Date();
//var NowTime = Now.getFullYear();
            //촬영 사진 전송처리
           function file_transfer(fileURL){
              var url = '';
              if(IMG_FLAG == 'Y'){//기존 이미지가 있는경우 update
                    url = "mDAI/putSavePhotoUpdate";
                    var data = {
                                "YEAR":global_photo_year,
                                "asset_num":$('#detail_asset_num_td').text(),
                                "asset_image":fileURL,
                                "created_by":sessionStorage.getItem("usr_id"),
                                "YEAR2":global_photo_year,
                              };

              }else{ //신규이미지일 경우 insert
                    url = "mDAI/putSavePhoto";
                    var data = {
                                "YEAR":global_photo_year,
                                "asset_num":$('#detail_asset_num_td').text(),
                                "asset_image":fileURL,
                                "created_by":sessionStorage.getItem("usr_id")
                              };
                }
                    var method = "PUT";



                   McsConnecter(url, method, data, putSavePhoto_response);

           }
            //촬영 사진 삭제처리
           function DelAssetPhoto(){

              var url = "mDAI/DelAssetPhoto";
               var method = "PUT";
               var data = {
                   "asset_num":$('#detail_asset_num_td').text().trim(),
                   "year":global_photo_year.trim()
                 };
              console.log("★DEL★ " + JSON.stringify(data));
              McsConnecter(url, method, data, DelAssetPhoto_response);

           }
            //촬영 사진 삭제 후 결과 처리
           function DelAssetPhoto_response(r){
                if(r.result == 'Y'){
                    imgURI = '';
                    CAMERA_FLAG = false;
                    putAssetSurvey('cancel');
                    }
                setStopSpinner();
           }

            //촬영 사진 서버전송 후 결과 처리
           function putSavePhoto_response(r){

                if(r.result == 'Y'){
                    putAssetSurvey('submit'); // 이미지 데이터 전송후 리스폰 Y를 받은 뒤 데이터 전송
                    CAMERA_FLAG = false;
                    //imgURI = '';
                }
                setStopSpinner();

           }


            function fail(error) {
                alertMCSresult('전송실패' + error);
                //imgURI = '';
                setStopSpinner();
            }




            function detail_location_popup_open(){
                $( "#detail_location_popup" ).popup('open');
            }

            function detail_location_popup_close(){
                $( "#detail_location_popup" ).popup('close');
                $("*").blur();
            }



// ------------------------------------- monitoring.js ---------------------------------------------------//
var change_page = 'dept';
            //실사 모니터링 초기화
            function monitoring_init(){

                   if(getSurveyStatus_result){
                        getSurveyStatus_result_func(getSurveyStatus_result);
                   }else{
                        getSurveyStatus(localStorage.getItem('usr_dept_code'));
                   }
            }
            //실사 모니터링 가져오기
             function getSurveyStatus(dept_code){
                  var url = "mDAI/getSurveyStatus?dept_code=" + dept_code + "&dept_code2=" + dept_code;
                  var method = "GET";
                  var data = "";
                   McsConnecter(url, method, data, getSurveyStatus_result_func);

             }


var getSurveyStatus_result;
                //실사 모니터링 결과 처리
               function getSurveyStatus_result_func(result){
               getSurveyStatus_result = result;


                    //var dept_name = '';
                    var all_index = 0;
                    var dept_index = 0;

                    if(result){
                        if(result.db_getSurveyStatusOutput){
                            result = result.db_getSurveyStatusOutput;
                               if(result.length > 0){
                                   $('#monitoring_all_all_list').empty();
                                   $('#monitoring_all_else_list1').empty();
                                   $('#monitoring_all_else_list2').empty();
                                   $('#monitoring_all_else_list3').empty();

                                   monitoring_btn_effect(change_page);

                                   for(var i = 0; i < result.length; i++){

                                        var name_id = 'donut' + i;
                                        var temp = '';
                                        var index = 0;

                                        //temp += result[i].account_name;

                                         //&& change_page == 'all'
                                        if(result[i].org == '전사'){ //전사 + 전체

                                            if(result[i].account_name == '전체 계정'){

                                            index = 1;
                                            }else{ //전사 + 개별
                                            index = 2;
                                            }

                                        }else{ //팀 dept

                                            if(result[i].account_name  == '전체 계정'){ //팀 + 전체

                                            index = 3;
                                            }else{ //팀 + 개별
                                            index = 4;
                                            }

                                        }

                                         var check_quantity = parseInt(result[i].check_quantity);
                                         var asset_quantity = parseInt(result[i].asset_quantity);
                                     //남은 실사    var remain_quantity = asset_quantity - check_quantity;
                                     if(change_page == 'all'){
                                        if( index == 3 || index == 4){
                                            index = 0;
                                        }
                                     }else if(change_page == 'dept'){
                                     if( index == 1 || index == 2){
                                             index = 0;
                                         }
                                     }

                                            switch(index){
                                                case 0:
                                                      temp += '';
                                                break;
                                                case 1: // 전사 + 전체

                                                     temp += "<div align='center' style='width:100%'><div id='" + name_id + "' style='width:50%'></div><p>전체 건수(" + check_quantity + "/" + asset_quantity + ")</p></div>";
                                                     $('#monitoring_all_name').text("전사 현황");
                                                     $('#monitoring_all_all_list').append(temp);


                                                break;

                                                case 2: // 전사 + 개별

                                                     temp += "<div style='width:25%;float:left;margin:10px'><div id='" + name_id + "' style='margin-bottom:0px !important'></div><p>" + result[i].account_name + "<br>(" + check_quantity + "/" + asset_quantity + ")</p></div>";
                                                     if(all_index < 3){
                                                     $('#monitoring_all_else_list1').append(temp);
                                                     }else if(all_index < 6){
                                                     $('#monitoring_all_else_list2').append(temp);
                                                     }else{
                                                     $('#monitoring_all_else_list3').append(temp);
                                                     }
                                                     all_index++;


                                                break;

                                                case 3: // 팀 + 전체
                                                     temp += "<div style='width:100%'><div id='" + name_id + "' style='width:50%;margin-bottom:0px !important'></div><p>전체 건수(" + check_quantity + "/" + asset_quantity + ")</p></div>";
                                                     $('#monitoring_all_name').text(localStorage.getItem("usr_dept_name") + " 현황");
                                                     $('#monitoring_all_all_list').append(temp);

                                                break;

                                                case 4: // 팀 + 개별 result[i].account_name
                                                     temp += "<div style='width:25%;float:left;margin:10px'><div id='" + name_id + "' style='margin-bottom:0px !important'></div><p>" + result[i].account_name + "<br>(" + check_quantity + "/" + asset_quantity + ")</p></div>";
                                                     if(dept_index < 3){
                                                     $('#monitoring_all_else_list1').append(temp);
                                                     }else if(dept_index < 6){
                                                     $('#monitoring_all_else_list2').append(temp);
                                                     }else{
                                                     $('#monitoring_all_else_list3').append(temp);
                                                     }
                                                     dept_index++;

                                                break;

                                            }
                                            if(index > 0){
                                             draw_donut(name_id, check_quantity, asset_quantity, index);
                                             }


                                   }
                               }


                        }


                        }else{
                         alerts('부서정보가 없습니다.');
                        }

                    setStopSpinner();
                }
            //원형 그래프 그리기
            function draw_donut(p_name_id, p_check_quantity, p_asset_quantity, p_index){
                console.log('★' + p_name_id + '/' + p_check_quantity + '/' + p_asset_quantity + '/' + p_index + '/' + Math.round(p_check_quantity / p_asset_quantity * 1000) / 10);
                // ★donut0/4/6/3/66.7
                var color = '';
                var font_size = 0;
                var fill = 0;
                var perc = 0;
                     perc = Math.floor(Math.round(p_check_quantity / p_asset_quantity * 1000) / 10);
                    switch(p_index){
                        case 1: // 전사 + 전체
                        color = '#E62601';
                        font_size = 50;
                        fill = 10;
                        break;

                        case 2: //전사 + 개별
                        color = '#FBA200';
                        font_size = 20;
                        fill = 4;
                        break;

                        case 3: //팀 + 전체
                        color = '#0680C3';
                        font_size = 50;
                        fill = 10;
                        break;

                        case 4: //팀 + 개별
                        color = '#90C221';
                        font_size = 20;
                        fill = 4;
                        break;
                        default:
                        color = '#009688';
                        font_size = 30;
                        fill = 10;
                        break;
                    }
                  console.log('★' + p_index + '/' + p_name_id + '/' + font_size + '/' + fill + '/' + color + '/' + perc);
                 $("#" + p_name_id).radialPieChart("init", {
                   'font-size': font_size,
                   'fill': fill,
                   'text-color':'#000',
                   'data': [
                     { 'color': color, 'perc': perc }
                   ]
                 });

            }

            //버튼클릭시 화면전환
            function monitoring_change_page(str){
                   change_page = str;
                   monitoring_btn_effect(str);
                       if(str == 'dept'){
                       move_refresh_flip_reverse(true);
                       }else{
                       move_refresh_flip_reverse(false);
                       }
               }

            //버튼클릭시 버튼 효과
            function monitoring_btn_effect(p_change_page){
                   $('#monitoring_top_btn01').css('border-bottom', '0.1px solid #ccc');
                   $('#monitoring_top_btn02').css('border-bottom', '0.1px solid #ccc');
                   if(p_change_page == 'dept'){
                    $('#monitoring_top_btn01').css('border-bottom', '2px solid #000');
                   }else{
                    $('#monitoring_top_btn02').css('border-bottom', '2px solid #000');
                   }
            }


            function swipe_test(p_section){
                $( p_section ).on( "swiperight", swipeHandler );
                $( p_section ).on( "swipeleft", swipeHandler2 );
            }

            function swipeHandler(){
                if(change_page != 'dept'){
                    monitoring_change_page('dept');
                  }
            }
            function swipeHandler2(){
                if(change_page != 'all'){
                    monitoring_change_page('all');

                  }
            }



// ------------------------------------- setting.js ---------------------------------------------------//


            //환경설정 팀 가져오기
           function getListTeam(){
                  var dept_code = $('#setting_search_dept_code').val();
                  var dept_name = $('#setting_search_dept_name').val();

                  var url = "mDAI/getListTeam?&dept_code=" + dept_code + "&dept_name=" + dept_name;
                  var method = "GET";
                  var data = "";
                   McsConnecter(url, method, data, getListTeam_result_func);

              }
            //환경설정 팀 결과 처리
            function getListTeam_result_func(p_result){
                var temp = '';
                if(p_result){
                if(p_result.db_getListTeamOutput){
                p_result = p_result.db_getListTeamOutput;

                   if(p_result.length > 0){

                         for(var i = 0; i < p_result.length ; i++){
                            var list =  p_result[i];
                            temp += "<option value='" + list.dept_code + "'>" + list.dept_name + "</option>";
                            }
                    $('#setting_dept_list').empty().append(isNullReplace(temp));
                        }
                }
               }else{
                     alerts("검색 결과가 없습니다.");
               }

                setStopSpinner();
            }
            //환경설정 팀 선택
            function selectTeam(){
                var pre_dept_code = localStorage.getItem('usr_dept_code'); //이전부서코드
                var dept_code = $('#setting_dept_list option:selected').val(); //현재부서코드
                var pre_dept_name = localStorage.getItem('usr_dept_name'); //이전부서명
                var dept_name = $('#setting_dept_list option:selected').text(); //현재부서명
                if(dept_code != ''){
                    localStorage.setItem('usr_dept_code', dept_code);
                    localStorage.setItem("usr_dept_name", dept_name); //부서명 변경
                    alerts('부서정보가 변경되었습니다.\n( ' + isNullReplace(pre_dept_name) + ' → ' + dept_name + ' )');
                }else{
                    alerts('부서는 검색 후 변경할 수 있습니다.');
                }

            }

            //환경설정 글씨 크기 처리
            function setting_adjust_font_size(){
                    var handle = $( "#setting_custom-handle" );
                    var first_value = 0;
                    if(localStorage.getItem('font-size')){
                    var first_value = parseInt(localStorage.getItem('font-size'));
                    }
                    $( "#setting_slider" ).slider({
                      value: first_value,
                      min: -5,
                      max: 5,
                      step: 1,
                      create: function() {
                        handle.text(first_value + 16 + '');
                      },
                      slide: function(event, ui){
                      handle.text(parseInt(ui.value) + 16 + '');
                      localStorage.setItem('font-size', ui.value);

                      }
                    });

            }
            function setting_adjust_font_size_func(){
                $('body .content').css('font-size',  parseInt(localStorage.getItem('font-size')) + 16 + 'px');
            }
//
//            //환경설정 글씨 크기 처리
//            function setting_adjust_font_size(){
//                    var handle = $( "#custom-handle" );
//                    var first_value = 0;
//                    if(localStorage.getItem('font-size')){
//                    var first_value = parseInt(localStorage.getItem('font-size'));
//                    }
//                    $( "#slider" ).slider({
//                      value: first_value,
//                      min: -5,
//                      max: 5,
//                      step: 1,
//                      create: function() {
//                        handle.text(first_value + 16 + '');
//                      },
//                      slide: function(event, ui){
//                      handle.text(parseInt(ui.value) + 16 + '');
//                      localStorage.setItem('font-size', ui.value);
//                      $('body .content').css('font-size',  parseInt(ui.value) + 16 + 'px');
//                      }
//                    });
//
//            }



// 2019.08.14 백업 및 히스토리
// 실사사진 delete 그랜트 요청후 프로세서 처리
// 자동업데이트
// validation check 검증완료
// IOS 개발준비
// 아이콘, 위치 표시, 글씨 조정 메인 -->  po셋팅으로 이동

