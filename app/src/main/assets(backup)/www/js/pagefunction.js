
    $(document).on('pageshow', function(event, data){

                CAMERA_FLAG = false;
                g_scroll_permit_flag = false; //기본적으로 메인의 스크롤은 막힘(화면의 터치영역으로 판단);
        switch ($.mobile.activePage.attr('id')) {
            //메인

            case 'main':
                setting_adjust_font_size_func();
                g_scroll_permit_flag = true;
//                $('body .content').css('font-size',  parseInt(localStorage.getItem('font-size')) + 16  + 'px');
                getSurveyStatus_result = '';
                button_effect('.main_bottom');
                   console.log("*** main_init ***");
                main_init();
           //     setting_adjust_font_size();


            break;

            case 'detail':
                getSurveyStatus_result = '';
                button_effect('.main_bottom');
                detail_init();

            break;


            case 'setting':
                icon_display4();
                location_display4();
                setting_auto_scan_display();
                setting_inout_user_display();
                setting_adjust_font_size();
                getSurveyStatus_result = '';
                button_effect('.setting_bottom');
                $('#setting_dept_nm').text(sessionStorage.getItem("usr_dept_name"));
                $('#setting_user_id').text(sessionStorage.getItem("usr_id"));
                $('#setting_user_nm').text(sessionStorage.getItem("usr_nm"));
                var temp = "<option value='" + localStorage.getItem('usr_dept_code') + "'>" + localStorage.getItem('usr_dept_name') + "</option>";
                $('#setting_dept_list').append(temp);
                $('#setting_dept_list').val(localStorage.getItem('usr_dept_code'));

            break;


            case 'monitoring':
                button_effect('.monitoring_bottom');
                monitoring_init();
                swipe_test('#monitoring');
            break;


            default:

            break;
        }

    });





    window.echo = function(str, callback) {
        cordova.exec(callback, function(err) {
            callback('Nothing to echo.');
        }, "Echo", "echo", [str]);
    };




    function exchange_language(kor, en, prefix){

          // 다국어 변환

                var lang = [];
                if(sessionStorage.getItem("lang") == 'kor'){
                    lang = kor;
                }else if (sessionStorage.getItem("lang") == 'en'){
                    lang = en;
                }
                 for(var i = 0; i < lang.length ; i++){
                        var str = prefix + i;
                        //console.log(str + lang[i]);
                        $(str).text(lang[i]);
                    }

                //다국어 변환
    }

